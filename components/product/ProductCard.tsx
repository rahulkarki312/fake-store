import { Product } from "@/lib/api/types";
import Image from "next/image";
import Link from "next/link";

import AddToCart from "../cart/AddToCart";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col bg-surface border border-border rounded-2xl overflow-hidden shadow-soft hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out">
      
      {/* Image  */}
      <div className="relative h-48 w-full bg-background flex items-center justify-center overflow-hidden">
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-36 h-36 rounded-full bg-primary opacity-30" />
        </div>
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-6 z-10 group-hover:scale-115 transition-transform duration-300 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Category  */}
        <span className="absolute top-3 left-3 z-20 text-[10px] font-semibold uppercase tracking-widest text-text-muted bg-surface/80 backdrop-blur-sm border border-border px-2.5 py-1 rounded-full">
          {product.category}
        </span>
        {/* Rating  */}
        <span className="absolute top-3 right-3 z-20 flex items-center gap-1 text-xs font-semibold text-warning bg-warning-bg border border-warning/20 px-2.5 py-1 rounded-full">
          ⭐ {product.rating.rate}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <h2 className="text-sm font-semibold text-text leading-snug line-clamp-2  transition-colors duration-200">
          {product.title}
        </h2>

        {/* Price  */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-text tracking-tight">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-xs text-text-subtle">
            {product.rating.count} reviews
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-border-muted" />

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <AddToCart product={product} />
          <Link href={`/products/${product.id}`}
            className="flex items-center justify-center gap-1.5 w-full text-sm font-medium text-text-muted border border-border rounded-xl py-2 hover:border-primary hover:text-text hover:bg-background transition-all duration-200"
          >
            View Details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
