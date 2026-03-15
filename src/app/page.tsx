'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import googleLogo from '@/assets/google.svg';
import { loginWithPassword } from '@/lib/auth/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    setIsSigningIn(true);
    try {
      await loginWithPassword({ email, password });
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gradient-to-br from-[#ff5f6d] to-[#ffc371] px-4 py-6 sm:px-6 sm:py-8">
      <div className="flex flex-col items-center w-full max-w-md sm:max-w-lg">
        {/* Whodini App Name and Icon */}
        <div className="mb-6 sm:mb-8 flex flex-col items-center">
          <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-white/20 shadow-lg ring-1 ring-white/20 mb-2">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-white/40 to-white/10">
              <span className="text-base sm:text-lg font-semibold text-[#ff5f6d]">
                W
              </span>
            </div>
          </div>
          <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-sm">
            Whodini
          </span>
        </div>
        <div className="bg-white/95 rounded-2xl shadow-xl p-5 sm:p-8 w-full flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center text-neutral-900">
            Welcome back
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 mb-5 sm:mb-6 text-center">
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
                className="w-full"
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
            {error && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
            <Button
              type="submit"
              disabled={isSigningIn}
              className="w-full mt-6 bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] text-white font-semibold text-sm sm:text-base py-2 rounded-xl shadow-md border-0 hover:opacity-90 transition"
            >
              {isSigningIn ? 'Signing in...' : 'Sign In'}
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

            <div className="mt-4 flex justify-center gap-2 sm:gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 h-10 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 transition"
              >
                <Image
                  src={googleLogo}
                  alt="Google"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <span className="text-sm font-medium text-neutral-700">
                  Sign in via Google
                </span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-sm text-neutral-700 text-center">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="text-[#ff5f6d] font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>

        <a
          href="https://project-whodini.github.io/whodini-landing/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 w-full flex items-center justify-center gap-2 rounded-xl bg-white/20 px-6 py-3 text-sm font-semibold text-white shadow-md backdrop-blur-sm hover:bg-white/30 transition"
        >
          Learn more about Whodini →
        </a>
      </div>
    </div>
  );
}
