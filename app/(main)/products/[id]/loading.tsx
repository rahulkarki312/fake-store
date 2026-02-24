export default function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      <div className="max-w-5xl mx-auto px-4 py-8 md:px-8 md:py-14">
        <div className="bg-surface rounded-3xl shadow-soft overflow-hidden border border-border">
          <div className="flex flex-col md:flex-row">

            {/*  Image  */}
            <div className="md:w-[45%] flex items-center justify-center p-8 md:p-12 border-b md:border-b-0 md:border-r border-border">
              <div className="relative w-full aspect-square max-w-sm mx-auto">
                <div className="absolute inset-0 rounded-full bg-primary/20" />
                <div className="relative z-10 w-full h-full bg-background rounded-xl" />
              </div>
            </div>

            {/* Product Info  */}
            <div className="md:w-[55%] flex flex-col justify-between p-8 md:p-10 gap-6">

              {/* Category + Title */}
              <div className="flex flex-col gap-3">
                <div className="h-6 w-28 bg-background rounded-full border border-border" />
                <div className="h-8 w-3/4 bg-background rounded-lg" />
                <div className="h-6 w-1/2 bg-background rounded-lg" />
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <div className="h-10 w-32 bg-background rounded-lg" />
              </div>

              {/* Divider */}
              <div className="border-t border-border" />

              {/* Description */}
              <div className="space-y-3">
                <div className="h-4 w-full bg-background rounded" />
                <div className="h-4 w-11/12 bg-background rounded" />
                <div className="h-4 w-10/12 bg-background rounded" />
                <div className="h-4 w-8/12 bg-background rounded" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 bg-background rounded-xl px-4 py-3 border border-border-muted">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 bg-border rounded-sm"
                    />
                  ))}
                </div>
                <div className="h-4 w-10 bg-border rounded" />
                <div className="h-4 w-20 bg-border rounded" />
              </div>

              {/* Add to Cart Button */}
              <div className="pt-2">
                <div className="h-11 w-full bg-background rounded-xl border border-border" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}