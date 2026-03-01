export interface SetupFormData {
  businessName: string;
  description: string;
  category: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  facebook: string;
  instagram: string;
  youtube: string;
  twitter: string;
  tiktok: string;
  linkedin: string;
}

export interface PrivacySettings {
  twoFactorEnabled: boolean;
}

export interface SubscriptionSettings {
  planName: string;
  planType: 'monthly' | 'annual';
  nextBilling: string;
  autoRenew: boolean;
  billingHistory: boolean;
}

export interface ApiSettings {
  apiKey: string;
  webhookUrl: string;
  rateLimitEnabled: boolean;
  apiLogging: boolean;
}
