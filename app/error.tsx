"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-md bg-surface rounded-2xl shadow-soft border border-border p-8 text-center">
        
        <div className="mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-full bg-error-bg text-error text-2xl">
          ⚠️
        </div>

        <h1 className="text-2xl font-semibold text-text mb-2">
          Something went wrong
        </h1>

        <p className="text-text-muted mb-6">
          An unexpected error occurred. You can try again.
        </p>

        <button
          onClick={() => reset()}
          className="w-full py-3 rounded-xl bg-secondary text-text font-medium hover:opacity-90 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}