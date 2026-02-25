import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const { searchParams } = new URL(request.url);
  const sort = searchParams.get("sort");

  const query = sort ? `?sort=${sort}` : "";

  try {
    const res = await fetch(`${siteUrl}/products${query}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json([], { status: 500 });
  }
}