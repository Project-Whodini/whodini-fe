"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that both fields are filled
    if (email.trim() && password.trim()) {
      // Navigate to dashboard
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ff5f6d] to-[#ffc371]">
      <div className="flex flex-col items-center w-full">
        {/* Whodini App Name and Icon */}
        <div className="mb-8 flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-lg ring-1 ring-white/20 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-white/40 to-white/10">
              <span className="text-lg font-semibold text-[#ff5f6d]">W</span>
            </div>
          </div>
          <span className="text-3xl font-bold tracking-tight text-white drop-shadow-sm">
            Whodini
          </span>
        </div>
        <div className="bg-white/95 rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-2 text-center text-neutral-900">
            Welcome back
          </h1>
          <p className="text-neutral-500 mb-6 text-center">
            Sign in to access your digital identity
          </p>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-qqfull"
                required
              />
            </div>
            <div className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-neutral-700"
                >
                  Password
                </label>
                <Link
                  href="/auth/forgot"
                  className="text-xs text-[#ff5f6d] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] text-white font-semibold text-base py-2 rounded-xl shadow-md border-0 hover:opacity-90 transition"
            >
              Sign In
            </Button>
          </form>

          {/* Social Login Section */}
          <div className="w-full mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white/95 text-neutral-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-4 flex justify-center gap-3">
              <button
                type="button"
                className="flex items-center justify-center w-12 h-12 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 transition"
              >
                <Image
                  src="/assets/google.svg"
                  alt="Google"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </button>
              <button
                type="button"
                className="flex items-center justify-center w-12 h-12 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 transition"
              >
                <Image
                  src="/assets/facebook.svg"
                  alt="Facebook"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </button>
              <button
                type="button"
                className="flex items-center justify-center w-12 h-12 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 transition"
              >
                <Image
                  src="/assets/apple.svg"
                  alt="Apple"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </button>
            </div>
          </div>

          <div className="mt-6 text-sm text-neutral-700 text-center">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-[#ff5f6d] font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
