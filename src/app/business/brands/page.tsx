'use client';

import { useState } from 'react';
import {
  Package,
  Star,
  Users,
  Gift,
  Plus,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MobileMetrics } from '@/components/app/MobileMetrics';
import { CreateBrandProductForm, type BrandProduct } from './create';
import { ShowBrandProduct } from './show';
import { UpdateBrandProductForm } from './update';

const INITIAL_PRODUCTS: BrandProduct[] = [
  {
    id: '1',
    name: 'Starter Kit',
    category: 'Bundle',
    followed: true,
    subscribed: true,
    promotions: 1,
  },
  {
    id: '2',
    name: 'Premium Bundle',
    category: 'Package',
    followed: true,
    subscribed: false,
    promotions: 2,
  },
  {
    id: '3',
    name: 'Brand Asset Pack',
    category: 'Digital Product',
    followed: false,
    subscribed: true,
    promotions: 0,
  },
  {
    id: '4',
    name: 'Launch Toolkit',
    category: 'Toolkit',
    followed: false,
    subscribed: false,
    promotions: 1,
  },
];

export default function BrandDashPage() {
  const [products, setProducts] = useState<BrandProduct[]>(INITIAL_PRODUCTS);
  const [view, setView] = useState<'list' | 'create' | 'show' | 'update'>(
    'list'
  );
  const [selectedProduct, setSelectedProduct] = useState<BrandProduct | null>(
    null
  );

  const followedProducts = products.filter(
    (product) => product.followed
  ).length;
  const subscribedProducts = products.filter(
    (product) => product.subscribed
  ).length;
  const totalPromotions = products.reduce(
    (count, product) => count + product.promotions,
    0
  );

  const mobileMetricItems = [
    {
      label: 'Followed Products',
      value: (
        <>
          <Star className="w-4 h-4 text-blue-600" />
          {followedProducts}
        </>
      ),
      valueClassName: 'text-blue-600',
    },
    {
      label: 'Subscribed Products',
      value: (
        <>
          <Users className="w-4 h-4 text-green-600" />
          {subscribedProducts}
        </>
      ),
      valueClassName: 'text-green-600',
    },
    {
      label: 'Promotions',
      value: (
        <>
          <Gift className="w-4 h-4 text-orange-600" />
          {totalPromotions}
        </>
      ),
      valueClassName: 'text-orange-600',
    },
  ];

  const handleCreateProduct = (product: BrandProduct) => {
    setProducts((prev) => [product, ...prev]);
    setView('list');
  };

  const handleShowProduct = (product: BrandProduct) => {
    setSelectedProduct(product);
    setView('show');
  };

  const handleEditProduct = (product: BrandProduct) => {
    setSelectedProduct(product);
    setView('update');
  };

  const handleUpdateProduct = (updatedProduct: BrandProduct) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setSelectedProduct(updatedProduct);
    setView('list');
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
    if (selectedProduct?.id === productId) {
      setSelectedProduct(null);
      setView('list');
    }
  };

  if (view === 'create') {
    return (
      <div className="p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <CreateBrandProductForm
            onCreateProduct={handleCreateProduct}
            onCancel={() => setView('list')}
          />
        </div>
      </div>
    );
  }

  if (view === 'show' && selectedProduct) {
    return (
      <div className="p-4 sm:p-6">
        <ShowBrandProduct
          product={selectedProduct}
          onClose={() => {
            setView('list');
            setSelectedProduct(null);
          }}
          onEdit={handleEditProduct}
        />
      </div>
    );
  }

  if (view === 'update' && selectedProduct) {
    return (
      <div className="p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <UpdateBrandProductForm
            product={selectedProduct}
            onUpdateProduct={handleUpdateProduct}
            onCancel={() => {
              setView('list');
              setSelectedProduct(null);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">Brands</h1>
            <p className="text-sm text-neutral-600">
              Listing of products and key statistics.
            </p>
          </div>
          <Button
            onClick={() => setView('create')}
            className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Product
          </Button>
        </div>

        <MobileMetrics items={mobileMetricItems} />

        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Star className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-sm text-neutral-600">
                  Followed Products
                </div>
              </div>
              <div className="text-2xl font-bold text-neutral-900">
                {followedProducts}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="w-4 h-4 text-green-600" />
                </div>
                <div className="text-sm text-neutral-600">
                  Subscribed Products
                </div>
              </div>
              <div className="text-2xl font-bold text-neutral-900">
                {subscribedProducts}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Gift className="w-4 h-4 text-orange-600" />
                </div>
                <div className="text-sm text-neutral-600">Promotions</div>
              </div>
              <div className="text-2xl font-bold text-neutral-900">
                {totalPromotions}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-neutral-900">
              Listing of Products
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {products.length === 0 ? (
              <div className="text-center py-10 text-sm text-neutral-500">
                No products yet.
              </div>
            ) : (
              products.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col gap-3 p-4 border border-neutral-200 rounded-lg"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-neutral-100 rounded-lg">
                        <Package className="w-4 h-4 text-neutral-600" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-neutral-900">
                          {product.name}
                        </div>
                        <div className="text-xs text-neutral-500">
                          {product.category}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {product.followed && (
                        <Badge variant="secondary" className="text-xs">
                          Followed
                        </Badge>
                      )}
                      {product.subscribed && (
                        <Badge variant="secondary" className="text-xs">
                          Subscribed
                        </Badge>
                      )}
                      {product.promotions > 0 ? (
                        <Badge className="text-xs bg-[#ff5f6d] text-white">
                          {product.promotions} Promotion
                          {product.promotions > 1 ? 's' : ''}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          No Promotion
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleShowProduct(product)}
                      className="text-xs"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" />
                      Show
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditProduct(product)}
                      className="text-xs"
                    >
                      <Edit className="w-3.5 h-3.5 mr-1" />
                      Update
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-xs text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
