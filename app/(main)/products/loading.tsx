
import ProductsClientSkeleton from "@/components/product/ProductsClientSkeleton";

export default function ProductsLoading() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-14 py-8">
      <h1 className="text-2xl font-semibold mb-6">Products</h1>
      <ProductsClientSkeleton />
    </section>
  );
}
