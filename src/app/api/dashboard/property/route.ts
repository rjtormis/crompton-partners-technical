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
}
