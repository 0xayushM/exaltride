import { NextResponse } from "next/server";
import addresses from "@/data/addresses.json";

export async function GET() {
  return NextResponse.json(addresses);
}
