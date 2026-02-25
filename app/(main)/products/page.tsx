import { getAllProducts, getAllCategories } from "@/lib/api/products";
import ProductsClient from "@/components/product/ProductsClient";
import SortControls from "@/components/product/SortControls";
import { Metadata } from "next";
import { Product } from "@/lib/api/types";

interface ProductsPageProps {
  searchParams: Promise<{
    sort?: "asc" | "desc";
  }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  const description = `Browse all products from FakeStore across categories: ${categories.join(
    ", ",
  )}, with prices and filters.`;

  return {
    title: "All Products - FakeStore",
    description,
    keywords: categories.join(", "), // to help SEO with category keywords
    openGraph: {
      title: "All Products - FakeStore",
      description,
      type: "website",
      images: products.slice(0, 5).map((p) => p.image), // sample 5 products
    },
    twitter: {
      card: "summary_large_image",
      title: "All Products - FakeStore",
      description,
      images: products.slice(0, 5).map((p) => p.image),
    },
  };
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { sort } = await searchParams;

  let products: Product[] = [];
  let categories: string[] = [];
  try {
    products = await getAllProducts(sort);
    categories = await getAllCategories();
  } catch (error) {
    console.error("Products page error:", error);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  // JSON-LD structured data for collection
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "FakeStore Products",
    description:
      "Browse all products from FakeStore with categories, prices, and filters.",
    hasPart: products.slice(0, 5).map((p) => ({
      // including sample products (only 5 for now) in collection
      "@type": "Product",
      name: p.title,
      image: [p.image],
      description: p.description,
      category: p.category,
      sku: p.id.toString(),
      brand: {
        "@type": "Brand",
        name: "FakeStore",
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: p.price,
        url: `${siteUrl}/products/${p.id}`,
        availability: "https://schema.org/InStock",
      },
    })),
  };

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-14 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-2xl font-semibold mb-6">Products</h1>

      <ProductsClient products={products} categories={categories} sort={sort} />
    </main>
  );
}
