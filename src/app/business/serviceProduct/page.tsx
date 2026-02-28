'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';
import {
  Settings,
  Users,
  Zap,
  Bell,
  Shield,
  Headphones,
  BarChart3,
  Globe,
  Database,
  Cloud,
  Code,
  Monitor,
  Smartphone,
  Mail,
  MessageSquare,
  Phone,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Upload,
  Star,
  TrendingUp,
  Calendar,
  Target,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MobileMetrics } from '@/components/app/MobileMetrics';
import { CreateServiceForm, type ServiceCatalogItem } from './create';
import { ShowServiceItem } from './show';
import { UpdateServiceForm } from './update';

const serviceCategories = [
  {
    id: 'digital_marketing',
    name: 'Digital Marketing',
    icon: <Target className="w-5 h-5" />,
    services: [
      {
        id: 1,
        title: 'Social Media Management',
        description: 'Complete social media strategy and management',
        price: 899,
        duration: 'Monthly',
        clients: 45,
        rating: 4.8,
        status: 'active',
        features: [
          'Content Creation',
          'Community Management',
          'Analytics',
          '24/7 Support',
        ],
      },
      {
        id: 2,
        title: 'SEO Optimization',
        description: 'Boost your search engine rankings',
        price: 1299,
        duration: 'Monthly',
        clients: 32,
        rating: 4.9,
        status: 'active',
        features: [
          'Keyword Research',
          'On-page SEO',
          'Link Building',
          'Monthly Reports',
        ],
      },
      {
        id: 3,
        title: 'PPC Advertising',
        description: 'Targeted pay-per-click campaigns',
        price: 750,
        duration: 'Monthly',
        clients: 28,
        rating: 4.7,
        status: 'active',
        features: [
          'Campaign Setup',
          'Bid Management',
          'A/B Testing',
          'ROI Tracking',
        ],
      },
      {
        id: 13,
        title: 'Social Media Content Pack',
        description: 'Pre-built monthly content assets for campaigns',
        price: 199,
        duration: 'One-time',
        clients: 21,
        rating: 4.7,
        status: 'featured',
        type: 'product',
        features: ['30 Templates', 'Captions', 'Story Assets', 'Brand Ready'],
      },
    ],
  },
  {
    id: 'web_development',
    name: 'Web Development',
    icon: <Code className="w-5 h-5" />,
    services: [
      {
        id: 4,
        title: 'Custom Website Development',
        description: 'Responsive websites tailored to your brand',
        price: 2499,
        duration: 'One-time',
        clients: 18,
        rating: 4.9,
        status: 'active',
        features: [
          'Custom Design',
          'Mobile Responsive',
          'CMS Integration',
          '3 Months Support',
        ],
      },
      {
        id: 5,
        title: 'E-commerce Solutions',
        description: 'Complete online store development',
        price: 3999,
        duration: 'One-time',
        clients: 12,
        rating: 5.0,
        status: 'featured',
        features: [
          'Payment Integration',
          'Inventory Management',
          'User Accounts',
          'Order Tracking',
        ],
      },
      {
        id: 6,
        title: 'Web App Development',
        description: 'Progressive web applications',
        price: 5999,
        duration: 'Project-based',
        clients: 8,
        rating: 4.8,
        status: 'active',
        features: [
          'Custom Functionality',
          'API Integration',
          'Database Design',
          'Cloud Hosting',
        ],
      },
      {
        id: 14,
        title: 'Website Starter Template Kit',
        description: 'Launch-ready page templates and UI blocks',
        price: 149,
        duration: 'One-time',
        clients: 39,
        rating: 4.8,
        status: 'active',
        type: 'product',
        features: ['Landing Pages', 'UI Blocks', 'Forms', 'Theme Setup'],
      },
    ],
  },
  {
    id: 'consulting',
    name: 'Consulting',
    icon: <Headphones className="w-5 h-5" />,
    services: [
      {
        id: 7,
        title: 'Business Strategy Consulting',
        description: 'Strategic planning and growth advice',
        price: 199,
        duration: 'Hourly',
        clients: 67,
        rating: 4.9,
        status: 'active',
        features: [
          'Market Analysis',
          'Growth Planning',
          'Competitive Research',
          'Action Plans',
        ],
      },
      {
        id: 8,
        title: 'Technology Advisory',
        description: 'Tech stack and infrastructure guidance',
        price: 249,
        duration: 'Hourly',
        clients: 34,
        rating: 4.8,
        status: 'active',
        features: [
          'Tech Assessment',
          'Architecture Planning',
          'Tool Selection',
          'Implementation Guide',
        ],
      },
      {
        id: 9,
        title: 'Brand Development',
        description: 'Complete brand identity and positioning',
        price: 1999,
        duration: 'Project-based',
        clients: 23,
        rating: 4.9,
        status: 'premium',
        features: [
          'Brand Strategy',
          'Visual Identity',
          'Messaging',
          'Guidelines',
        ],
      },
    ],
  },
  {
    id: 'support',
    name: 'Support Services',
    icon: <Shield className="w-5 h-5" />,
    services: [
      {
        id: 10,
        title: '24/7 Technical Support',
        description: 'Round-the-clock technical assistance',
        price: 399,
        duration: 'Monthly',
        clients: 156,
        rating: 4.7,
        status: 'active',
        features: [
          '24/7 Availability',
          'Multiple Channels',
          'Priority Queue',
          'SLA Guarantee',
        ],
      },
      {
        id: 11,
        title: 'Website Maintenance',
        description: 'Keep your website updated and secure',
        price: 299,
        duration: 'Monthly',
        clients: 89,
        rating: 4.8,
        status: 'active',
        features: [
          'Security Updates',
          'Content Updates',
          'Performance Monitoring',
          'Backup Services',
        ],
      },
      {
        id: 12,
        title: 'Cloud Infrastructure',
        description: 'Managed cloud hosting and scaling',
        price: 599,
        duration: 'Monthly',
        clients: 41,
        rating: 4.9,
        status: 'active',
        features: [
          'Auto Scaling',
          'Load Balancing',
          'Monitoring',
          'Disaster Recovery',
        ],
      },
    ],
  },
];

const serviceMetrics = {
  totalServices: 12,
  totalProducts: 2,
  followedProducts: 38,
  subscribedProducts: 24,
  activeClients: 456,
  totalPromotions: 24,
  completionRate: 98.5,
  clientRetention: 92.3,
};

const recentOrders = [
  {
    id: 1,
    service: 'SEO Optimization',
    client: 'TechStart Inc.',
    status: 'in_progress',
    value: 1299,
    startDate: '2 days ago',
    deadline: 'Ongoing',
  },
  {
    id: 2,
    service: 'E-commerce Solutions',
    client: 'Fashion Boutique',
    status: 'completed',
    value: 3999,
    startDate: '1 week ago',
    deadline: 'Delivered',
  },
  {
    id: 3,
    service: 'Brand Development',
    client: 'Green Energy Co.',
    status: 'pending',
    value: 1999,
    startDate: 'Today',
    deadline: '4 weeks',
  },
  {
    id: 4,
    service: 'Website Maintenance',
    client: 'Local Restaurant',
    status: 'active',
    value: 299,
    startDate: '3 days ago',
    deadline: 'Monthly',
  },
  {
    id: 5,
    service: 'Business Strategy',
    client: 'Startup Hub',
    status: 'in_progress',
    value: 1990,
    startDate: '5 days ago',
    deadline: '2 weeks',
  },
];

const clientFeedback = [
  {
    id: 1,
    client: 'Sarah Johnson',
    company: 'TechStart Inc.',
    service: 'SEO Optimization',
    rating: 5,
    comment:
      'Outstanding results! Our organic traffic increased by 340% in just 3 months.',
    date: '2 days ago',
  },
  {
    id: 2,
    client: 'Mike Chen',
    company: 'Fashion Boutique',
    service: 'E-commerce Solutions',
    rating: 5,
    comment:
      'The new store exceeded our expectations. Sales increased by 250% since launch.',
    date: '1 week ago',
  },
  {
    id: 3,
    client: 'Emma Rodriguez',
    company: 'Green Energy Co.',
    service: 'Brand Development',
    rating: 4,
    comment:
      'Great work on our brand identity. Really captured our vision perfectly.',
    date: '2 weeks ago',
  },
];

type CategoryType =
  | 'digital_marketing'
  | 'web_development'
  | 'consulting'
  | 'support';

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'services' | 'products'>(
    'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [servicesView, setServicesView] = useState<
    'list' | 'create' | 'show' | 'update'
  >('list');
  const [customItems, setCustomItems] = useState<ServiceCatalogItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ServiceCatalogItem | null>(
    null
  );
  const showSectionRef = useRef<HTMLDivElement | null>(null);
  const updateSectionRef = useRef<HTMLDivElement | null>(null);
  const [editedSeededItems, setEditedSeededItems] = useState<
    Record<string, ServiceCatalogItem>
  >({});

  const scrollToSection = (element: HTMLDivElement | null) => {
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.scrollY - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  useEffect(() => {
    if (servicesView === 'show' && showSectionRef.current) {
      scrollToSection(showSectionRef.current);
    }

    if (servicesView === 'update' && updateSectionRef.current) {
      scrollToSection(updateSectionRef.current);
    }
  }, [servicesView, selectedItem?.id]);

  const categoryOptions = serviceCategories.map((category) => ({
    id: category.id,
    name: category.name,
  }));

  const seededItems = serviceCategories.flatMap((category) =>
    category.services.map((service) => ({
      ...service,
      id: String(service.id),
      type: (service.type ?? 'service') as 'service' | 'product',
      categoryId: category.id,
    }))
  );

  const currentItems = [
    ...seededItems.map((item) => editedSeededItems[item.id] ?? item),
    ...customItems,
  ];

  const filteredItems = currentItems.filter((item) => {
    if (activeTab === 'services' && item.type !== 'service') return false;
    if (activeTab === 'products' && item.type !== 'product') return false;

    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  });

  const handleCreateItem = (item: ServiceCatalogItem) => {
    setCustomItems((prev) => [item, ...prev]);
    setServicesView('list');
  };

  const handleShowItem = (item: ServiceCatalogItem) => {
    setSelectedItem(item);
    setServicesView('show');
  };

  const handleEditItem = (item: ServiceCatalogItem) => {
    setSelectedItem(item);
    setServicesView('update');
  };

  const handleUpdateItem = (updatedItem: ServiceCatalogItem) => {
    setCustomItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );

    const seededExists = seededItems.some((item) => item.id === updatedItem.id);
    if (seededExists) {
      setEditedSeededItems((prev) => ({
        ...prev,
        [updatedItem.id]: updatedItem,
      }));
    }

    setSelectedItem(updatedItem);
    setServicesView('list');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'featured':
        return (
          <Badge className="bg-[#ff5f6d] text-white text-xs">Featured</Badge>
        );
      case 'premium':
        return (
          <Badge className="bg-purple-500 text-white text-xs">Premium</Badge>
        );
      case 'active':
        return (
          <Badge className="bg-green-500 text-white text-xs">Active</Badge>
        );
      default:
        return null;
    }
  };

  const tabs: Array<{
    id: 'all' | 'services' | 'products';
    label: string;
    icon: ReactNode;
  }> = [
    {
      id: 'all',
      label: 'All',
      icon: <Filter className="w-4 h-4" />,
    },
    {
      id: 'services',
      label: 'Services',
      icon: <Settings className="w-4 h-4" />,
    },
    {
      id: 'products',
      label: 'Products',
      icon: <BarChart3 className="w-4 h-4" />,
    },
  ];

  const mobileMetricItems = [
    {
      label: 'Total Services',
      value: serviceMetrics.totalServices,
      valueClassName: 'text-[#ff5f6d]',
    },
    {
      label: 'Total Products',
      value: serviceMetrics.totalProducts,
      valueClassName: 'text-[#ff5f6d]',
    },
    {
      label: 'Followed Products',
      value: (
        <>
          <Users className="w-4 h-4" />
          {serviceMetrics.followedProducts}
        </>
      ),
      valueClassName: 'text-indigo-500',
    },
    {
      label: 'Subscribed Products',
      value: (
        <>
          <Bell className="w-4 h-4" />
          {serviceMetrics.subscribedProducts}
        </>
      ),
      valueClassName: 'text-cyan-500',
    },
    {
      label: 'Promotions',
      value: (
        <>
          <TrendingUp className="w-4 h-4" />
          {serviceMetrics.totalPromotions}
        </>
      ),
      valueClassName: 'text-yellow-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-[#ff5f6d]" />
            <h1 className="text-2xl font-semibold">
              Service & Products Management
            </h1>
          </div>
          <Button
            className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 w-full sm:w-auto"
            onClick={() => {
              setActiveTab('services');
              setServicesView('create');
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product / Service
          </Button>
        </div>

        {/* Metrics Overview */}
        <MobileMetrics items={mobileMetricItems} />

        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="p-6 border border-neutral-200 rounded-xl bg-white shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#ff5f6d] mb-1">
                {serviceMetrics.totalServices}
              </div>
              <div className="text-xs text-neutral-600">Total Services</div>
            </div>
          </Card>
          <Card className="p-6 border border-neutral-200 rounded-xl bg-white shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#ff5f6d] mb-1">
                {serviceMetrics.totalProducts}
              </div>
              <div className="text-xs text-neutral-600">Total Products</div>
            </div>
          </Card>

          <Card className="p-6 border border-neutral-200 rounded-xl bg-white shadow-sm">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Users className="w-4 h-4 text-indigo-500" />
                <span className="text-2xl font-bold text-indigo-500">
                  {serviceMetrics.followedProducts}
                </span>
              </div>
              <div className="text-xs text-neutral-600">Followed Products</div>
            </div>
          </Card>

          <Card className="p-6 border border-neutral-200 rounded-xl bg-white shadow-sm">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Bell className="w-4 h-4 text-cyan-500" />
                <span className="text-2xl font-bold text-cyan-500">
                  {serviceMetrics.subscribedProducts}
                </span>
              </div>
              <div className="text-xs text-neutral-600">
                Subscribed Products
              </div>
            </div>
          </Card>

          <Card className="p-6 border border-neutral-200 rounded-xl bg-white shadow-sm">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="w-4 h-4 text-yellow-500" />
                <span className="text-2xl font-bold text-yellow-500">
                  {serviceMetrics.totalPromotions}
                </span>
              </div>
              <div className="text-xs text-neutral-600">
                Number of Promotions
              </div>
            </div>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1 p-1 bg-neutral-100 rounded-lg w-full sm:w-fit overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-white text-[#ff5f6d] shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {(activeTab === 'all' ||
          activeTab === 'services' ||
          activeTab === 'products') && (
          <div>
            {/* Search and Filter */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative w-full sm:flex-1 sm:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <Input
                  placeholder="Search services or products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {servicesView === 'create' && (
              <CreateServiceForm
                categories={categoryOptions}
                defaultCategoryId={
                  categoryOptions[0]?.id ?? 'digital_marketing'
                }
                onCreateItem={handleCreateItem}
                onCancel={() => setServicesView('list')}
              />
            )}

            {servicesView === 'show' && selectedItem && (
              <div ref={showSectionRef}>
                <ShowServiceItem
                  item={selectedItem}
                  onClose={() => {
                    setServicesView('list');
                    setSelectedItem(null);
                  }}
                  onEdit={handleEditItem}
                />
              </div>
            )}

            {servicesView === 'update' && selectedItem && (
              <div ref={updateSectionRef}>
                <UpdateServiceForm
                  item={selectedItem}
                  onUpdateItem={handleUpdateItem}
                  onCancel={() => {
                    setServicesView('list');
                    setSelectedItem(null);
                  }}
                />
              </div>
            )}

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((service) => (
                <Card
                  key={service.id}
                  className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    {service.imageUrl && (
                      <div className="mb-4 overflow-hidden rounded-xl border border-neutral-200">
                        <img
                          src={service.imageUrl}
                          alt={`${service.title} banner`}
                          className="w-full h-36 object-cover"
                        />
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getStatusBadge(service.status)}
                          <Badge
                            variant="outline"
                            className="text-xs capitalize"
                          >
                            {service.type}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-xs text-neutral-600">
                              {service.rating}
                            </span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-neutral-900 mb-2">
                          {service.title}
                        </h3>
                        <p className="text-sm text-neutral-600 mb-3">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-xs text-neutral-500 mb-2">
                        Features:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {service.features.slice(0, 2).map((feature, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {feature}
                          </Badge>
                        ))}
                        {service.features.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{service.features.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-lg font-bold text-[#ff5f6d]">
                          ${service.price.toLocaleString()}
                        </div>
                        <div className="text-xs text-neutral-500">
                          {service.duration}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-neutral-900">
                          {service.clients} clients
                        </div>
                        <div className="text-xs text-neutral-500">active</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleEditItem(service)}
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90"
                        onClick={() => handleShowItem(service)}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
