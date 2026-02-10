"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import appleLogo from "@/assets/apple.svg";
import facebookLogo from "@/assets/facebook.svg";
import googleLogo from "@/assets/google.svg";
import { createUser, type AccountType } from "@/lib/indexeddb/auth";
export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [accountTypes, setAccountTypes] = useState({
    personal: true,
    business: false,
    community: false,
    organizer: false,
    agency: false,
  });

  const handleAccountTypeChange = (type: keyof typeof accountTypes) => {
    // Prevent unchecking personal account type
    if (type === "personal") return;

    setAccountTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const selectedAccountTypes = Object.entries(accountTypes)
      .filter(([, selected]) => selected)
      .map(([key]) => key as AccountType);

    setIsSaving(true);
    try {
      await createUser({
        name,
        email,
        password,
        accountTypes: selectedAccountTypes,
      });
      setSuccess("Account saved locally");
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create account");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#ff5f6d] to-[#ffc371] p-1 sm:p-2 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-3 sm:p-4 md:p-6 w-full max-w-lg sm:max-w-2xl md:max-w-3xl my-2">
          {/* ROW 1: Header */}
          <div className="mb-4 sm:mb-6 border-b text-center border-neutral-100 pb-2 sm:pb-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Create your account
            </h1>
            <p className="text-neutral-500 text-sm sm:text-base">
              Register to access your digital identity
            </p>
          </div>

          {/* ROW 2: Single Column Form */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Row 1: Name and Account Types */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold text-neutral-700 block mb-2">
                    Name
                  </label>
                  <Input
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-xl border-neutral-200 h-11 w-full"
                  />
                  <div className="space-y-4 mt-4">
                    {/* Email */}
                    <div>
                      <label className="text-sm font-semibold text-neutral-700 block mb-2">
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

                    {/* Password */}
                    <div>
                      <label className="text-sm font-semibold text-neutral-700 block mb-2">
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
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="text-sm font-semibold text-neutral-700 block mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="rounded-xl border-neutral-200 h-11 pr-10 w-full"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-neutral-700 block mb-2">
                    Account Types
                  </label>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { key: "personal", label: "Personal" },
                      { key: "business", label: "Business" },
                      { key: "community", label: "Community" },
                      { key: "organizer", label: "Event" },
                      { key: "agency", label: "Agency" },
                    ].map(({ key, label }) => (
                      <div
                        key={key}
                        className="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors"
                      >
                        <input
                          type="checkbox"
                          id={key}
                          checked={
                            accountTypes[key as keyof typeof accountTypes]
                          }
                          onChange={() =>
                            handleAccountTypeChange(
                              key as keyof typeof accountTypes,
                            )
                          }
                          disabled={key === "personal"}
                          className={`w-4 h-4 text-[#ff5f6d] border-neutral-300 rounded focus:ring-[#ff5f6d] focus:ring-2 ${key === "personal" ? "cursor-not-allowed" : ""}`}
                        />
                        <label
                          htmlFor={key}
                          className="text-sm font-medium text-neutral-900 cursor-pointer"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                  {success}
                </div>
              )}

              {/* Create Account Button */}
              <Button
                disabled={isSaving}
                className="w-full mt-3 bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] hover:opacity-90 text-white font-bold h-11 rounded-xl shadow-lg border-none transition-transform active:scale-95"
              >
                {isSaving ? "Saving..." : "Create Account"}
              </Button>
            </form>

            {/* Row 2: Social Login Icons */}
            <div className="flex justify-center gap-3 mt-4">
              <Button
                variant="outline"
                className="w-10 h-10 rounded-lg border-neutral-200 hover:bg-neutral-50 transition-all p-0"
              >
                <Image src={googleLogo} alt="Google" width={20} height={20} />
              </Button>
              <Button
                variant="outline"
                className="w-10 h-10 rounded-lg border-neutral-200 hover:bg-neutral-50 transition-all p-0"
              >
                <Image src={appleLogo} alt="Apple" width={20} height={20} />
              </Button>
              <Button
                variant="outline"
                className="w-10 h-10 rounded-lg border-neutral-200 hover:bg-neutral-50 transition-all p-0"
              >
                <Image
                  src={facebookLogo}
                  alt="Facebook"
                  width={20}
                  height={20}
                />
              </Button>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-neutral-600">
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
