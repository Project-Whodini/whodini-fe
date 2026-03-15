# Business API Routes

All routes require a valid session/auth token in the `Authorization` header.  
All delete operations are **soft deletes** using a `deleted_at` timestamp.  
Base path: `/api/business`

---

## Table of Contents

1. [Profile](#1-profile)
2. [Dashboard](#2-dashboard)
3. [Overview](#3-overview)
4. [Brands](#4-brands)
5. [Events](#5-events)
6. [Service & Product Catalog](#6-service--product-catalog)
7. [Notifications](#7-notifications)
8. [Subscribers](#8-subscribers)
9. [History](#9-history)
10. [Team](#10-team)
11. [Settings](#11-settings)

---

## 1. Profile

### Get Business Profile

**Method:** `GET`  
**Path:** `/api/business/profile`  
**Purpose:** Retrieve the authenticated business's full profile including contact and social links.

**Response:**

```json
{
  "data": {
    "id": "WD-B-a42741f6",
    "business_name": "Demo Business",
    "description": "A premium brand offering digital solutions.",
    "category": "Technology",
    "logo_url": "https://cdn.whodini.com/logos/demo.png",
    "address": "123 Main St",
    "city": "Manila",
    "state": "Metro Manila",
    "zip_code": "1000",
    "country": "Philippines",
    "phone": "+63 912 345 6789",
    "email": "hello@demobusiness.com",
    "website": "https://demobusiness.com",
    "facebook": "demobusiness",
    "instagram": "@demobusiness",
    "twitter": "@demobusiness",
    "tiktok": "@demobusiness",
    "linkedin": "linkedin.com/company/demobusiness",
    "youtube": "youtube.com/@demobusiness",
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### Update Business Profile

**Method:** `PATCH`  
**Path:** `/api/business/profile`  
**Purpose:** Update any combination of the business's general info, location, contact details, social links, and logo. All fields are optional — only the provided fields are updated.

**Request Body:**

```json
{
  "business_name": "Demo Business",
  "description": "Updated description.",
  "category": "Technology",
  "logo_url": "data:image/png;base64,...",
  "address": "456 New St",
  "city": "Makati",
  "state": "Metro Manila",
  "zip_code": "1200",
  "country": "Philippines",
  "phone": "+63 912 000 0000",
  "email": "contact@demobusiness.com",
  "website": "https://demobusiness.com",
  "facebook": "demobusiness",
  "instagram": "@demobusiness",
  "twitter": "@demobusiness",
  "tiktok": "@demobusiness",
  "linkedin": "linkedin.com/company/demobusiness",
  "youtube": "youtube.com/@demobusiness"
}
```

**Response:**

```json
{
  "data": {
    "id": "WD-B-a42741f6",
    "business_name": "Demo Business",
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

---

## 2. Dashboard

### Get Business Dashboard

**Method:** `GET`  
**Path:** `/api/business/dashboard`  
**Purpose:** Get the main dashboard snapshot: subscriber count, product/service counts, and upcoming events.

**Response:**

```json
{
  "data": {
    "business_name": "Demo Business",
    "whodini_id": "WD-B-a42741f6",
    "digital_id": "@demobusiness",
    "subscribe_link": "/subscribe/@demobusiness",
    "metrics": {
      "subscribers": 124,
      "products": 3,
      "services": 2,
      "events": 4
    },
    "flagship_product": {
      "id": "prod-1",
      "name": "Starter Kit",
      "is_flagship": true
    }
  }
}
```

---

### Set Flagship Product

**Method:** `PATCH`  
**Path:** `/api/business/dashboard/flagship`  
**Purpose:** Set a specific product as the flagship product shown on the dashboard.

**Request Body:**

```json
{
  "product_id": "prod-1"
}
```

**Response:**

```json
{
  "data": {
    "product_id": "prod-1",
    "is_flagship": true,
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

---

## 3. Overview

### List Overview Items

**Method:** `GET`  
**Path:** `/api/business/overview`  
**Purpose:** Get all products and services shown on the public-facing business overview page.

**Query Parameters:**

| Param    | Type   | Description                                                             |
| -------- | ------ | ----------------------------------------------------------------------- |
| `filter` | string | Filter by `all`, `products`, `services`, or `featured` (default: `all`) |

**Response:**

```json
{
  "data": [
    {
      "id": "1",
      "name": "Premium Web Design",
      "description": "Custom website design with responsive layout.",
      "price": 2499,
      "category": "Web Design",
      "type": "service",
      "featured": true
    },
    {
      "id": "3",
      "name": "Brand Starter Kit",
      "description": "Complete branding package.",
      "price": 499,
      "category": "Branding",
      "type": "product",
      "featured": false
    }
  ],
  "meta": {
    "total": 3,
    "products": 1,
    "services": 2,
    "featured": 1,
    "avg_price": 1299
  }
}
```

---

### Toggle Featured

**Method:** `PATCH`  
**Path:** `/api/business/overview/:id/featured`  
**Purpose:** Toggle the featured flag for an overview item.

**Request Body:**

```json
{
  "featured": true
}
```

**Response:**

```json
{
  "data": {
    "id": "1",
    "featured": true,
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

---

## 4. Brands

### List Brand Products

**Method:** `GET`  
**Path:** `/api/business/brands`  
**Purpose:** List all brand products for the authenticated business.

**Response:**

```json
{
  "data": [
    {
      "id": "1",
      "name": "Starter Kit",
      "category": "Bundle",
      "followed": true,
      "subscribed": true,
      "promotions": 1
    },
    {
      "id": "2",
      "name": "Premium Bundle",
      "category": "Package",
      "followed": true,
      "subscribed": false,
      "promotions": 2
    }
  ],
  "meta": {
    "total": 4,
    "followed": 2,
    "subscribed": 2,
    "total_promotions": 4
  }
}
```

---

### Create Brand Product

**Method:** `POST`  
**Path:** `/api/business/brands`  
**Purpose:** Add a new brand product.

**Request Body:**

```json
{
  "name": "Launch Toolkit",
  "category": "Toolkit",
  "followed": false,
  "subscribed": false,
  "promotions": 1
}
```

**Response:**

```json
{
  "data": {
    "id": "brand_prod_1234567890",
    "name": "Launch Toolkit",
    "category": "Toolkit",
    "followed": false,
    "subscribed": false,
    "promotions": 1,
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### Get Brand Product Detail

**Method:** `GET`  
**Path:** `/api/business/brands/:id`  
**Purpose:** Get full detail for a single brand product.

**Response:**

```json
{
  "data": {
    "id": "1",
    "name": "Starter Kit",
    "category": "Bundle",
    "followed": true,
    "subscribed": true,
    "promotions": 1
  }
}
```

---

### Update Brand Product

**Method:** `PATCH`  
**Path:** `/api/business/brands/:id`  
**Purpose:** Update a brand product's fields.

**Request Body:**

```json
{
  "name": "Starter Kit v2",
  "category": "Bundle",
  "promotions": 2
}
```

**Response:**

```json
{
  "data": {
    "id": "1",
    "name": "Starter Kit v2",
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### Delete Brand Product

**Method:** `DELETE`  
**Path:** `/api/business/brands/:id`  
**Purpose:** Soft delete a brand product.

**Response:**

```json
{
  "data": {
    "id": "1",
    "deleted_at": "2025-01-01T00:00:00Z"
  }
}
```

---

## 5. Events

### List Business Events

**Method:** `GET`  
**Path:** `/api/business/events`  
**Purpose:** List all events for the authenticated business.

**Response:**

```json
{
  "data": [
    {
      "id": "evt_static_1",
      "title": "Weekend Pop-Up Market",
      "description": "Local creators, food booths, and live music.",
      "starts_at": "2026-03-12T17:00:00.000Z",
      "location_type": "in_person",
      "location_label": "Downtown Hall",
      "payment_type": "free",
      "price": 0,
      "organizer_label": "Demo Business",
      "is_advertised": true
    }
  ],
  "meta": {
    "total": 3,
    "free": 2,
    "paid": 1,
    "advertised": 1
  }
}
```

---

### Create Event

**Method:** `POST`  
**Path:** `/api/business/events`  
**Purpose:** Create a new event for the business.

**Request Body:**

```json
{
  "title": "Product Launch Live",
  "description": "Live online product launch and Q&A.",
  "starts_at": "2026-03-29T14:00:00.000Z",
  "location_type": "virtual",
  "location_label": "Whodini Live Room",
  "payment_type": "free",
  "price": 0
}
```

**Response:**

```json
{
  "data": {
    "id": "evt_local_1234567890",
    "title": "Product Launch Live",
    "organizer_label": "Demo Business",
    "starts_at": "2026-03-29T14:00:00.000Z",
    "location_type": "virtual",
    "location_label": "Whodini Live Room",
    "payment_type": "free",
    "price": 0,
    "is_advertised": false,
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### Get Event Detail

**Method:** `GET`  
**Path:** `/api/business/events/:id`  
**Purpose:** Get full detail for a single business event.

**Response:**

```json
{
  "data": {
    "id": "evt_static_1",
    "title": "Weekend Pop-Up Market",
    "description": "Local creators, food booths, and live music.",
    "starts_at": "2026-03-12T17:00:00.000Z",
    "location_type": "in_person",
    "location_label": "Downtown Hall",
    "payment_type": "free",
    "price": 0,
    "organizer_label": "Demo Business",
    "is_advertised": true
  }
}
```

---

### Update Event

**Method:** `PATCH`  
**Path:** `/api/business/events/:id`  
**Purpose:** Update an existing event's details.

**Request Body:**

```json
{
  "title": "Weekend Pop-Up Market (Updated)",
  "location_label": "City Plaza",
  "payment_type": "paid",
  "price": 20
}
```

**Response:**

```json
{
  "data": {
    "id": "evt_static_1",
    "title": "Weekend Pop-Up Market (Updated)",
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### Delete Event

**Method:** `DELETE`  
**Path:** `/api/business/events/:id`  
**Purpose:** Soft delete a business event.

**Response:**

```json
{
  "data": {
    "id": "evt_static_1",
    "deleted_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### Toggle Event Advertisement

**Method:** `PATCH`  
**Path:** `/api/business/events/:id/advertise`  
**Purpose:** Enable or disable advertising/featuring for an event.

**Request Body:**

```json
{
  "is_advertised": true
}
```

**Response:**

```json
{
  "data": {
    "id": "evt_static_1",
    "is_advertised": true,
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

---

## 6. Service & Product Catalog

### List Catalog Categories

**Method:** `GET`  
**Path:** `/api/business/catalog/categories`  
**Purpose:** Get all top-level service/product categories.

**Response:**

```json
{
  "data": [
    { "id": "digital_marketing", "name": "Digital Marketing" },
    { "id": "web_development", "name": "Web Development" },
    { "id": "design", "name": "Design & Branding" },
    { "id": "consulting", "name": "Consulting" }
  ]
}
```

---

### List Catalog Items

**Method:** `GET`  
**Path:** `/api/business/catalog`  
**Purpose:** List all products and services in the business's catalog, optionally filtered by category or type.

**Query Parameters:**

| Param      | Type   | Description                                 |
| ---------- | ------ | ------------------------------------------- |
| `category` | string | Filter by category ID (optional)            |
| `type`     | string | Filter by `product` or `service` (optional) |
| `search`   | string | Search by title or description (optional)   |

**Response:**

```json
{
  "data": [
    {
      "id": "1",
      "category_id": "digital_marketing",
      "type": "service",
      "title": "Social Media Management",
      "description": "Complete social media strategy and management.",
      "price": 899,
      "duration": "Monthly",
      "clients": 45,
      "rating": 4.8,
      "status": "active",
      "features": ["Content Creation", "Community Management", "Analytics"],
      "image_url": null
    }
  ]
}
```

---

### Create Catalog Item

**Method:** `POST`  
**Path:** `/api/business/catalog`  
**Purpose:** Add a new product or service to the catalog.

**Request Body:**

```json
{
  "category_id": "digital_marketing",
  "type": "service",
  "title": "Email Marketing Campaign",
  "description": "Full email campaign strategy and execution.",
  "image_url": null,
  "price": 599,
  "duration": "Monthly",
  "status": "active",
  "features": ["List Segmentation", "A/B Testing", "Analytics Report"]
}
```

**Response:**

```json
{
  "data": {
    "id": "catalog_1234567890",
    "category_id": "digital_marketing",
    "type": "service",
    "title": "Email Marketing Campaign",
    "price": 599,
    "duration": "Monthly",
    "clients": 0,
    "rating": 0,
    "status": "active",
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### Get Catalog Item Detail

**Method:** `GET`  
**Path:** `/api/business/catalog/:id`  
**Purpose:** Get full detail for a single catalog item.

**Response:**

```json
{
  "data": {
    "id": "1",
    "category_id": "digital_marketing",
    "type": "service",
    "title": "Social Media Management",
    "description": "Complete social media strategy and management.",
    "price": 899,
    "duration": "Monthly",
    "clients": 45,
    "rating": 4.8,
    "status": "active",
    "features": [
      "Content Creation",
      "Community Management",
      "Analytics",
      "24/7 Support"
    ],
    "image_url": null
  }
}
```

---

### Update Catalog Item

**Method:** `PATCH`  
**Path:** `/api/business/catalog/:id`  
**Purpose:** Update a catalog item's fields.

**Request Body:**

```json
{
  "title": "Social Media Management Pro",
  "price": 999,
  "status": "featured"
}
```

**Response:**

```json
{
  "data": {
    "id": "1",
    "title": "Social Media Management Pro",
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### Delete Catalog Item

**Method:** `DELETE`  
**Path:** `/api/business/catalog/:id`  
**Purpose:** Soft delete a catalog item.

**Response:**

```json
{
  "data": {
    "id": "1",
    "deleted_at": "2025-01-01T00:00:00Z"
  }
}
```

---

## 7. Notifications

### List Notifications

**Method:** `GET`  
**Path:** `/api/business/notifications`  
**Purpose:** List all notifications composed by the business, filterable by status.

**Query Parameters:**

| Param    | Type   | Description                                                                 |
| -------- | ------ | --------------------------------------------------------------------------- |
| `status` | string | Filter by `sent`, `scheduled`, `draft`, or `failed` (optional, returns all) |
| `search` | string | Search by title (optional)                                                  |

**Response:**

```json
{
  "data": [
    {
      "id": "1",
      "title": "Flash Sale: 50% Off Everything!",
      "message": "Don't miss our biggest sale of the year!",
      "type": "promotional",
      "audience": "all_subscribers",
      "sent_at": "2024-02-11T14:30:00Z",
      "delivered": 1247,
      "opened": 423,
      "clicked": 89,
      "status": "sent"
    }
  ],
  "meta": {
    "total": 5,
    "sent": 3,
    "scheduled": 1,
    "draft": 1
  }
}
```

---

### Send / Schedule Notification

**Method:** `POST`  
**Path:** `/api/business/notifications`  
**Purpose:** Compose and send or schedule a notification to subscribers.

**Request Body:**

```json
{
  "title": "New Product Drop!",
  "message": "Check out our latest release.",
  "type": "promotional",
  "audience": "all_subscribers",
  "location_radius": null,
  "scheduled_time": null,
  "action_url": "https://demobusiness.com/shop",
  "image_url": null
}
```

**Response:**

```json
{
  "data": {
    "id": "notif_1234567890",
    "title": "New Product Drop!",
    "status": "sent",
    "delivered": 124,
    "sent_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### Get Notification Detail

**Method:** `GET`  
**Path:** `/api/business/notifications/:id`  
**Purpose:** Get the full detail and delivery stats of a single notification.

**Response:**

```json
{
  "data": {
    "id": "1",
    "title": "Flash Sale: 50% Off Everything!",
    "message": "Don't miss our biggest sale of the year! Use code SAVE50.",
    "type": "promotional",
    "audience": "all_subscribers",
    "location_radius": null,
    "scheduled_time": null,
    "action_url": null,
    "image_url": null,
    "delivered": 1247,
    "opened": 423,
    "clicked": 89,
    "status": "sent",
    "sent_at": "2024-02-11T14:30:00Z"
  }
}
```

---

### Delete Notification

**Method:** `DELETE`  
**Path:** `/api/business/notifications/:id`  
**Purpose:** Soft delete a notification record.

**Response:**

```json
{
  "data": {
    "id": "1",
    "deleted_at": "2025-01-01T00:00:00Z"
  }
}
```

---

## 8. Subscribers

### List Subscribers

**Method:** `GET`  
**Path:** `/api/business/subscribers`  
**Purpose:** Get the business's subscriber list with engagement and billing info.

**Query Parameters:**

| Param    | Type   | Description                                               |
| -------- | ------ | --------------------------------------------------------- |
| `search` | string | Search by name, email, or digital ID (optional)           |
| `status` | string | Filter by `active`, `inactive`, or `cancelled` (optional) |
| `tier`   | string | Filter by tier: `Free`, `Standard`, `Premium` (optional)  |

**Response:**

```json
{
  "data": [
    {
      "id": "1",
      "name": "Sarah Johnson",
      "email": "sarah.johnson@email.com",
      "digital_id": "@sarahj",
      "tier": "Premium",
      "subscribed_at": "2024-01-15",
      "status": "active",
      "color": "bg-blue-500",
      "last_activity": "2024-02-10T14:30:00Z",
      "total_spent": 299.99,
      "next_billing": "2024-03-15",
      "monthly_value": "$29.99"
    }
  ],
  "meta": {
    "total": 3,
    "active": 3,
    "inactive": 0,
    "cancelled": 0
  }
}
```

---

### Get Subscriber Detail

**Method:** `GET`  
**Path:** `/api/business/subscribers/:id`  
**Purpose:** Get full profile and activity history for a single subscriber.

**Response:**

```json
{
  "data": {
    "id": "1",
    "name": "Sarah Johnson",
    "email": "sarah.johnson@email.com",
    "digital_id": "@sarahj",
    "tier": "Premium",
    "subscribed_at": "2024-01-15",
    "status": "active",
    "last_activity": "2024-02-10T14:30:00Z",
    "total_spent": 299.99,
    "next_billing": "2024-03-15",
    "monthly_value": "$29.99",
    "recent_activities": [
      {
        "id": "1",
        "type": "subscription",
        "action": "New Premium Subscription",
        "description": "Upgraded from Standard to Premium tier",
        "timestamp": "2024-02-10T14:30:00Z"
      }
    ]
  }
}
```

---

### Contact Subscriber

**Method:** `POST`  
**Path:** `/api/business/subscribers/:id/contact`  
**Purpose:** Send a direct email message to a subscriber.

**Request Body:**

```json
{
  "subject": "Hello Sarah Johnson",
  "message": "Thank you for your continued support! We have an exclusive offer for you."
}
```

**Response:**

```json
{
  "data": {
    "subscriber_id": "1",
    "to": "sarah.johnson@email.com",
    "subject": "Hello Sarah Johnson",
    "sent_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### Remove Subscriber

**Method:** `DELETE`  
**Path:** `/api/business/subscribers/:id`  
**Purpose:** Soft delete / cancel a subscriber's relationship with the business.

**Response:**

```json
{
  "data": {
    "id": "1",
    "status": "cancelled",
    "deleted_at": "2025-01-01T00:00:00Z"
  }
}
```

---

## 9. History

### List History Events

**Method:** `GET`  
**Path:** `/api/business/history`  
**Purpose:** Get the audit log of all significant business events, filterable by type or importance.

**Query Parameters:**

| Param        | Type   | Description                                                                                                                                                                                                                                 |
| ------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`       | string | Filter by event type: `subscriber_added`, `subscriber_removed`, `notification_sent`, `sale_completed`, `team_member_added`, `team_member_removed`, `settings_changed`, `content_updated`, `review_received`, `milestone_reached` (optional) |
| `importance` | string | Filter by `low`, `medium`, or `high` (optional)                                                                                                                                                                                             |
| `search`     | string | Search by title or description (optional)                                                                                                                                                                                                   |

**Response:**

```json
{
  "data": [
    {
      "id": "1",
      "type": "milestone_reached",
      "title": "1000 Subscribers Milestone",
      "description": "Your business has reached 1,000 subscribers!",
      "actor": null,
      "importance": "high",
      "metadata": { "milestone_type": "subscribers", "count": 1000 },
      "timestamp": "2024-02-12T10:30:00Z"
    },
    {
      "id": "2",
      "type": "notification_sent",
      "title": "Flash Sale Notification Sent",
      "description": "Promotional notification delivered to 1,247 subscribers.",
      "actor": "John Smith",
      "importance": "medium",
      "metadata": { "delivered": 1247, "notification_id": "1" },
      "timestamp": "2024-02-11T14:30:00Z"
    }
  ],
  "meta": {
    "total": 12,
    "today": 2,
    "this_week": 5,
    "this_month": 10
  }
}
```

---

### Get History Event Detail

**Method:** `GET`  
**Path:** `/api/business/history/:id`  
**Purpose:** Get full detail for a single history/audit event.

**Response:**

```json
{
  "data": {
    "id": "1",
    "type": "milestone_reached",
    "title": "1000 Subscribers Milestone",
    "description": "Your business has reached 1,000 subscribers! This is a significant achievement.",
    "actor": null,
    "importance": "high",
    "metadata": { "milestone_type": "subscribers", "count": 1000 },
    "timestamp": "2024-02-12T10:30:00Z"
  }
}
```

---

## 10. Team

### Get Team Status

**Method:** `GET`  
**Path:** `/api/business/team`  
**Purpose:** Returns the current status of the Team feature. Returns a `coming_soon` flag while under development.

**Response:**

```json
{
  "data": {
    "status": "coming_soon",
    "message": "Team management is currently under development."
  }
}
```

---

## 11. Settings

### Get Business Settings

**Method:** `GET`  
**Path:** `/api/business/settings`  
**Purpose:** Get all settings for the authenticated business: privacy, subscription plan, and API config.

**Response:**

```json
{
  "data": {
    "privacy": {
      "two_factor_enabled": false,
      "privacy_policy_file_name": "policy-2025.pdf",
      "privacy_policy_file_url": "https://cdn.whodini.com/policies/policy-2025.pdf",
      "privacy_policy_file_type": "application/pdf"
    },
    "subscription": {
      "plan_name": "Business Pro",
      "plan_type": "monthly",
      "next_billing": "2025-02-01",
      "auto_renew": true,
      "billing_history_enabled": false
    },
    "api": {
      "api_key": "wh_live_xxxxxxxxxxxx",
      "webhook_url": "https://demobusiness.com/webhook",
      "rate_limit_enabled": true,
      "api_logging": false
    }
  }
}
```

---

### Update General Settings

**Method:** `PATCH`  
**Path:** `/api/business/settings/general`  
**Purpose:** Update general business info and social links from the settings page. Mirrors `/api/business/profile` and `/api/business/profile/social`.

**Request Body:**

```json
{
  "business_name": "Demo Business",
  "description": "Updated tagline.",
  "category": "Technology",
  "phone": "+63 912 000 0000",
  "email": "contact@demobusiness.com",
  "website": "https://demobusiness.com",
  "instagram": "@demobusiness",
  "twitter": "@demobusiness"
}
```

**Response:**

```json
{
  "data": {
    "id": "WD-B-a42741f6",
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### Update Privacy Settings

**Method:** `PATCH`  
**Path:** `/api/business/settings/privacy`  
**Purpose:** Update 2FA toggle and upload a privacy policy document.

**Request Body:**

```json
{
  "two_factor_enabled": true,
  "privacy_policy_file_url": "data:application/pdf;base64,...",
  "privacy_policy_file_name": "policy-2025.pdf",
  "privacy_policy_file_type": "application/pdf"
}
```

**Response:**

```json
{
  "data": {
    "two_factor_enabled": true,
    "privacy_policy_file_name": "policy-2025.pdf",
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### Update Subscription Settings

**Method:** `PATCH`  
**Path:** `/api/business/settings/subscription`  
**Purpose:** Update the business's platform subscription plan preferences.

**Request Body:**

```json
{
  "plan_type": "annual",
  "auto_renew": false
}
```

**Response:**

```json
{
  "data": {
    "plan_name": "Business Pro",
    "plan_type": "annual",
    "auto_renew": false,
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### Update API Settings

**Method:** `PATCH`  
**Path:** `/api/business/settings/api`  
**Purpose:** Update the business's API integration settings (webhook URL, rate limiting, logging).

**Request Body:**

```json
{
  "webhook_url": "https://demobusiness.com/webhook",
  "rate_limit_enabled": true,
  "api_logging": true
}
```

**Response:**

```json
{
  "data": {
    "webhook_url": "https://demobusiness.com/webhook",
    "rate_limit_enabled": true,
    "api_logging": true,
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### Regenerate API Key

**Method:** `POST`  
**Path:** `/api/business/settings/api/regenerate-key`  
**Purpose:** Revoke the current API key and issue a new one.

**Response:**

```json
{
  "data": {
    "api_key": "wh_live_yyyyyyyyyyyy",
    "generated_at": "2025-01-01T00:00:00Z"
  }
}
```

---

## Route Summary

| Method   | Path                                        | Purpose                                            |
| -------- | ------------------------------------------- | -------------------------------------------------- |
| `GET`    | `/api/business/profile`                     | Get business profile                               |
| `PATCH`  | `/api/business/profile`                     | Update profile (info, contact, logo, social links) |
| `GET`    | `/api/business/dashboard`                   | Get dashboard snapshot metrics                     |
| `PATCH`  | `/api/business/dashboard/flagship`          | Set flagship product                               |
| `GET`    | `/api/business/overview`                    | List overview items (products & services)          |
| `PATCH`  | `/api/business/overview/:id/featured`       | Toggle featured flag                               |
| `GET`    | `/api/business/brands`                      | List brand products                                |
| `POST`   | `/api/business/brands`                      | Create brand product                               |
| `GET`    | `/api/business/brands/:id`                  | Get brand product detail                           |
| `PATCH`  | `/api/business/brands/:id`                  | Update brand product                               |
| `DELETE` | `/api/business/brands/:id`                  | Soft delete brand product                          |
| `GET`    | `/api/business/events`                      | List business events                               |
| `POST`   | `/api/business/events`                      | Create event                                       |
| `GET`    | `/api/business/events/:id`                  | Get event detail                                   |
| `PATCH`  | `/api/business/events/:id`                  | Update event                                       |
| `DELETE` | `/api/business/events/:id`                  | Soft delete event                                  |
| `PATCH`  | `/api/business/events/:id/advertise`        | Toggle event advertisement                         |
| `GET`    | `/api/business/catalog/categories`          | List catalog categories                            |
| `GET`    | `/api/business/catalog`                     | List catalog items                                 |
| `POST`   | `/api/business/catalog`                     | Create catalog item                                |
| `GET`    | `/api/business/catalog/:id`                 | Get catalog item detail                            |
| `PATCH`  | `/api/business/catalog/:id`                 | Update catalog item                                |
| `DELETE` | `/api/business/catalog/:id`                 | Soft delete catalog item                           |
| `GET`    | `/api/business/notifications`               | List notifications                                 |
| `POST`   | `/api/business/notifications`               | Send or schedule a notification                    |
| `GET`    | `/api/business/notifications/:id`           | Get notification detail                            |
| `DELETE` | `/api/business/notifications/:id`           | Soft delete notification                           |
| `GET`    | `/api/business/subscribers`                 | List subscribers                                   |
| `GET`    | `/api/business/subscribers/:id`             | Get subscriber detail                              |
| `POST`   | `/api/business/subscribers/:id/contact`     | Send direct email to subscriber                    |
| `DELETE` | `/api/business/subscribers/:id`             | Cancel / soft delete subscriber                    |
| `GET`    | `/api/business/history`                     | List business history / audit log                  |
| `GET`    | `/api/business/history/:id`                 | Get history event detail                           |
| `GET`    | `/api/business/team`                        | Get team feature status (coming soon)              |
| `GET`    | `/api/business/settings`                    | Get all business settings                          |
| `PATCH`  | `/api/business/settings/general`            | Update general settings                            |
| `PATCH`  | `/api/business/settings/privacy`            | Update privacy settings + policy upload            |
| `PATCH`  | `/api/business/settings/subscription`       | Update subscription plan preferences               |
| `PATCH`  | `/api/business/settings/api`                | Update API integration settings                    |
| `POST`   | `/api/business/settings/api/regenerate-key` | Regenerate API key                                 |
