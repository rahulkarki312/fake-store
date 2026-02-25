"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../../store/authStore";
import { loginUser } from "@/lib/api/auth";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginUser({ username, password });

      login(data.token);
      router.push("/products");
    } catch (error: any) {
      setError(error?.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4 py-12 overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full bg-primary opacity-40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-secondary opacity-30 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
         
            <Image
              src="/logo.png"
              alt="FakeStore Logo"
              width={40}
              height={40}
              className="object-contain border border-text-muted/50 rounded-full shadow-dark"
            />
          

          <h1 className="text-3xl font-bold tracking-tight text-text">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Sign in to your account to continue
          </p>
        </div>

        {/* Card */}
        <div className="rounded-lg bg-surface p-8 shadow-soft border border-border">
          {/* Error */}
          {error && (
            <div className="mb-6 flex items-center gap-2 rounded-sm border border-error bg-error-bg px-4 py-3 text-sm text-error">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="username"
                className="text-sm font-medium text-text"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-text outline-none transition-all duration-200
                           focus:border-primary focus:ring-4 focus:ring-primary/40"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-text"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-text outline-none transition-all duration-200
                           focus:border-primary focus:ring-4 focus:ring-primary/40"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full cursor-pointer rounded-sm bg-text py-3 text-sm font-semibold text-text-inverted transition-all duration-200
                         hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-text-subtle">
          Powered by FakeStore API · Demo purposes only
        </p>
      </div>
    </div>
  );
}
