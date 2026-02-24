"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { useState } from "react";
import ConfirmDialog from "@/components/cart/RemoveFromCart";
import CartPageSkeleton from "@/components/cart/CartLoading";


export default function CartPage() {
  const { updateQuantity, removeFromCart, getTotal } = useCartStore();

  const items = useCartStore((s) => s.getItems());

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const isHydrated = useCartStore((s) => s.isHydrated);

  if (!isHydrated) {
    return <CartPageSkeleton />;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-surface py-10 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-1">
              Review your items
            </p>
            <div className="flex">
              <h1 className="text-3xl font-bold text-text">Shopping Cart</h1>
              <svg
                className="h-10 px-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </div>
            {items.length > 0 && (
              <p className="text-text-muted text-sm mt-1">
                {items.length} {items.length === 1 ? "item" : "items"} in your
                cart
              </p>
            )}
          </div>

          {/* Empty State */}
          {items.length === 0 ? (
            <div className="bg-surface rounded-2xl shadow-soft flex flex-col items-center justify-center py-20 px-8 text-center border border-border">
              <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-text-subtle"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-text mb-1">
                Your cart is empty
              </h2>
              <p className="text-text-muted text-sm">
                Add some items to get started.
              </p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="bg-surface rounded-2xl shadow-soft border border-border overflow-hidden mb-6">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-4 px-5 py-5 transition-colors hover:bg-background ${
                      index !== items.length - 1
                        ? "border-b border-border-muted"
                        : ""
                    }`}
                  >
                    {/* Image */}
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-background border border-border-muted">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain p-2"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h2 className="font-semibold text-text text-sm leading-snug line-clamp-2 mb-1">
                        {item.title}
                      </h2>
                      <p className="text-secondary font-bold text-base">
                        ${item.price.toFixed(2)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-background border border-border text-text hover:bg-primary hover:border-primary transition-colors text-sm font-semibold"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-semibold text-text">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-background border border-border text-text hover:bg-primary hover:border-primary transition-colors text-sm font-semibold"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Subtotal + Remove */}
                    <div className="flex flex-col items-end gap-3 flex-shrink-0">
                      <p className="text-text font-semibold text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => {
                          setSelectedItemId(item.id);
                          setIsDialogOpen(true);
                        }}
                        className="cursor-pointer text-xs text-error hover:text-error font-medium flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-error-bg  hover:border transition-colors"
                        aria-label={`Remove ${item.title}`}
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-surface rounded-2xl shadow-soft border border-border p-6">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-text-muted mb-4">
                  Order Summary
                </h3>

                <div className="flex items-center justify-between py-3 border-t border-border-muted">
                  <span className="text-text-muted text-sm">Subtotal</span>
                  <span className="text-text font-medium">
                    ${getTotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-t border-border-muted">
                  <span className="text-text-muted text-sm">Shipping</span>
                  <span className="text-success text-sm font-medium">Free</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border mt-1">
                  <span className="text-text font-bold text-lg">Total</span>
                  <span className="text-text font-extrabold text-2xl">
                    ${getTotal().toFixed(2)}
                  </span>
                </div>

                <button className="cursor-pointer mt-6 w-full bg-primary hover:bg-amber-500 active:bg-amber-600  font-semibold text-sm py-3.5 px-6 rounded-xl transition-colors shadow-sm">
                  Proceed to Checkout
                </button>
              </div>
              {/* Confirmation Dialog for removal of product */}
              <ConfirmDialog
                open={isDialogOpen}
                title="Remove item from cart?"
                description="Are you sure you want to remove this product from your cart?"
                confirmText="Remove"
                cancelText="Cancel"
                onCancel={() => {
                  setIsDialogOpen(false);
                  setSelectedItemId(null);
                }}
                onConfirm={() => {
                  if (selectedItemId) {
                    removeFromCart(selectedItemId);
                  }
                  setIsDialogOpen(false);
                  setSelectedItemId(null);
                }}
              />
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
