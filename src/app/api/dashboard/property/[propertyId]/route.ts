import { options, prisma } from "@/app/api/auth/[...nextauth]/options";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
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

  // Check if listing exists.
  const queryProperty = await prisma.property.findFirst({
    where: {
      name: form.get("id") as string,
    },
  });

  if (!queryProperty) {
    return NextResponse.json({ message: "Property not found" }, { status: 404 });
  }

  return NextResponse.json({ property: queryProperty });
}

export async function PATCH(req: Request) {
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

  // Check if listing exists.
  const queryProperty = await prisma.property.findFirst({
    where: {
      id: form.get("id") as string,
    },
  });

  if (!queryProperty) {
    return NextResponse.json({ message: "Property not found" }, { status: 404 });
  }

  // Extract and validate form data
  const id = form.get("id") as string;
  const name = form.get("name") as string;
  const description = form.get("description") as string;
  const type = form.get("type") as string;
  const status = form.get("status") as string;
  const location = form.get("location") as string;
  const bathroom = parseInt(form.get("bathroom") as string, 10);
  const bedroom = parseInt(form.get("bedroom") as string, 10);
  const price = parseFloat(form.get("price") as string);

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
  const updateListing = await prisma.property.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      type,
      status,
      location,
      bathroom,
      bedroom,
      price,
    },
  });

  return NextResponse.json({ property: updateListing, message: "Property updated successfully" });
}

export const DELETE = async (req: Request) => {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({ Unauthorized: true }, { status: 401 });
  }

  const queryUser = await prisma.user.findFirst({ where: { id: session.user.id } });

  if (!queryUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { id } = req.body;

  if (!id) {
    return NextResponse.json({ error: "Missing or invalid form data" }, { status: 400 });
  }

  const queryProperty = await prisma.property.findFirst({
    where: {
      id,
    },
  });

  if (!queryProperty) {
    return NextResponse.json({ message: "Property not found" }, { status: 404 });
  }

  await prisma.property.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({ message: "Property deleted successfully" });
};
