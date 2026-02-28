'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
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

export type BrandProduct = {
  id: string;
  name: string;
  category: string;
  followed: boolean;
  subscribed: boolean;
  promotions: number;
};

interface CreateBrandProductFormProps {
  onCreateProduct: (product: BrandProduct) => void;
  onCancel: () => void;
}

export function CreateBrandProductForm({
  onCreateProduct,
  onCancel,
}: CreateBrandProductFormProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [promotions, setPromotions] = useState('0');
  const [followed, setFollowed] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = () => {
    const cleanName = name.trim();
    if (!cleanName) return;

    const parsedPromotions = Math.max(0, Number(promotions || '0'));

    const newProduct: BrandProduct = {
      id: `brand_prod_${Date.now()}`,
      name: cleanName,
      category: category.trim() || 'General',
      followed,
      subscribed,
      promotions: Number.isFinite(parsedPromotions) ? parsedPromotions : 0,
    };

    onCreateProduct(newProduct);

    setName('');
    setCategory('');
    setPromotions('0');
    setFollowed(false);
    setSubscribed(false);
  };

  return (
    <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-neutral-900">
          Create Product
        </CardTitle>
        <CardDescription className="text-sm text-neutral-600">
          Add a new brand product.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="create-name">Product Name</Label>
            <Input
              id="create-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Starter Kit"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-category">Category</Label>
            <Input
              id="create-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Bundle"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="create-promotions">Promotion Count</Label>
          <Input
            id="create-promotions"
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
            <Plus className="w-4 h-4 mr-2" />
            Create Product
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
