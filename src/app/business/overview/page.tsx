'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MobileMetrics } from '@/components/app/MobileMetrics';
import {
  Package,
  DollarSign,
  Tag,
  Star,
  ShoppingBag,
  Users,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  type: 'product' | 'service';
  featured: boolean;
}

export default function BusinessOverviewPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Premium Web Design',
      description: 'Custom website design with responsive layout and modern UI',
      price: 2499,
      category: 'Web Design',
      type: 'service',
      featured: true,
    },
    {
      id: '2',
      name: 'Digital Marketing Package',
      description: 'Comprehensive social media and SEO marketing solution',
      price: 899,
      category: 'Marketing',
      type: 'service',
      featured: false,
    },
    {
      id: '3',
      name: 'Brand Starter Kit',
      description: 'Complete branding package with templates and launch assets',
      price: 499,
      category: 'Branding',
      type: 'product',
      featured: false,
    },
  ]);
  const [activeTab, setActiveTab] = useState('all');

  const filteredProducts = products.filter((product) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'products') return product.type === 'product';
    if (activeTab === 'services') return product.type === 'service';
    if (activeTab === 'featured') return product.featured;
    return true;
  });

  const stats = {
    total: products.length,
    products: products.filter((p) => p.type === 'product').length,
    services: products.filter((p) => p.type === 'service').length,
    featured: products.filter((p) => p.featured).length,
    avgPrice:
      products.length > 0
        ? products.reduce((sum, p) => sum + p.price, 0) / products.length
        : 0,
  };

  const mobileMetricItems = [
    {
      label: 'Total Items',
      value: (
        <>
          <ShoppingBag className="w-4 h-4 text-blue-600" />
          {stats.total}
        </>
      ),
      valueClassName: 'text-blue-600',
    },
    {
      label: 'Services',
      value: (
        <>
          <Package className="w-4 h-4 text-green-600" />
          {stats.services}
        </>
      ),
      valueClassName: 'text-green-600',
    },
    {
      label: 'Featured',
      value: (
        <>
          <Star className="w-4 h-4 text-yellow-600" />
          {stats.featured}
        </>
      ),
      valueClassName: 'text-yellow-600',
    },
    {
      label: 'Avg Price',
      value: (
        <>
          <DollarSign className="w-4 h-4 text-purple-600" />
          {stats.avgPrice.toFixed(0)}
        </>
      ),
      valueClassName: 'text-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ff5f6d] to-[#ffc371] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col items-start gap-3 mb-6 sm:flex-row sm:items-center">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Business Overview
              </h1>
              <p className="text-white/80">Manage your products and services</p>
            </div>
          </div>

          {/* Stats Cards */}
          <MobileMetrics items={mobileMetricItems} />

          <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 bg-white/95 backdrop-blur-sm border-white/30 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ShoppingBag className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-neutral-900">
                    {stats.total}
                  </div>
                  <div className="text-xs text-neutral-600">Total Items</div>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-white/95 backdrop-blur-sm border-white/30 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Package className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-neutral-900">
                    {stats.services}
                  </div>
                  <div className="text-xs text-neutral-600">Services</div>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-white/95 backdrop-blur-sm border-white/30 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Star className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-neutral-900">
                    {stats.featured}
                  </div>
                  <div className="text-xs text-neutral-600">Featured</div>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-white/95 backdrop-blur-sm border-white/30 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <DollarSign className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-neutral-900">
                    ${stats.avgPrice.toFixed(0)}
                  </div>
                  <div className="text-xs text-neutral-600">Avg Price</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Card className="bg-white/95 backdrop-blur-sm border-white/30 shadow-xl">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-neutral-900">
                Products & Services
              </h2>
            </div>

            {/* Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mb-6"
            >
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-1 !h-auto group-data-[orientation=horizontal]/tabs:!h-auto">
                <TabsTrigger
                  value="all"
                  className="h-auto whitespace-normal text-xs sm:text-sm leading-tight"
                >
                  All ({stats.total})
                </TabsTrigger>
                <TabsTrigger
                  value="services"
                  className="h-auto whitespace-normal text-xs sm:text-sm leading-tight"
                >
                  Services ({stats.services})
                </TabsTrigger>
                <TabsTrigger
                  value="products"
                  className="h-auto whitespace-normal text-xs sm:text-sm leading-tight"
                >
                  Products ({stats.products})
                </TabsTrigger>
                <TabsTrigger
                  value="featured"
                  className="h-auto whitespace-normal text-xs sm:text-sm leading-tight"
                >
                  Featured ({stats.featured})
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Products/Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <Package className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                  <p className="text-neutral-600 mb-2">No items found</p>
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="border border-neutral-200 hover:shadow-lg transition-shadow"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-neutral-900">
                              {product.name}
                            </h3>
                            {product.featured && (
                              <Badge
                                variant="secondary"
                                className="bg-yellow-100 text-yellow-800 border-yellow-300"
                              >
                                <Star className="w-3 h-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>
                          <Badge variant="outline" className="mb-2">
                            {product.type === 'product' ? (
                              <Package className="w-3 h-3 mr-1" />
                            ) : (
                              <Users className="w-3 h-3 mr-1" />
                            )}
                            {product.type}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-neutral-600 text-sm mb-4 h-12 overflow-hidden">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="text-2xl font-bold text-[#ff5f6d]">
                          ${product.price.toLocaleString()}
                        </div>
                        {product.category && (
                          <Badge variant="secondary" className="text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {product.category}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
