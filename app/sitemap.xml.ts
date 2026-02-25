import { getAllProducts } from "@/lib/api/products";

export const runtime = "edge";

export async function GET() {
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const products = await getAllProducts();

  const urls = [
    `${baseUrl}/products`,
    ...products.map((p) => `${baseUrl}/products/${p.id}`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (url) => `
      <url>
        <loc>${url}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `
      )
      .join("")}
  </urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}