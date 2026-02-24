"use client";

import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuthStore();
  const itemCount = useCartStore((s) => s.getItemCount());
  const [mounted, setMounted] = useState(false);

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
          <Link href="/products" className="absolute left-[45%] flex items-center gap-2 group">
            <span className="w-8 h-8 p-1.5 rounded-lg bg-primary flex items-center justify-center text-text font-bold text-sm transition-transform group-hover:scale-105">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22 22H2" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M20 22V11" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M4 22V11" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M16.5278 2H7.47214C6.26932 2 5.66791 2 5.18461 2.2987C4.7013 2.5974 4.43234 3.13531 3.89443 4.21114L2.49081 7.75929C2.16652 8.57905 1.88279 9.54525 2.42867 10.2375C2.79489 10.7019 3.36257 11 3.99991 11C5.10448 11 5.99991 10.1046 5.99991 9C5.99991 10.1046 6.89534 11 7.99991 11C9.10448 11 9.99991 10.1046 9.99991 9C9.99991 10.1046 10.8953 11 11.9999 11C13.1045 11 13.9999 10.1046 13.9999 9C13.9999 10.1046 14.8953 11 15.9999 11C17.1045 11 17.9999 10.1046 17.9999 9C17.9999 10.1046 18.8953 11 19.9999 11C20.6373 11 21.205 10.7019 21.5712 10.2375C22.1171 9.54525 21.8334 8.57905 21.5091 7.75929L20.1055 4.21114C19.5676 3.13531 19.2986 2.5974 18.8153 2.2987C18.332 2 17.7306 2 16.5278 2Z" stroke="#1C274C" stroke-width="1.5" stroke-linejoin="round"></path> <path d="M9.5 21.5V18.5C9.5 17.5654 9.5 17.0981 9.70096 16.75C9.83261 16.522 10.022 16.3326 10.25 16.201C10.5981 16 11.0654 16 12 16C12.9346 16 13.4019 16 13.75 16.201C13.978 16.3326 14.1674 16.522 14.299 16.75C14.5 17.0981 14.5 17.5654 14.5 18.5V21.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
            </span>
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
            <Link
              href="/cart"
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-text text-sm font-medium
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
            </Link>

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
