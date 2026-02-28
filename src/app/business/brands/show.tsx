'use client';

import { Package, X, Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { BrandProduct } from './create';

interface ShowBrandProductProps {
  product: BrandProduct;
  onClose: () => void;
  onEdit: (product: BrandProduct) => void;
}

export function ShowBrandProduct({
  product,
  onClose,
  onEdit,
}: ShowBrandProductProps) {
  return (
    <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm max-w-2xl mx-auto">
      <CardHeader className="border-b border-neutral-200">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-neutral-100 rounded-lg">
              <Package className="w-6 h-6 text-neutral-700" />
            </div>
            <div>
              <CardTitle className="text-xl text-neutral-900">
                {product.name}
              </CardTitle>
              <p className="text-sm text-neutral-600 mt-1">
                {product.category}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-6">
        <div className="flex flex-wrap gap-2">
          {product.followed && <Badge variant="secondary">Followed</Badge>}
          {product.subscribed && <Badge variant="secondary">Subscribed</Badge>}
          {product.promotions > 0 ? (
            <Badge className="bg-[#ff5f6d] text-white">
              {product.promotions} Promotion{product.promotions > 1 ? 's' : ''}
            </Badge>
          ) : (
            <Badge variant="outline">No Promotion</Badge>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3 border border-neutral-200 rounded-lg">
            <div className="text-xs text-neutral-500">Follow Status</div>
            <div className="text-sm font-semibold text-neutral-900">
              {product.followed ? 'Followed' : 'Not Followed'}
            </div>
          </div>
          <div className="p-3 border border-neutral-200 rounded-lg">
            <div className="text-xs text-neutral-500">Subscribe Status</div>
            <div className="text-sm font-semibold text-neutral-900">
              {product.subscribed ? 'Subscribed' : 'Not Subscribed'}
            </div>
          </div>
          <div className="p-3 border border-neutral-200 rounded-lg">
            <div className="text-xs text-neutral-500">Promotion Count</div>
            <div className="text-sm font-semibold text-neutral-900">
              {product.promotions}
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            className="flex-1 border border-neutral-300 hover:bg-neutral-50"
            onClick={() => onEdit(product)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Update Product
          </Button>
          <Button
            className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white"
            onClick={onClose}
          >
            Back to List
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
