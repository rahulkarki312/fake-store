"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Product } from "@/lib/api/types";
import ProductCard from "./ProductCard";
import Pagination from "../shared/Pagination";
import SortControls from "./SortControls";

const PRODUCTS_PER_PAGE = 6;

interface ProductsClientProps {
  products: Product[];
  categories: string[];
  sort?: "asc" | "desc";
}

export default function ProductsClient({
  products,
  categories,
  sort,
}: ProductsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  // const sort = searchParams.get("sort") as "asc" | "desc" | null;
  const selectedCategory = searchParams.get("category") || "all";
  const searchTerm = searchParams.get("search") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const resetFilters = () => {
    router.push("/products");
  };

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim() === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    if (key !== "page") {
      params.set("page", "1");
    }
    router.push(`/products?${params.toString()}`);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesMinPrice =
        minPrice === "" || product.price >= Number(minPrice);
      const matchesMaxPrice =
        maxPrice === "" || product.price <= Number(maxPrice);
      return (
        matchesCategory && matchesSearch && matchesMinPrice && matchesMaxPrice
      );
    });
  }, [products, selectedCategory, searchTerm, minPrice, maxPrice]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  const hasActiveFilters =
    selectedCategory !== "all" || searchTerm || minPrice || maxPrice;

  return (
    <div className="space-y-8">
      {/* Filter Bar */}
      <div className="bg-surface rounded-2xl p-5 shadow-soft border border-border-muted">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Category */}
            <div className="relative">
              <label className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wide">
                Category
              </label>
              <select
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-text
                           focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                           transition-all duration-200 appearance-none cursor-pointer"
                value={selectedCategory}
                onChange={(e) => updateParam("category", e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wide">
                Search
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-subtle pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-text
                             placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-primary
                             focus:border-primary transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => updateParam("search", e.target.value)}
                />
              </div>
            </div>

            {/* Min Price */}
            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wide">
                Min Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle text-sm pointer-events-none">
                  $
                </span>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full bg-background border border-border rounded-xl pl-7 pr-4 py-2.5 text-sm text-text
                             placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-primary
                             focus:border-primary transition-all duration-200"
                  value={minPrice}
                  onChange={(e) => updateParam("minPrice", e.target.value)}
                />
              </div>
            </div>

            {/* Max Price */}
            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wide">
                Max Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle text-sm pointer-events-none">
                  $
                </span>
                <input
                  type="number"
                  placeholder="Any"
                  className="w-full bg-background border border-border rounded-xl pl-7 pr-4 py-2.5 text-sm text-text
                             placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-primary
                             focus:border-primary transition-all duration-200"
                  value={maxPrice}
                  onChange={(e) => updateParam("maxPrice", e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wide">
                Sort
              </label>

              <SortControls currentSort={sort} />
            </div>
          </div>

          {/* Footer row: results count + reset */}
          <div className="flex items-center justify-between pt-1 border-t border-border-muted">
            <p className="text-sm text-text-muted">
              <span className="font-semibold text-text">
                {filteredProducts.length}
              </span>{" "}
              {filteredProducts.length === 1 ? "product" : "products"} found
            </p>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-sm font-medium
                           text-text-muted bg-background border border-border
                           hover:border-error hover:text-error hover:bg-error-bg
                           transition-all duration-200"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {paginatedProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/30 flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
          </div>
          <p className="text-lg font-semibold text-text">No products found</p>
          <p className="text-sm text-text-muted mt-1">
            Try adjusting your filters or search term.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-5 py-2 rounded-xl bg-primary text-text text-sm font-medium
                       hover:bg-primary/80 transition-all duration-200"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}
