'use client';

import { type ChangeEvent, useEffect, useState } from 'react';
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
import type { ServiceCatalogItem, ServiceItemType } from './create';

interface UpdateServiceFormProps {
  item: ServiceCatalogItem;
  onUpdateItem: (item: ServiceCatalogItem) => void;
  onCancel: () => void;
}

export function UpdateServiceForm({
  item,
  onUpdateItem,
  onCancel,
}: UpdateServiceFormProps) {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [imageUrl, setImageUrl] = useState(item.imageUrl ?? '');
  const [priceInput, setPriceInput] = useState(item.price.toString());
  const [duration, setDuration] = useState(item.duration);
  const [type, setType] = useState<ServiceItemType>(item.type);
  const [categoryId, setCategoryId] = useState(item.categoryId);
  const [featuresInput, setFeaturesInput] = useState(item.features.join(', '));

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

  useEffect(() => {
    setTitle(item.title);
    setDescription(item.description);
    setImageUrl(item.imageUrl ?? '');
    setPriceInput(item.price.toString());
    setDuration(item.duration);
    setType(item.type);
    setCategoryId(item.categoryId);
    setFeaturesInput(item.features.join(', '));
  }, [item]);

  const handleSubmit = () => {
    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    const parsedPrice = Math.max(0, Number(priceInput || '0'));
    const features = featuresInput
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);

    onUpdateItem({
      ...item,
      title: cleanTitle,
      description: description.trim(),
      imageUrl: imageUrl.trim() || undefined,
      price: Number.isFinite(parsedPrice) ? parsedPrice : 0,
      duration: duration.trim() || 'Monthly',
      type,
      categoryId: categoryId.trim() || item.categoryId,
      features,
    });
  };

  return (
    <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-neutral-900">
          Update Product / Service
        </CardTitle>
        <CardDescription className="text-sm text-neutral-600">
          Edit catalog item details.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="update-title">Title</Label>
            <Input
              id="update-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="update-price">Price</Label>
            <Input
              id="update-price"
              type="number"
              min="0"
              step="0.01"
              value={priceInput}
              onChange={(e) => setPriceInput(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="update-description">Description</Label>
          <Input
            id="update-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="update-image-file">Banner Image</Label>
          <Input
            id="update-image-file"
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
            <Label htmlFor="update-type">Type</Label>
            <select
              id="update-type"
              value={type}
              onChange={(e) => setType(e.target.value as ServiceItemType)}
              className="h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm"
            >
              <option value="service">Service</option>
              <option value="product">Product</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="update-category">Category</Label>
            <Input
              id="update-category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              placeholder="Enter category"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="update-duration">Duration</Label>
            <Input
              id="update-duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Monthly / One-time"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="update-features">Features (comma-separated)</Label>
          <Input
            id="update-features"
            value={featuresInput}
            onChange={(e) => setFeaturesInput(e.target.value)}
            placeholder="Feature A, Feature B"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="flex-1 border border-neutral-300 hover:bg-neutral-50"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
