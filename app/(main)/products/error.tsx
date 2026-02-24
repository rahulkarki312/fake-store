"use client";

interface ProductsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProductsError({
  error,
  reset,
}: ProductsErrorProps) {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 text-center">
      <h2 className="text-xl font-semibold mb-4">
        Something went wrong
      </h2>

      <p className="text-gray-600 mb-6">
        {error.message || "Failed to load products."}
      </p>

      <button
        onClick={reset}
        className="px-4 py-2 bg-black text-white rounded-md"
      >
        Try Again
      </button>
    </main>
  );
}