import { getServerSession } from "next-auth";
import { options, prisma } from "../../auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import {
  DeleteObjectsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

// Set AWS credentials
const client = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_AKEY as string,
    secretAccessKey: process.env.AWS_SKEY as string,
  },
});

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  // Query parameters
  const page = searchParams.get("page") ? parseInt(searchParams.get("page") as string) : 1;
  const search = searchParams.get("search") || "";
  const searchCondition = search
    ? {
        name: {
          contains: search,
          mode: Prisma.QueryMode.insensitive, // case insensitive search
        },
      }
    : {};

  // Query properties based on search and pagination
  const queryProperties = await prisma.property.findMany({
    where: searchCondition, // Apply search condition , if search is empty then we return properties atleast 6 minimum, else we return properties based on search
    skip: (page - 1) * 6, // Pagination (skip for current page)
    take: 6, // Limit results to 6 per page
  });

  return NextResponse.json({ properties: queryProperties });
}

export async function POST(req: Request) {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({ Unauthorized: true }, { status: 401 });
  }

  const queryUser = await prisma.user.findFirst({ where: { id: session.user.id } });

  if (!queryUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const form = await req.formData();

  // Get all images since it's a File[]
  const images = form.getAll("images") as File[];

  const queryListing = await prisma.property.findFirst({
    where: {
      name: form.get("name") as string,
    },
  });

  if (queryListing) {
    return NextResponse.json({ error: "Listing already exists" }, { status: 409 });
  }

  // Extract and validate form data
  const name = form.get("name") as string;
  const description = form.get("description") as string;
  const type = form.get("type") as string;
  const status = form.get("status") as string;
  const location = form.get("location") as string;
  const bathroom = parseInt(form.get("bathroom") as string, 10);
  const bedroom = parseInt(form.get("bedroom") as string, 10);
  const price = parseFloat(form.get("price") as string);
  const lat = parseFloat(form.get("lat") as string);
  const lng = parseFloat(form.get("lng") as string);

  // Validate required fields
  if (
    !name ||
    !description ||
    !type ||
    !status ||
    !location ||
    isNaN(bathroom) ||
    isNaN(bedroom) ||
    isNaN(price)
  ) {
    return NextResponse.json({ error: "Missing or invalid form data" }, { status: 400 });
  }

  // TODO: Handle Image upload

  // Create the property
  const createListing = await prisma.property.create({
    data: {
      location,
      name,
      description,
      type,
      status,
      lat,
      lng,
      bathroom,
      bedroom,
      price,
      images: [],
      userId: session.user.id,
    },
  });

  await prisma.property.update({
    where: {
      id: createListing.id,
    },
    data: {
      images: images.map((i) => `${createListing.id}/${i.name}`),
    },
  });

  // Create new folder in AWS S3
  const newFolder = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: `${createListing.id}/`,
  });
  await client.send(newFolder);

  await Promise.all(
    images.map(async (image) => {
      // Get Presigned url for authentication and security
      const { url, fields } = await createPresignedPost(client, {
        Bucket: process.env.AWS_BUCKET_NAME as string,
        Key: `${createListing.id}/${image.name}`,
      });

      // Create a new form data and append the necessary headers,attributes and etc
      const formDataS3 = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formDataS3.append(key, value);
      });

      formDataS3.append("file", image);
      // Upload the images to AWS s3
      await fetch(url, { method: "POST", body: formDataS3 });
    })
  );

  return NextResponse.json({ property: createListing, message: "Property created successfully" });
}

export async function DELETE(req: Request) {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({ Unauthorized: true }, { status: 401 });
  }

  const queryUser = await prisma.user.findFirst({ where: { id: session.user.id } });

  if (!queryUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const body = await req.json();
  const { ids } = body;

  // Check if ids are provided
  if (!ids || !Array.isArray(ids)) {
    return NextResponse.json({ error: "Missing or invalid form data" }, { status: 400 });
  }

  // Delete selected properties in AWS S3
  await Promise.all(
    ids.map(async (id) => {
      try {
        // List all the folders or objects within the bucket
        const deleteProject = new ListObjectsV2Command({
          Bucket: process.env.AWS_BUCKET_NAME as string,
        });

        const list = await client.send(deleteProject);
        // Check if the bucket is not empty, if it is not then we delete Per Folder
        if (list.KeyCount) {
          const deleteCommand = new DeleteObjectsCommand({
            Bucket: process.env.AWS_BUCKET_NAME as string,
            Delete: {
              Objects: list.Contents!.map((item) => ({ Key: item.Key })), // array of keys to be deleted
              Quiet: false, // provides info on successful deletes
            },
          });
          await client.send(deleteCommand);
        }

        await client.send(deleteProject);

        // Delete the data once the images are deleted
        await prisma.property.delete({
          where: { id },
        });
      } catch (e: unknown) {
        console.error(`Failed to delete project with id ${id}:`, e);
        throw new Error(`Project with id ${id} does not exist or couldn't be deleted`);
      }
    })
  );

  return NextResponse.json({ message: "Properties deleted successfully" });
}
