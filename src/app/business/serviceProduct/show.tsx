'use client';

import { Edit, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ServiceCatalogItem } from './create';

interface ShowServiceItemProps {
  item: ServiceCatalogItem;
  onClose: () => void;
  onEdit: (item: ServiceCatalogItem) => void;
}

export function ShowServiceItem({
  item,
  onClose,
  onEdit,
}: ShowServiceItemProps) {
  return (
    <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm mb-6">
      <CardHeader className="border-b border-neutral-200">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs capitalize">
                {item.type}
              </Badge>
              <Badge className="text-xs bg-green-500 text-white">
                {item.status}
              </Badge>
            </div>
            <CardTitle className="text-xl text-neutral-900">
              {item.title}
            </CardTitle>
            <p className="text-sm text-neutral-600 mt-1">
              {item.description || 'No description'}
            </p>
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-4">
        {item.imageUrl && (
          <div className="overflow-hidden rounded-xl border border-neutral-200">
            <img
              src={item.imageUrl}
              alt={`${item.title} banner`}
              className="w-full h-44 object-cover"
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-lg border border-neutral-200">
            <div className="text-xs text-neutral-500">Price</div>
            <div className="text-sm font-semibold text-neutral-900">
              ${item.price.toLocaleString()}
            </div>
          </div>
          <div className="p-3 rounded-lg border border-neutral-200">
            <div className="text-xs text-neutral-500">Duration</div>
            <div className="text-sm font-semibold text-neutral-900">
              {item.duration}
            </div>
          </div>
          <div className="p-3 rounded-lg border border-neutral-200">
            <div className="text-xs text-neutral-500">Clients</div>
            <div className="text-sm font-semibold text-neutral-900">
              {item.clients}
            </div>
          </div>
          <div className="p-3 rounded-lg border border-neutral-200">
            <div className="text-xs text-neutral-500">Rating</div>
            <div className="text-sm font-semibold text-neutral-900">
              {item.rating}
            </div>
          </div>
        </div>

        <div>
          <div className="text-sm font-medium text-neutral-700 mb-2">
            Features
          </div>
          <div className="flex flex-wrap gap-2">
            {item.features.length === 0 ? (
              <span className="text-sm text-neutral-500">
                No features listed.
              </span>
            ) : (
              item.features.map((feature) => (
                <Badge key={feature} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))
            )}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onClose}
          >
            Back to List
          </Button>
          <Button
            type="button"
            className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white"
            onClick={() => onEdit(item)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Update
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
