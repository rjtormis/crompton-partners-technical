import { getServerSession } from "next-auth";
import { options, prisma } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({ Unauthorized: true }, { status: 401 });
  }

  const queryAllProperties = await prisma.property.findMany({});

  return NextResponse.json({ properties: queryAllProperties });
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
      name,
      description,
      type,
      status,
      location,
      bathroom,
      bedroom,
      price,
      userId: session.user.id,
    },
  });

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

  const { ids } = req.body;

  if (!ids) {
    return NextResponse.json({ error: "Missing or invalid form data" }, { status: 400 });
  }

  await prisma.property.deleteMany(ids);

  return NextResponse.json({ message: "Properties deleted successfully" });
}
