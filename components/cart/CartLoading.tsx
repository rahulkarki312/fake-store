export default function CartPageSkeleton() {
  return (
    <div className="min-h-screen bg-surface py-10 px-4 animate-pulse">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="h-3 w-32 bg-border-muted rounded mb-3" />
          <div className="flex items-center gap-3">
            <div className="h-8 w-48 bg-border-muted rounded" />
            <div className="h-8 w-8 bg-border-muted rounded" />
          </div>
          <div className="h-3 w-40 bg-border-muted rounded mt-3" />
        </div>

        {/* Cart Items */}
        <div className="bg-surface rounded-2xl shadow-soft border border-border overflow-hidden mb-6">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 px-5 py-5 ${
                index !== 2 ? "border-b border-border-muted" : ""
              }`}
            >
              {/* Image */}
              <div className="w-20 h-20 rounded-xl bg-border-muted flex-shrink-0" />

              {/* Details */}
              <div className="flex-1">
                <div className="h-4 w-3/4 bg-border-muted rounded mb-2" />
                <div className="h-4 w-24 bg-border-muted rounded mb-4" />

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-7 h-7 rounded-lg bg-border-muted" />
                  <div className="w-6 h-4 bg-border-muted rounded" />
                  <div className="w-7 h-7 rounded-lg bg-border-muted" />
                </div>
              </div>

              {/* Subtotal + Remove */}
              <div className="flex flex-col items-end gap-3">
                <div className="h-4 w-16 bg-border-muted rounded" />
                <div className="h-3 w-14 bg-border-muted rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-surface rounded-2xl shadow-soft border border-border p-6">
          <div className="h-3 w-32 bg-border-muted rounded mb-6" />

          <div className="space-y-4">
            <div className="flex justify-between">
              <div className="h-3 w-20 bg-border-muted rounded" />
              <div className="h-3 w-16 bg-border-muted rounded" />
            </div>

            <div className="flex justify-between">
              <div className="h-3 w-20 bg-border-muted rounded" />
              <div className="h-3 w-12 bg-border-muted rounded" />
            </div>

            <div className="flex justify-between pt-4 border-t border-border mt-2">
              <div className="h-5 w-20 bg-border-muted rounded" />
              <div className="h-6 w-24 bg-border-muted rounded" />
            </div>
          </div>

          <div className="mt-6 h-12 w-full bg-border-muted rounded-xl" />
        </div>
      </div>
    </div>
  );
}