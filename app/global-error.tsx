"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="w-full max-w-md bg-surface rounded-2xl shadow-soft border border-borderp-8 text-center">
          
          <div className="mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-full bg-error-bg text-error text-2xl">
            💥
          </div>

          <h1 className="text-2xl font-semibold text-text mb-2">
            Critical Error
          </h1>

          <p className="text-text-muted mb-6">
            The application encountered a serious problem.
          </p>

          <button
            onClick={() => reset()}
            className="w-full py-3 rounded-xl bg-secondary text-text font-medium hover:opacity-90 transition"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}