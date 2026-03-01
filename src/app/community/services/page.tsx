'use client';

import { Briefcase, Clock } from 'lucide-react';

export default function CommunityServicesPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 sm:p-6">
      {/* Page skeleton (blurred background content) */}
      <div
        className="max-w-7xl mx-auto blur-sm pointer-events-none select-none"
        aria-hidden="true"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-8 w-56 bg-neutral-300 rounded-lg mb-2" />
            <div className="h-4 w-40 bg-neutral-200 rounded" />
          </div>
          <div className="h-10 w-32 bg-neutral-300 rounded-lg" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="border border-neutral-200 rounded-xl bg-white shadow-sm p-6 space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-neutral-200 rounded-lg">
                  <Briefcase className="w-5 h-5 text-neutral-400" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-neutral-200 rounded w-3/4" />
                  <div className="h-3 bg-neutral-100 rounded w-1/3" />
                </div>
              </div>
              <div className="h-3 bg-neutral-100 rounded w-full" />
              <div className="h-3 bg-neutral-100 rounded w-5/6" />
              <div className="space-y-2 pt-2">
                <div className="h-3 bg-neutral-100 rounded w-2/3" />
                <div className="h-3 bg-neutral-100 rounded w-1/2" />
                <div className="h-3 bg-neutral-100 rounded w-3/5" />
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
              Community Services is currently under development. Check back
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
