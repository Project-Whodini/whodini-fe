'use client';

import { Clock } from 'lucide-react';
import { RequireSession } from '@/components/app/RequireSession';

export default function BusinessTeamPage() {
  return (
    <RequireSession>
      <div className="relative min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 sm:p-6">
        {/* Page skeleton (blurred background content) */}
        <div
          className="max-w-6xl mx-auto blur-sm pointer-events-none select-none"
          aria-hidden="true"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="space-y-2">
              <div className="h-8 w-56 bg-neutral-300 rounded-lg" />
              <div className="h-4 w-72 bg-neutral-200 rounded" />
            </div>
            <div className="h-10 w-36 bg-neutral-300 rounded-xl" />
          </div>
          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="border border-neutral-200 rounded-xl bg-white shadow-sm p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="h-3 bg-neutral-200 rounded w-2/3" />
                  <div className="h-4 w-4 bg-neutral-200 rounded" />
                </div>
                <div className="h-7 bg-neutral-200 rounded w-1/3" />
                <div className="h-3 bg-neutral-100 rounded w-1/2" />
              </div>
            ))}
          </div>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="h-10 flex-1 bg-neutral-200 rounded-lg" />
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-8 w-20 bg-neutral-200 rounded-xl" />
              ))}
            </div>
          </div>
          {/* Members list */}
          <div className="border border-neutral-200 rounded-xl bg-white shadow-sm p-6 space-y-4 mb-6">
            <div className="h-5 bg-neutral-200 rounded w-32 mb-4" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 border border-neutral-100 rounded-lg"
              >
                <div className="w-10 h-10 bg-neutral-200 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-neutral-200 rounded w-1/4" />
                  <div className="h-3 bg-neutral-100 rounded w-1/3" />
                </div>
                <div className="flex gap-2">
                  <div className="h-5 w-16 bg-neutral-100 rounded-full" />
                  <div className="h-5 w-14 bg-neutral-100 rounded-full" />
                </div>
              </div>
            ))}
          </div>
          {/* Activity */}
          <div className="border border-neutral-200 rounded-xl bg-white shadow-sm p-6 space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-5 w-5 bg-neutral-200 rounded" />
              <div className="h-5 bg-neutral-200 rounded w-44" />
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-3 bg-neutral-50 rounded-lg"
              >
                <div className="h-5 w-5 bg-neutral-200 rounded shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 bg-neutral-200 rounded w-3/4" />
                  <div className="h-3 bg-neutral-100 rounded w-1/2" />
                </div>
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
                Team Management is currently under development. Check back soon!
              </p>
            </div>
            <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#ff5f6d]/10 text-[#ff5f6d] border border-[#ff5f6d]/20">
              In Progress
            </span>
          </div>
        </div>
      </div>
    </RequireSession>
  );
}
