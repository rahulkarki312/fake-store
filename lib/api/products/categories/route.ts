import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  try {
    const res = await fetch(`${BASE_URL}/products/categories`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Proxy categories error:", err);
    return NextResponse.json([], { status: 500 });
  }
}