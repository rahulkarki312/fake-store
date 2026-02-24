export default function ProductsLoading() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-14 py-8">
      <h1 className="text-2xl font-semibold mb-6">Products</h1>
      <div className="space-y-8 animate-pulse">
        {/* Filter Bar */}
        <div className="bg-surface rounded-2xl p-5 shadow-soft border border-border-muted">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i}>
                  <div className="h-3 w-20 bg-border-muted rounded mb-2" />
                  <div className="h-10 w-full bg-background border border-border rounded-xl" />
                </div>
              ))}
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between pt-1 border-t border-border-muted">
              <div className="h-4 w-40 bg-border-muted rounded" />
              <div className="h-8 w-28 bg-background border border-border rounded-xl" />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <div
              key={i}
              className="relative flex flex-col bg-surface border border-border rounded-2xl overflow-hidden shadow-soft"
            >
              {/* Image  */}
              <div className="relative h-48 w-full bg-background flex items-center justify-center overflow-hidden">
                <div className="w-36 h-36 rounded-full bg-primary/20" />

                {/* Category  */}
                <div className="absolute top-3 left-3 h-5 w-16 bg-border-muted rounded-full" />

                {/* Rating  */}
                <div className="absolute top-3 right-3 h-5 w-14 bg-border-muted rounded-full" />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-4 gap-3">
                {/* Title */}
                <div className="h-4 w-3/4 bg-border-muted rounded" />
                <div className="h-4 w-1/2 bg-border-muted rounded" />

                {/* Price  */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="h-6 w-20 bg-border-muted rounded" />
                  <div className="h-3 w-16 bg-border-muted rounded" />
                </div>

                {/* Divider */}
                <div className="h-px bg-border-muted" />

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <div className="h-9 w-full bg-border-muted rounded-lg" />
                  <div className="h-9 w-full bg-background border border-border rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-3 pt-4">
          <div className="h-9 w-9 bg-border-muted rounded-md" />
          <div className="h-9 w-9 bg-border-muted rounded-md" />
          <div className="h-9 w-9 bg-border-muted rounded-md" />
        </div>
      </div>
    </section>
  );
}
