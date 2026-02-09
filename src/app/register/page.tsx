"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import appleLogo from "@/assets/apple.svg";
import facebookLogo from "@/assets/facebook.svg";
import googleLogo from "@/assets/google.svg";
export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ff5f6d] to-[#ffc371] p-2 sm:p-4 md:p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-8 md:p-12 w-full max-w-lg sm:max-w-2xl md:max-w-4xl">
          {/* ROW 1: Header */}
          <div className="mb-8 sm:mb-10 border-b text-center border-neutral-100 pb-4 sm:pb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Create your account
            </h1>
            <p className="text-neutral-500 text-base sm:text-lg mt-1">
              Register to access your digital identity
            </p>
          </div>

          {/* ROW 2: Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-start">
            {/* Column 1: Social Buttons */}
            <div className="flex flex-col gap-3 sm:gap-4 justify-start">
              <h2 className="text-xs sm:text-sm font-bold text-neutral-400 uppercase tracking-widest mb-1 sm:mb-2">
                Quick Sign Up
              </h2>
              <Button
                variant="outline"
                className="h-12 rounded-xl border-neutral-200 flex gap-3 hover:bg-neutral-50 transition-all w-full"
              >
                <span className="inline-block w-5 h-5 align-middle">
                  <Image src={googleLogo} alt="Google" width={20} height={20} />
                </span>
                <span className="font-semibold">Sign up with Google</span>
              </Button>
              <Button
                variant="outline"
                className="h-12 rounded-xl border-neutral-200 flex gap-3 hover:bg-neutral-50 transition-all w-full"
              >
                <span className="inline-block w-5 h-5 align-middle">
                  <Image src={appleLogo} alt="Apple" width={20} height={20} />
                </span>
                <span className="font-semibold">Sign up with Apple</span>
              </Button>
              <Button
                variant="outline"
                className="h-12 rounded-xl border-neutral-200 flex gap-3 hover:bg-neutral-50 transition-all w-full"
              >
                <span className="inline-block w-5 h-5 align-middle">
                  <Image
                    src={facebookLogo}
                    alt="Facebook"
                    width={20}
                    height={20}
                  />
                </span>
                <span className="font-semibold">Sign up with Facebook</span>
              </Button>
            </div>

            {/* Column 2: Manual Form */}
            <div className="relative mt-8 md:mt-0">
              {/* Optional Vertical Divider for Desktop */}
              <div className="hidden md:block absolute -left-6 top-0 bottom-0 w-px bg-neutral-100" />

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <label className="text-xs sm:text-sm font-semibold text-neutral-700 block mb-1">
                    Name
                  </label>
                  <Input
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-xl border-neutral-200 h-11 w-full"
                  />
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-semibold text-neutral-700 block mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-xl border-neutral-200 h-11 w-full"
                  />
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-semibold text-neutral-700 block mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="rounded-xl border-neutral-200 h-11 pr-10 w-full"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <Button className="w-full mt-4 bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] hover:opacity-90 text-white font-bold h-12 rounded-xl shadow-lg border-none transition-transform active:scale-95">
                  Create Account
                </Button>
              </form>
            </div>
          </div>
          <div className="mt-6 text-center text-xs sm:text-sm text-neutral-600">
            Already have an account?{" "}
            <Link href="/" className="text-[#ff5f6d] font-bold hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
