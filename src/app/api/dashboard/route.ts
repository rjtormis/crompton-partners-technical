import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({ Unauthorized: true }, { status: 401 });
  }
}
