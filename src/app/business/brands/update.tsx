'use client';

import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { BrandProduct } from './create';

interface UpdateBrandProductFormProps {
  product: BrandProduct;
  onUpdateProduct: (product: BrandProduct) => void;
  onCancel: () => void;
}

export function UpdateBrandProductForm({
  product,
  onUpdateProduct,
  onCancel,
}: UpdateBrandProductFormProps) {
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [promotions, setPromotions] = useState(product.promotions.toString());
  const [followed, setFollowed] = useState(product.followed);
  const [subscribed, setSubscribed] = useState(product.subscribed);

  useEffect(() => {
    setName(product.name);
    setCategory(product.category);
    setPromotions(product.promotions.toString());
    setFollowed(product.followed);
    setSubscribed(product.subscribed);
  }, [product]);

  const handleSubmit = () => {
    const cleanName = name.trim();
    if (!cleanName) return;

    const parsedPromotions = Math.max(0, Number(promotions || '0'));

    onUpdateProduct({
      ...product,
      name: cleanName,
      category: category.trim() || 'General',
      promotions: Number.isFinite(parsedPromotions) ? parsedPromotions : 0,
      followed,
      subscribed,
    });
  };

  return (
    <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-neutral-900">
          Update Product
        </CardTitle>
        <CardDescription className="text-sm text-neutral-600">
          Edit product details and save changes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="update-name">Product Name</Label>
            <Input
              id="update-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Starter Kit"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="update-category">Category</Label>
            <Input
              id="update-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Bundle"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="update-promotions">Promotion Count</Label>
          <Input
            id="update-promotions"
            type="number"
            min="0"
            value={promotions}
            onChange={(e) => setPromotions(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-neutral-700">
            <input
              type="checkbox"
              checked={followed}
              onChange={(e) => setFollowed(e.target.checked)}
              className="rounded border-neutral-300"
            />
            Followed
          </label>
          <label className="flex items-center gap-2 text-sm text-neutral-700">
            <input
              type="checkbox"
              checked={subscribed}
              onChange={(e) => setSubscribed(e.target.checked)}
              className="rounded border-neutral-300"
            />
            Subscribed
          </label>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1 border border-neutral-300 hover:bg-neutral-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
