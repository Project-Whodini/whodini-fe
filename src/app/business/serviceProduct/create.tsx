'use client';

import { type ChangeEvent, useState } from 'react';
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

export type ServiceItemType = 'product' | 'service';

export type ServiceCatalogItem = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  price: number;
  duration: string;
  clients: number;
  rating: number;
  status: 'active' | 'featured' | 'premium';
  features: string[];
  categoryId: string;
  type: ServiceItemType;
};

interface ServiceCategoryOption {
  id: string;
  name: string;
}

interface CreateServiceFormProps {
  categories: ServiceCategoryOption[];
  defaultCategoryId: string;
  onCreateItem: (item: ServiceCatalogItem) => void;
  onCancel: () => void;
}

export function CreateServiceForm({
  categories,
  defaultCategoryId,
  onCreateItem,
  onCancel,
}: CreateServiceFormProps) {
  const resolvedDefaultCategory =
    categories.find((category) => category.id === defaultCategoryId)?.name ??
    defaultCategoryId;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [priceInput, setPriceInput] = useState('0');
  const [duration, setDuration] = useState('Monthly');
  const [type, setType] = useState<ServiceItemType>('service');
  const [categoryId, setCategoryId] = useState(resolvedDefaultCategory);
  const [featuresInput, setFeaturesInput] = useState('');

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    const parsedPrice = Math.max(0, Number(priceInput || '0'));
    const features = featuresInput
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);

    onCreateItem({
      id: `svc_item_${Date.now()}`,
      title: cleanTitle,
      description: description.trim(),
      imageUrl: imageUrl.trim() || undefined,
      price: Number.isFinite(parsedPrice) ? parsedPrice : 0,
      duration: duration.trim() || 'Monthly',
      clients: 0,
      rating: 0,
      status: 'active',
      features,
      categoryId,
      type,
    });

    setTitle('');
    setDescription('');
    setImageUrl('');
    setPriceInput('0');
    setDuration('Monthly');
    setType('service');
    setFeaturesInput('');
    setCategoryId(resolvedDefaultCategory);
  };

  return (
    <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-neutral-900">
          Create Product / Service
        </CardTitle>
        <CardDescription className="text-sm text-neutral-600">
          Add a new product or service to your catalog.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="catalog-title">Title</Label>
            <Input
              id="catalog-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="catalog-price">Price</Label>
            <Input
              id="catalog-price"
              type="number"
              min="0"
              step="0.01"
              value={priceInput}
              onChange={(e) => setPriceInput(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="catalog-description">Description</Label>
          <Input
            id="catalog-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="catalog-image-file">Banner Image</Label>
          <Input
            id="catalog-image-file"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imageUrl && (
            <div className="overflow-hidden rounded-xl border border-neutral-200">
              <img
                src={imageUrl}
                alt="Banner preview"
                className="w-full h-36 object-cover"
              />
            </div>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="catalog-type">Type</Label>
            <select
              id="catalog-type"
              value={type}
              onChange={(e) => setType(e.target.value as ServiceItemType)}
              className="h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm"
            >
              <option value="service">Service</option>
              <option value="product">Product</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="catalog-category">Category</Label>
            <Input
              id="catalog-category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              placeholder="Enter category"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="catalog-duration">Duration</Label>
            <Input
              id="catalog-duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Monthly / One-time"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="catalog-features">Features (comma-separated)</Label>
          <Input
            id="catalog-features"
            value={featuresInput}
            onChange={(e) => setFeaturesInput(e.target.value)}
            placeholder="Feature A, Feature B"
          />
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
            disabled={!title.trim()}
            className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
