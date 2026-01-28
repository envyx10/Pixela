import { auth } from "@/auth"; // Ensure this import path is correct for your auth configuration
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  return NextResponse.json({
    user: session.user,
  });
}
