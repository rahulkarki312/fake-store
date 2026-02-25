import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductById } from "@/lib/api/products";
import { Metadata } from "next";
import AddToCart from "@/components/cart/AddToCart";


interface ProductPageProps {
  params: {
    id: string;
  };
}

// generate dynamic metadata for each product
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) return { title: "Product Not Found" };

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: [product.image],
    },
    
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!product) return notFound();

  // JSON-LD structured data for a single product
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.title,
    image: [product.image],
    description: product.description,
    sku: product.id.toString(),
    brand: {
      "@type": "Brand",
      name: "Fake Store",
    },
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/products/${product.id}`,
      priceCurrency: "USD",
      price: product.price,
      availability: "https://schema.org/InStock",
    },
    ...(product.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating.rate,
        reviewCount: product.rating.count,
      },
    }),
  };

   return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8 md:px-8 md:py-14">
        <div className="bg-surface rounded-3xl shadow-soft overflow-hidden border border-border">
          <div className="flex flex-col md:flex-row">

            {/* Product Image */}
            <div className="md:w-[45%]  flex items-center justify-center p-8 md:p-12 border-b md:border-b-0 md:border-r border-border">
              <div className="relative w-full aspect-square max-w-sm mx-auto">
                <div className="absolute inset-0 rounded-full bg-primary/30" />
                <Image
                  src={product.image}
                  alt={product.title}
                  width={400}
                  height={400}
                  className="relative z-10 object-contain w-full h-full drop-shadow-md transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="md:w-[55%] flex flex-col justify-between p-8 md:p-10 gap-6">

              {/* Header */}
              <div className="flex flex-col gap-3">
                <span className="inline-flex items-center self-start px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-primary text-text border border-border">
                  {product.category}
                </span>
                <h1 className="text-2xl md:text-3xl font-bold text-text leading-snug">
                  {product.title}
                </h1>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-text">
                  ${product.price}
                </span>
              
              </div>

              {/* Divider */}
              <div className="border-t border-border" />

              {/* Description */}
              <p className="text-text-muted text-sm md:text-base leading-relaxed">
                {product.description}
              </p>

              {/* Rating */}
              {"rating" in product && product.rating && (
                <div className="flex items-center gap-3 bg-background rounded-xl px-4 py-3 border border-border-muted">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(product.rating!.rate)
                            ? "text-secondary"
                            : "text-border"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-text">
                    {product.rating.rate}
                    <span className="text-text-muted font-normal"> / 5</span>
                  </span>
                  <span className="text-text-subtle text-xs">
                    ({product.rating.count} reviews)
                  </span>
                </div>
              )}

              {/* Add to Cart */}
              <div className="pt-2">
                <AddToCart product={product} />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}