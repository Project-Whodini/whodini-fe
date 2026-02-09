"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Upload,
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Save,
} from "lucide-react";
import Image from "next/image";

export default function BusinessSetupPage() {
  const [formData, setFormData] = useState({
    businessName: "",
    description: "",
    category: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    email: "",
    website: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo purpose - just log the data
    console.log("Business setup data:", formData);
    alert("Business setup completed! (Demo)");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-[#ff5f6d] to-[#ffc371] rounded-xl shadow-md">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Business Setup</h1>
            <p className="text-gray-600">
              Configure your business profile and details
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Business Logo */}
        <Card className="p-6 border shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">
              Business Logo
            </h2>
            <p className="text-neutral-600 text-sm">
              Upload your business logo (recommended: 200x200px)
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              {logoPreview ? (
                <Image
                  src={logoPreview}
                  alt="Business Logo"
                  width={100}
                  height={100}
                  className="rounded-xl border border-neutral-200 object-cover"
                />
              ) : (
                <div className="w-24 h-24 bg-neutral-100 rounded-xl border border-dashed border-neutral-300 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-neutral-400" />
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="logo-upload" className="inline-block">
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Logo
                </Button>
              </Label>
              <Input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <p className="text-xs text-neutral-500 mt-1">
                PNG, JPG up to 5MB
              </p>
            </div>
          </div>
        </Card>

        {/* Basic Information */}
        <Card className="p-6 border shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">
              Basic Information
            </h2>
            <p className="text-neutral-600 text-sm">
              Tell us about your business
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                placeholder="Enter your business name"
                value={formData.businessName}
                onChange={(e) =>
                  handleInputChange("businessName", e.target.value)
                }
                className="mt-1"
                required
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="description">Business Description</Label>
              <textarea
                id="description"
                placeholder="Briefly describe your business..."
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="mt-1 w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5f6d] focus:border-transparent resize-none"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="category">Business Category</Label>
              <Input
                id="category"
                placeholder="e.g., Technology, Retail, etc."
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="p-6 border shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-2 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#ff5f6d]" />
              Contact Information
            </h2>
            <p className="text-neutral-600 text-sm">
              Where can customers reach you?
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                placeholder="Enter your business address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="City"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="state">State/Province</Label>
              <Input
                id="state"
                placeholder="State"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="zipCode">ZIP/Postal Code</Label>
              <Input
                id="zipCode"
                placeholder="ZIP Code"
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="Country"
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Business Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="business@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </Card>

        {/* Online Presence */}
        <Card className="p-6 border shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-2 flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#ff5f6d]" />
              Online Presence
            </h2>
            <p className="text-neutral-600 text-sm">
              Connect your social media and website
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="website" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Website
              </Label>
              <Input
                id="website"
                placeholder="https://www.yourbusiness.com"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                className="mt-1"
              />
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="facebook" className="flex items-center gap-2">
                  <Facebook className="w-4 h-4 text-blue-600" />
                  Facebook
                </Label>
                <Input
                  id="facebook"
                  placeholder="https://facebook.com/yourbusiness"
                  value={formData.facebook}
                  onChange={(e) =>
                    handleInputChange("facebook", e.target.value)
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="instagram" className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-pink-600" />
                  Instagram
                </Label>
                <Input
                  id="instagram"
                  placeholder="https://instagram.com/yourbusiness"
                  value={formData.instagram}
                  onChange={(e) =>
                    handleInputChange("instagram", e.target.value)
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="twitter" className="flex items-center gap-2">
                  <Twitter className="w-4 h-4 text-blue-400" />
                  Twitter
                </Label>
                <Input
                  id="twitter"
                  placeholder="https://twitter.com/yourbusiness"
                  value={formData.twitter}
                  onChange={(e) => handleInputChange("twitter", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="linkedin" className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-blue-700" />
                  LinkedIn
                </Label>
                <Input
                  id="linkedin"
                  placeholder="https://linkedin.com/company/yourbusiness"
                  value={formData.linkedin}
                  onChange={(e) =>
                    handleInputChange("linkedin", e.target.value)
                  }
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] text-white hover:opacity-90"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Business Profile
          </Button>
        </div>
      </form>
    </div>
  );
}
