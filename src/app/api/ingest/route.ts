import { NextRequest, NextResponse } from "next/server";
import { handleBootStrapping } from "@/app/services/bootstrap";

export async function POST(req: NextRequest) {
  const { targetIndex } = await req.json();
  await handleBootStrapping(targetIndex);
  return NextResponse.json({ message: "Bootstrapping initiated successfully" }, { status: 200 });
}
