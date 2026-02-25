import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-md bg-surface rounded-2xl shadow-soft border border-border p-8 text-center">
        
        <div className="mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-full bg-warning-bg text-warning text-2xl">
          404
        </div>

        <h1 className="text-2xl font-semibold text-text mb-2">
          Page Not Found
        </h1>

        <p className="text-text-muted mb-6">
          The page you're looking for doesn’t exist.
        </p>

        <Link
          href="/products"
          className="block w-full py-3 rounded-xl bg-primary text-text font-medium hover:opacity-90 transition"
        >
          Go to Products
        </Link>
      </div>
    </div>
  );
}