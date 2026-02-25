import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sort = searchParams.get("sort");

  const query = sort ? `?sort=${sort}` : "";

  try {
    // Fetch directly from Fake Store API
    const res = await fetch(`${BASE_URL}/products${query}`);
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json([], { status: 500 });
  }
}