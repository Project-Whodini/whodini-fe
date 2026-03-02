'use client';

import { type ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';

export interface MobileMetricItem {
  label: string;
  value: ReactNode;
  valueClassName?: string;
  icon?: ReactNode;
}

interface MobileMetricsProps {
  items: MobileMetricItem[];
  className?: string;
}

export function MobileMetrics({ items, className }: MobileMetricsProps) {
  return (
    <Card
      className={`sm:hidden border border-neutral-200 rounded-xl bg-white shadow-sm ${className ?? ''}`.trim()}
    >
      <CardContent className="p-0">
        <div className="divide-y divide-neutral-200">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between px-4 py-3"
            >
              <span className="text-sm text-neutral-600 flex items-center gap-1.5">
                {item.icon && (
                  <span className="text-[#ff5f6d]">{item.icon}</span>
                )}
                {item.label}
              </span>
              <span
                className={`inline-flex items-center gap-1 text-lg font-bold ${
                  item.valueClassName ?? 'text-neutral-900'
                }`}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
