"use client";

import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";
import DialogModal from "./DialogModal";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuthStore();
  const itemCount = useCartStore((s) => s.getItemCount());
  const [mounted, setMounted] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleBack = () => {
    if (window.history.length <= 1) {
      router.push("/products");
      return;
    }

    if (isAuthenticated && pathname === "/products") {
      return;
    }

    router.back();
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="cursor-pointer flex items-center justify-center w-9 h-9 rounded-xl border border-border bg-background text-text-muted
                 hover:text-text hover:border-primary hover:bg-primary/10
                 transition-all duration-200 active:scale-95"
            aria-label="Go back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Logo */}
          <Link
            href="/products"
            className="absolute left-[45%] flex items-center gap-2 group"
          >
           
              <Image
                src="/logo.png"
                alt="FakeStore Logo"
                width={30}
                height={30}
                className="object-contain border border-text-muted rounded-full"
              />
            
            <span className="text-text font-semibold text-lg tracking-tight hidden sm:block">
              FakeStore
            </span>
          </Link>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Greeting */}
            {isAuthenticated && (
              <span className="hidden md:block text-sm text-text-muted">
                Hello,{" "}
                <span className="font-semibold text-text">
                  {user?.firstName}
                </span>
              </span>
            )}

            {/* Cart */}

            <button
              onClick={() => {
                if (isAuthenticated) {
                  router.push("/cart");
                } else {
                  setShowLoginModal(true);
                }
              }}
              className="relative cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-text text-sm font-medium
             hover:bg-primary/80 transition-all duration-200 hover:shadow-soft active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z"
                />
              </svg>
              <span className="hidden sm:inline">Cart</span>

              {mounted && itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-secondary text-text-inverted text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Login Modal */}
            {showLoginModal && (
              <DialogModal
                open={showLoginModal}
                title="Login Required"
                description="Please log in to access your cart and continue shopping."
                onConfirm={() => setShowLoginModal(false)}
              />
            )}

            {/* Auth  */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="cursor-pointer px-4 py-2 rounded-xl text-sm font-medium border border-border text-text-muted
                           hover:border-error hover:text-error hover:bg-error-bg transition-all duration-200 active:scale-95"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 rounded-xl text-sm font-medium bg-text text-text-inverted
                           hover:opacity-80 transition-all duration-200 active:scale-95"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
