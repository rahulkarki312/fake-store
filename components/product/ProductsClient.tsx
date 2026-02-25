"use client";

import { useMemo, useState, useTransition, KeyboardEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import Pagination from "@/components/shared/Pagination";
import SortControls from "@/components/product/SortControls";

import { Product } from "@/lib/api/types";
import ProductsClientSkeleton from "./ProductsClientSkeleton";

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

  // URL state
  const selectedCategory = searchParams.get("category") || "all";
  const searchTerm = searchParams.get("search") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  // Local draft state (important change)
  const [draftCategory, setDraftCategory] = useState(selectedCategory);
  const [draftSearch, setDraftSearch] = useState(searchTerm);
  const [draftMinPrice, setDraftMinPrice] = useState(minPrice);
  const [draftMaxPrice, setDraftMaxPrice] = useState(maxPrice);

  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const applyFilters = () => {
    setLoading(true);

    const params = new URLSearchParams();

    if (draftCategory !== "all") params.set("category", draftCategory);
    if (draftSearch.trim()) params.set("search", draftSearch);
    if (draftMinPrice) params.set("minPrice", draftMinPrice);
    if (draftMaxPrice) params.set("maxPrice", draftMaxPrice);

    params.set("page", "1");

    startTransition(() => {
      router.push(`/products?${params.toString()}`);
      setLoading(false);
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      applyFilters();
    }
  };

  const resetFilters = () => {
    setDraftCategory("all");
    setDraftSearch("");
    setDraftMinPrice("");
    setDraftMaxPrice("");
    router.push("/products");
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
        matchesCategory &&
        matchesSearch &&
        matchesMinPrice &&
        matchesMaxPrice
      );
    });
  }, [products, selectedCategory, searchTerm, minPrice, maxPrice]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  const hasActiveFilters =
    selectedCategory !== "all" || searchTerm || minPrice || maxPrice;

  // Show skeleton while loading
  if (loading || isPending) {
    return <ProductsClientSkeleton />;
  }

  return (
    <div className="space-y-8">
      {/* Filter Bar */}
      <div className="bg-surface rounded-2xl p-5 shadow-soft border border-border-muted">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* Category */}
          <div>
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide">
              Category
            </label>
            <select
              className="w-full border rounded-xl px-4 py-2.5 text-sm"
              value={draftCategory}
              onChange={(e) => setDraftCategory(e.target.value)}
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
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide">
              Search
            </label>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border rounded-xl px-4 py-2.5 text-sm"
              value={draftSearch}
              onChange={(e) => setDraftSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Min Price */}
          <div>
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide">
              Min Price
            </label>
            <input
              type="number"
              placeholder="0"
              className="w-full border rounded-xl px-4 py-2.5 text-sm"
              value={draftMinPrice}
              onChange={(e) => setDraftMinPrice(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Max Price */}
          <div>
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide">
              Max Price
            </label>
            <input
              type="number"
              placeholder="Any"
              className="w-full border rounded-xl px-4 py-2.5 text-sm"
              value={draftMaxPrice}
              onChange={(e) => setDraftMaxPrice(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Sort */}
          <div>
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide">
              Sort
            </label>
            <SortControls currentSort={sort} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4">
          <button
            onClick={applyFilters}
            className="cursor-pointer px-5 py-2 rounded-xl bg-primary text-sm font-medium"
          >
            Apply Filters
          </button>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-sm text-text-muted"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      {paginatedProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg font-semibold">No products found</p>
          <button
            onClick={resetFilters}
            className="mt-4 px-5 py-2 rounded-xl bg-primary text-sm"
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