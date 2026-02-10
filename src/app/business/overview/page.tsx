"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Package,
  Edit,
  Trash2,
  DollarSign,
  Tag,
  Image as ImageIcon,
  Star,
  TrendingUp,
  ShoppingBag,
  Users,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  type: "product" | "service";
  featured: boolean;
}

export default function BusinessOverviewPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Premium Web Design",
      description: "Custom website design with responsive layout and modern UI",
      price: 2499,
      category: "Web Design",
      type: "service",
      featured: true,
    },
    {
      id: "2",
      name: "Digital Marketing Package",
      description: "Comprehensive social media and SEO marketing solution",
      price: 899,
      category: "Marketing",
      type: "service",
      featured: false,
    },
  ]);
  const nextProductIdRef = useRef(3);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    type: "product" as "product" | "service",
    featured: false,
  });
  const [activeTab, setActiveTab] = useState("all");

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? { ...p, ...formData, price: parseFloat(formData.price) }
            : p,
        ),
      );
    } else {
      const newProduct: Product = {
        id: String(nextProductIdRef.current++),
        ...formData,
        price: parseFloat(formData.price),
      };
      setProducts((prev) => [...prev, newProduct]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      type: "product",
      featured: false,
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      type: product.type,
      featured: product.featured,
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredProducts = products.filter((product) => {
    if (activeTab === "all") return true;
    if (activeTab === "products") return product.type === "product";
    if (activeTab === "services") return product.type === "service";
    if (activeTab === "featured") return product.featured;
    return true;
  });

  const stats = {
    total: products.length,
    products: products.filter((p) => p.type === "product").length,
    services: products.filter((p) => p.type === "service").length,
    featured: products.filter((p) => p.featured).length,
    avgPrice:
      products.length > 0
        ? products.reduce((sum, p) => sum + p.price, 0) / products.length
        : 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ff5f6d] to-[#ffc371] py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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

        {/* Add/Edit Form */}
        {showForm && (
          <Card className="p-6 bg-white/95 backdrop-blur-sm border-white/30 shadow-xl mb-8">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-neutral-900">
                {editingId ? "Edit Item" : "Add New Product/Service"}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="Product or service name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="99.99"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    placeholder="e.g., Web Design, Marketing"
                    value={formData.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Type</Label>
                  <div className="flex gap-2 mt-1">
                    <Button
                      type="button"
                      variant={
                        formData.type === "product" ? "default" : "outline"
                      }
                      onClick={() => handleInputChange("type", "product")}
                      className="flex-1"
                    >
                      Product
                    </Button>
                    <Button
                      type="button"
                      variant={
                        formData.type === "service" ? "default" : "outline"
                      }
                      onClick={() => handleInputChange("type", "service")}
                      className="flex-1"
                    >
                      Service
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  placeholder="Describe your product or service..."
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="mt-1 w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5f6d] focus:border-transparent resize-none"
                  rows={3}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) =>
                    handleInputChange("featured", e.target.checked)
                  }
                  className="rounded border-neutral-300"
                />
                <Label htmlFor="featured" className="cursor-pointer">
                  Mark as featured
                </Label>
              </div>
              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] text-white"
                >
                  {editingId ? "Update" : "Add"} Item
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Main Content */}
        <Card className="bg-white/95 backdrop-blur-sm border-white/30 shadow-xl">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-neutral-900">
                Products & Services
              </h2>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>

            {/* Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mb-6"
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
                <TabsTrigger value="services">
                  Services ({stats.services})
                </TabsTrigger>
                <TabsTrigger value="products">
                  Products ({stats.products})
                </TabsTrigger>
                <TabsTrigger value="featured">
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
                  <Button onClick={() => setShowForm(true)} variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add your first item
                  </Button>
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
                            {product.type === "product" ? (
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

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleEdit(product)}
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
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
