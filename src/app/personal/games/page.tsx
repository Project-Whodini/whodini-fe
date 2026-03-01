'use client';

import { Gamepad2, Clock } from 'lucide-react';

export default function GamesPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 sm:p-6">
      {/* Page skeleton (blurred background content) */}
      <div
        className="max-w-7xl mx-auto blur-sm pointer-events-none select-none"
        aria-hidden="true"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Gamepad2 className="w-6 h-6 text-neutral-400" />
          <div className="h-7 w-48 bg-neutral-300 rounded-lg" />
        </div>
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="border border-neutral-200 rounded-xl bg-white shadow-sm p-4 text-center space-y-1.5"
            >
              <div className="h-6 bg-neutral-200 rounded w-1/2 mx-auto" />
              <div className="h-3 bg-neutral-100 rounded w-3/4 mx-auto" />
            </div>
          ))}
        </div>
        {/* Daily challenges */}
        <div className="border border-neutral-200 rounded-xl bg-white shadow-sm p-6 mb-6 space-y-3">
          <div className="h-5 bg-neutral-200 rounded w-40 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="border border-neutral-200 rounded-xl p-4 space-y-2"
              >
                <div className="h-4 bg-neutral-200 rounded w-2/3" />
                <div className="h-3 bg-neutral-100 rounded w-full" />
                <div className="h-2 bg-neutral-100 rounded-full w-full" />
              </div>
            ))}
          </div>
        </div>
        {/* Games grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="border border-neutral-200 rounded-xl bg-white shadow-sm p-6 space-y-3"
            >
              <div className="h-8 w-8 bg-neutral-200 rounded" />
              <div className="h-4 bg-neutral-200 rounded w-3/4" />
              <div className="h-3 bg-neutral-100 rounded w-full" />
              <div className="h-3 bg-neutral-100 rounded w-5/6" />
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-neutral-100 rounded-full" />
                <div className="h-5 w-12 bg-neutral-100 rounded-full" />
              </div>
              <div className="h-8 w-24 bg-neutral-200 rounded-lg" />
            </div>
          ))}
        </div>
      </div>

      {/* Coming Soon overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px]">
        <div className="flex flex-col items-center gap-4 text-center px-6">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#ff5f6d] to-[#ffc371] shadow-lg">
            <Clock className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-1">
              Coming Soon
            </h2>
            <p className="text-sm sm:text-base text-neutral-500 max-w-xs">
              Games &amp; Challenges is currently under development. Check back
              soon!
            </p>
          </div>
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#ff5f6d]/10 text-[#ff5f6d] border border-[#ff5f6d]/20">
            In Progress
          </span>
        </div>
      </div>
    </div>
  );
}
