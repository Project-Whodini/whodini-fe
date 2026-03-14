# Personal API Routes

All routes require a valid session/auth token in the `Authorization` header.  
All delete operations are **soft deletes** using a `deleted_at` timestamp.  
Base path: `/api/personal`

---

## Table of Contents

1. [Profile](#1-profile)
2. [Dashboard](#2-dashboard)
3. [Activity](#3-activity)
4. [Community](#4-community)
5. [Events](#5-events)
6. [Notifications](#6-notifications)
7. [Membership](#7-membership)
8. [Subscriptions](#8-subscriptions)
9. [Rewards](#9-rewards)
10. [Games](#10-games)

---

## 1. Profile

### Get Profile

**Method:** `GET`  
**Path:** `/api/personal/profile`  
**Purpose:** Retrieve the authenticated user's full profile.

**Response:**

```json
{
  "data": {
    "id": "uuid",
    "display_name": "Weng Santos",
    "username": "@wengsantos",
    "bio": "Digital enthusiast...",
    "whodini_id": "WD-P-x8m9n2k5",
    "avatar_initials": "WS",
    "member_since": "2025-01-01",
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### Update Profile (Basic Info)

**Method:** `PATCH`  
**Path:** `/api/personal/profile`  
**Purpose:** Update display name, username, and bio.

**Request Body:**

```json
{
  "display_name": "Weng Santos",
  "username": "@wengsantos",
  "bio": "Updated bio text"
}
```

**Response:**

```json
{
  "data": {
    "id": "uuid",
    "display_name": "Weng Santos",
    "username": "@wengsantos",
    "bio": "Updated bio text",
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### Update Contact Info

**Method:** `PATCH`  
**Path:** `/api/personal/profile/contact`  
**Purpose:** Update the user's contact details.

**Request Body:**

```json
{
  "email": "weng@example.com",
  "phone": "+63 912 345 6789",
  "location": "Manila, Philippines",
  "birthdate": "1995-07-22"
}
```

**Response:**

```json
{
  "data": {
    "id": "uuid",
    "email": "weng@example.com",
    "phone": "+63 912 345 6789",
    "location": "Manila, Philippines",
    "birthdate": "1995-07-22",
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### Update Social Links

**Method:** `PATCH`  
**Path:** `/api/personal/profile/social`  
**Purpose:** Update the user's social media handles and website.

**Request Body:**

```json
{
  "website": "https://wengsantos.com",
  "instagram": "@wengsantos",
  "twitter": "@wengsantos",
  "facebook": "wengsantos"
}
```

**Response:**

```json
{
  "data": {
    "id": "uuid",
    "website": "https://wengsantos.com",
    "instagram": "@wengsantos",
    "twitter": "@wengsantos",
    "facebook": "wengsantos",
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### List Interests

**Method:** `GET`  
**Path:** `/api/personal/profile/interests`  
**Purpose:** Get all interests for the authenticated user.

**Response:**

```json
{
  "data": [
    { "id": "uuid", "label": "Technology", "sort_order": 1 },
    { "id": "uuid", "label": "Fashion", "sort_order": 2 }
  ]
}
```

---

### Add Interest

**Method:** `POST`  
**Path:** `/api/personal/profile/interests`  
**Purpose:** Add a new interest tag to the user's profile.

**Request Body:**

```json
{
  "label": "Photography"
}
```

**Response:**

```json
{
  "data": {
    "id": "uuid",
    "label": "Photography",
    "sort_order": 6,
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### Delete Interest

**Method:** `DELETE`  
**Path:** `/api/personal/profile/interests/:id`  
**Purpose:** Soft delete an interest tag from the user's profile.

**Response:**

```json
{
  "data": {
    "id": "uuid",
    "deleted_at": "2025-01-01T00:00:00Z"
  }
}
```

---

## 2. Dashboard

### Get Dashboard Snapshot

**Method:** `GET`  
**Path:** `/api/personal/dashboard`  
**Purpose:** Retrieve the cross-account snapshot counts and the latest activity peeks shown on the personal homepage.

**Response:**

```json
{
  "data": {
    "snapshot": {
      "businesses_followed": 12,
      "communities_joined": 5,
      "upcoming_events": 3,
      "active_agencies": 1
    },
    "peeks": {
      "last_followed_business": "TechCorp",
      "last_joined_community": "Tech Innovators",
      "next_event_name": "Product Launch Night",
      "active_agency": "Creative Agency PH"
    }
  }
}
```

---

## 3. Activity

### List Activities

**Method:** `GET`  
**Path:** `/api/personal/activity`  
**Purpose:** Retrieve the activity feed grouped by period (today, thisWeek, thisMonth) along with summary stats.

**Query Parameters:**

| Param    | Type   | Description                                                                                                             |
| -------- | ------ | ----------------------------------------------------------------------------------------------------------------------- |
| `period` | string | Filter by `today`, `thisWeek`, or `thisMonth` (optional)                                                                |
| `type`   | string | Filter by activity type: `follow`, `involved`, `event`, `subscription`, `community`, `reward`, `achievement` (optional) |

**Response:**

```json
{
  "data": {
    "stats": {
      "subscriptions": 4,
      "follows": 7,
      "involved_actions": 3
    },
    "activities": [
      {
        "id": "uuid",
        "type": "follow",
        "category": "business",
        "title": "Followed TechCorp",
        "description": "You started following TechCorp.",
        "icon": "🏢",
        "period": "today",
        "timestamp": "2025-01-01T10:00:00Z"
      }
    ]
  }
}
```

---

### Delete Activity

**Method:** `DELETE`  
**Path:** `/api/personal/activity/:id`  
**Purpose:** Soft delete a single activity record from the user's feed.

**Response:**

```json
{
  "data": {
    "id": "uuid",
    "deleted_at": "2025-01-01T00:00:00Z"
  }
}
```

---

## 4. Community

### Get Community Message Feed

**Method:** `GET`  
**Path:** `/api/personal/community/feed`  
**Purpose:** Get the message feed from communities the user follows or is a member of.

**Query Parameters:**

| Param   | Type   | Description                  |
| ------- | ------ | ---------------------------- |
| `page`  | number | Pagination page (default: 1) |
| `limit` | number | Items per page (default: 20) |

**Response:**

```json
{
  "data": [
    {
      "id": "uuid",
      "community": "Tech Innovators",
      "author": "Jane Doe",
      "message": "Anyone attending the April meetup?",
      "likes": 14,
      "timestamp": "2025-01-01T10:00:00Z"
    }
  ],
  "meta": { "page": 1, "total": 50 }
}
```

---

### Discover Communities

**Method:** `GET`  
**Path:** `/api/personal/community/discover`  
**Purpose:** Get a list of all discoverable communities with follow/membership status for the authenticated user.

**Query Parameters:**

| Param      | Type   | Description                      |
| ---------- | ------ | -------------------------------- |
| `category` | string | Filter by category (optional)    |
| `search`   | string | Search by name or tag (optional) |

**Response:**

```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Tech Innovators",
      "description": "Industry professionals sharing insights.",
      "members": 2450,
      "category": "Professional",
      "image": "🚀",
      "is_new": false,
      "tags": ["tech", "networking"],
      "location": "Downtown Hub",
      "followed": true,
      "is_member": false
    }
  ]
}
```

---

### Get Community Detail

**Method:** `GET`  
**Path:** `/api/personal/community/:id`  
**Purpose:** Get detailed info for a specific community including recent activities.

**Response:**

```json
{
  "data": {
    "id": "uuid",
    "name": "Tech Innovators",
    "description": "Industry professionals sharing insights.",
    "members": 2450,
    "category": "Professional",
    "image": "🚀",
    "tags": ["tech", "networking"],
    "location": "Downtown Hub",
    "followed": true,
    "is_member": false,
    "recent_activities": [
      {
        "id": "uuid",
        "title": "Monthly meetup announced",
        "timestamp": "2 days ago"
      }
    ]
  }
}
```

---

### Follow Community

**Method:** `POST`  
**Path:** `/api/personal/community/:id/follow`  
**Purpose:** Follow a community to receive its feed and notifications.

**Response:**

```json
{
  "data": {
    "community_id": "uuid",
    "followed": true,
    "followed_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### Unfollow Community

**Method:** `DELETE`  
**Path:** `/api/personal/community/:id/follow`  
**Purpose:** Soft delete the follow relationship with a community.

**Response:**

```json
{
  "data": {
    "community_id": "uuid",
    "followed": false,
    "deleted_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### Join Community

**Method:** `POST`  
**Path:** `/api/personal/community/:id/membership`  
**Purpose:** Become a member of a community.

**Response:**

```json
{
  "data": {
    "community_id": "uuid",
    "is_member": true,
    "joined_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### Leave Community

**Method:** `DELETE`  
**Path:** `/api/personal/community/:id/membership`  
**Purpose:** Soft delete the community membership record.

**Response:**

```json
{
  "data": {
    "community_id": "uuid",
    "is_member": false,
    "deleted_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### Community Forum

Routes for reading and posting messages in a community's chat-room style forum thread.

---

#### List Forum Messages

**Method:** `GET`  
**Path:** `/api/personal/community/:id/forum`  
**Purpose:** Fetch paginated messages for a community's forum. Context seed messages are included when the page is first loaded.

**Query Parameters:**

| Param   | Type   | Description                  |
| ------- | ------ | ---------------------------- |
| `page`  | number | Pagination page (default: 1) |
| `limit` | number | Items per page (default: 30) |

**Response:**

```json
{
  "data": [
    {
      "id": 1,
      "author": "Sarah Chen",
      "text": "Excited to share our latest AI breakthrough with the team!",
      "timestamp": "2 hours ago",
      "likes": 24,
      "is_own": false
    }
  ],
  "meta": { "page": 1, "total": 12 }
}
```

---

#### Post Forum Message

**Method:** `POST`  
**Path:** `/api/personal/community/:id/forum`  
**Purpose:** Post a new message into a community's forum thread.

**Request Body:**

```json
{
  "text": "Great discussion everyone!"
}
```

**Response:**

```json
{
  "data": {
    "id": 7,
    "author": "Weng Santos",
    "text": "Great discussion everyone!",
    "timestamp": "just now",
    "likes": 0,
    "is_own": true
  }
}
```

---

#### Leave Forum

**Method:** `DELETE`  
**Path:** `/api/personal/community/:id/forum/leave`  
**Purpose:** Remove the authenticated user from the community forum. Soft deletes their forum membership record.

**Response:**

```json
{
  "data": {
    "community_id": "uuid",
    "left_at": "2025-01-01T00:00:00Z"
  }
}
```

---

#### Like Forum Message

**Method:** `POST`  
**Path:** `/api/personal/community/:id/forum/:messageId/like`  
**Purpose:** Record a like from the authenticated user on a forum message.

**Response:**

```json
{
  "data": {
    "message_id": 1,
    "likes": 25,
    "liked_at": "2025-01-01T00:00:00Z"
  }
}
```

---

#### Unlike Forum Message

**Method:** `DELETE`  
**Path:** `/api/personal/community/:id/forum/:messageId/like`  
**Purpose:** Soft delete the like record (unlike a forum message).

**Response:**

```json
{
  "data": {
    "message_id": 1,
    "likes": 24,
    "deleted_at": "2025-01-01T00:00:00Z"
  }
}
```

---

## 5. Events

### List My Events

**Method:** `GET`  
**Path:** `/api/personal/events`  
**Purpose:** Get events the user is following, interested in, or has set a date notification for.

**Response:**

```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Product Launch Night",
      "description": "New platform features showcase.",
      "date": "2026-04-12",
      "time": "7:00 PM - 10:00 PM",
      "location": "Whodini Hall, Makati",
      "attendees": 380,
      "business": "Whodini",
      "image": "🎉",
      "followed": true,
      "interested": true,
      "notify_on_date": true
    }
  ]
}
```

---

### Explore All Events

**Method:** `GET`  
**Path:** `/api/personal/events/explore`  
**Purpose:** Retrieve all discoverable events platform-wide with the user's current engagement status.

**Query Parameters:**

| Param         | Type   | Description                                       |
| ------------- | ------ | ------------------------------------------------- |
| `search`      | string | Search by title, business, or location (optional) |
| `business_id` | string | Filter by business (optional)                     |

**Response:**

```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Product Launch Night",
      "date": "2026-04-12",
      "time": "7:00 PM - 10:00 PM",
      "location": "Whodini Hall, Makati",
      "attendees": 380,
      "business": "Whodini",
      "image": "🎉",
      "followed": true,
      "interested": true,
      "notify_on_date": true
    }
  ]
}
```

---

### Get Event Detail

**Method:** `GET`  
**Path:** `/api/personal/events/:id`  
**Purpose:** Get detailed information for a specific event.

**Response:**

```json
{
  "data": {
    "id": "uuid",
    "title": "Product Launch Night",
    "description": "New platform features showcase.",
    "date": "2026-04-12",
    "time": "7:00 PM - 10:00 PM",
    "location": "Whodini Hall, Makati",
    "attendees": 380,
    "business": "Whodini",
    "business_id": "uuid",
    "image": "🎉",
    "followed": true,
    "interested": true,
    "notify_on_date": true
  }
}
```

---

### Follow Event

**Method:** `POST`  
**Path:** `/api/personal/events/:id/follow`  
**Purpose:** Follow an event to track it and enable date notifications.

**Response:**

```json
{
  "data": {
    "event_id": "uuid",
    "followed": true,
    "followed_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### Unfollow Event

**Method:** `DELETE`  
**Path:** `/api/personal/events/:id/follow`  
**Purpose:** Soft delete the follow relationship with an event. Also disables notify_on_date.

**Response:**

```json
{
  "data": {
    "event_id": "uuid",
    "followed": false,
    "deleted_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### Toggle Interested in Event

**Method:** `PATCH`  
**Path:** `/api/personal/events/:id/interested`  
**Purpose:** Toggle whether the user has marked interest in an event.

**Request Body:**

```json
{
  "interested": true
}
```

**Response:**

```json
{
  "data": {
    "event_id": "uuid",
    "interested": true,
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### Toggle Event Date Notification

**Method:** `PATCH`  
**Path:** `/api/personal/events/:id/notify`  
**Purpose:** Enable or disable the event-date push notification. Only available when the event is followed.

**Request Body:**

```json
{
  "notify_on_date": true
}
```

**Response:**

```json
{
  "data": {
    "event_id": "uuid",
    "notify_on_date": true,
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

---

## 6. Notifications

### List Notifications

**Method:** `GET`  
**Path:** `/api/personal/notifications`  
**Purpose:** Get the user's notifications split into pending and expired groups, optionally filtered by relationship type.

**Query Parameters:**

| Param          | Type   | Description                                                         |
| -------------- | ------ | ------------------------------------------------------------------- |
| `status`       | string | Filter by `pending` or `expired` (optional, returns all if omitted) |
| `relationship` | string | Filter by `followed` or `subscribed` (optional)                     |

**Response:**

```json
{
  "data": {
    "pending": [
      {
        "id": "uuid",
        "brand": "TechCorp",
        "source_type": "business",
        "relationship": "followed",
        "title": "New Product Drop!",
        "message": "Check out our latest release.",
        "type": "promotion",
        "icon": "🎁",
        "timestamp": "2 hours ago",
        "expires_at": "3 days",
        "status": "pending"
      }
    ],
    "expired": [
      {
        "id": "uuid",
        "brand": "Fashion Co.",
        "source_type": "event",
        "relationship": "subscribed",
        "title": "Flash Sale Ended",
        "message": "The sale has concluded.",
        "type": "announcement",
        "icon": "📢",
        "expired_at": "1 day ago",
        "status": "expired"
      }
    ]
  }
}
```

---

### Get Notification Detail

**Method:** `GET`  
**Path:** `/api/personal/notifications/:id`  
**Purpose:** Get the full detail of a single notification, marking it as read in the process.

**Response:**

```json
{
  "data": {
    "id": "uuid",
    "brand": "TechCorp",
    "source_type": "business",
    "relationship": "followed",
    "title": "New Product Drop!",
    "message": "Check out our latest release.",
    "type": "promotion",
    "icon": "🎁",
    "timestamp": "2025-01-01T10:00:00Z",
    "expires_at": "2025-01-04T00:00:00Z",
    "status": "pending",
    "read_at": "2025-01-01T11:00:00Z"
  }
}
```

---

### Mark Notification as Read

**Method:** `PATCH`  
**Path:** `/api/personal/notifications/:id/read`  
**Purpose:** Mark a specific notification as read.

**Response:**

```json
{
  "data": {
    "id": "uuid",
    "read_at": "2025-01-01T11:00:00Z"
  }
}
```

---

### Delete Notification

**Method:** `DELETE`  
**Path:** `/api/personal/notifications/:id`  
**Purpose:** Soft delete a notification from the user's inbox.

**Response:**

```json
{
  "data": {
    "id": "uuid",
    "deleted_at": "2025-01-01T00:00:00Z"
  }
}
```

---

## 7. Membership

### Discover Communities

**Method:** `GET`  
**Path:** `/api/personal/membership/communities`  
**Purpose:** List all communities available to join, with the user's current membership status.

**Response:**

```json
{
  "data": [
    {
      "id": "community_1",
      "name": "Tech Innovators",
      "category": "Professional",
      "description": "Industry professionals sharing insights.",
      "members": 2450,
      "location": "Downtown Hub",
      "joined": true
    }
  ]
}
```

---

### Get My Communities

**Method:** `GET`  
**Path:** `/api/personal/membership/communities/mine`  
**Purpose:** List only the communities that the user has joined.

**Response:**

```json
{
  "data": [
    {
      "id": "community_1",
      "name": "Tech Innovators",
      "category": "Professional",
      "members": 2450,
      "location": "Downtown Hub",
      "joined": true,
      "joined_at": "2025-01-01T00:00:00Z"
    }
  ]
}
```

---

### Get Community Detail (Membership)

**Method:** `GET`  
**Path:** `/api/personal/membership/communities/:id`  
**Purpose:** Get detail view of a community from the membership perspective.

**Response:**

```json
{
  "data": {
    "id": "community_1",
    "name": "Tech Innovators",
    "category": "Professional",
    "description": "Industry professionals sharing insights.",
    "members": 2450,
    "location": "Downtown Hub",
    "joined": true,
    "joined_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### Join Community (Membership)

**Method:** `POST`  
**Path:** `/api/personal/membership/communities/:id/join`  
**Purpose:** Become a member of a community.

**Response:**

```json
{
  "data": {
    "community_id": "community_1",
    "joined": true,
    "joined_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### Leave Community (Membership)

**Method:** `DELETE`  
**Path:** `/api/personal/membership/communities/:id/join`  
**Purpose:** Soft delete the community membership (leave community).

**Response:**

```json
{
  "data": {
    "community_id": "community_1",
    "joined": false,
    "deleted_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### Browse Upcoming Events (Membership)

**Method:** `GET`  
**Path:** `/api/personal/membership/events`  
**Purpose:** List upcoming events available to register for, sorted chronologically.

**Query Parameters:**

| Param  | Type   | Description                                                         |
| ------ | ------ | ------------------------------------------------------------------- |
| `type` | string | Filter by event type: `Seminar`, `Workshop`, `Gathering` (optional) |

**Response:**

```json
{
  "data": [
    {
      "id": "event_1",
      "title": "Product Strategy Seminar",
      "type": "Seminar",
      "description": "A practical session on product planning.",
      "date": "2026-03-10",
      "venue": "Innovation Center",
      "registered": true,
      "attended": false
    }
  ]
}
```

---

### Get My Events (Membership)

**Method:** `GET`  
**Path:** `/api/personal/membership/events/mine`  
**Purpose:** List events the user has registered for or previously attended.

**Response:**

```json
{
  "data": [
    {
      "id": "event_1",
      "title": "Product Strategy Seminar",
      "type": "Seminar",
      "date": "2026-03-10",
      "venue": "Innovation Center",
      "registered": true,
      "attended": false
    },
    {
      "id": "event_4",
      "title": "Annual Members Meetup",
      "type": "Gathering",
      "date": "2025-11-20",
      "venue": "Convention Center",
      "registered": false,
      "attended": true
    }
  ]
}
```

---

### Get Event Detail (Membership)

**Method:** `GET`  
**Path:** `/api/personal/membership/events/:id`  
**Purpose:** Get detail view of a membership event.

**Response:**

```json
{
  "data": {
    "id": "event_1",
    "title": "Product Strategy Seminar",
    "type": "Seminar",
    "description": "A practical session on product planning.",
    "date": "2026-03-10",
    "venue": "Innovation Center",
    "registered": true,
    "attended": false,
    "registered_at": "2025-12-01T00:00:00Z"
  }
}
```

---

### Register for Event

**Method:** `POST`  
**Path:** `/api/personal/membership/events/:id/register`  
**Purpose:** Register the user for an upcoming event.

**Response:**

```json
{
  "data": {
    "event_id": "event_1",
    "registered": true,
    "registered_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### Unregister from Event

**Method:** `DELETE`  
**Path:** `/api/personal/membership/events/:id/register`  
**Purpose:** Soft delete the event registration record.

**Response:**

```json
{
  "data": {
    "event_id": "event_1",
    "registered": false,
    "deleted_at": "2025-01-01T00:00:00Z"
  }
}
```

---

## 8. Subscriptions

### List Subscriptions

**Method:** `GET`  
**Path:** `/api/personal/subscriptions`  
**Purpose:** Get all active business subscriptions for the authenticated user.

**Query Parameters:**

| Param    | Type   | Description                                 |
| -------- | ------ | ------------------------------------------- |
| `search` | string | Filter by brand name or industry (optional) |

**Response:**

```json
{
  "data": [
    {
      "id": "1",
      "brand": "TechStartup Inc.",
      "digital_id": "@techstartup",
      "industry": "Technology",
      "tier": "Free",
      "subscribed_at": "2024-01-15",
      "status": "active",
      "notifications_enabled": true,
      "benefits": ["Early access to products", "Exclusive webinars"],
      "monthly_price": 0
    }
  ],
  "meta": {
    "active_count": 4,
    "notifications_enabled_count": 3
  }
}
```

---

### Get Subscription Detail

**Method:** `GET`  
**Path:** `/api/personal/subscriptions/:id`  
**Purpose:** Get detail of a single business subscription.

**Response:**

```json
{
  "data": {
    "id": "1",
    "brand": "TechStartup Inc.",
    "digital_id": "@techstartup",
    "industry": "Technology",
    "tier": "Free",
    "subscribed_at": "2024-01-15",
    "status": "active",
    "notifications_enabled": true,
    "benefits": ["Early access to products", "Exclusive webinars"],
    "monthly_price": 0,
    "recent_activities": [
      {
        "id": "1",
        "type": "content",
        "title": "New Product Launch: AI Assistant 2.0",
        "description": "Exclusive preview of our latest features.",
        "timestamp": "2024-02-10T14:30:00Z"
      }
    ]
  }
}
```

---

### Subscribe to a Business

**Method:** `POST`  
**Path:** `/api/personal/subscriptions`  
**Purpose:** Subscribe the authenticated user to a business.

**Request Body:**

```json
{
  "business_id": "uuid"
}
```

**Response:**

```json
{
  "data": {
    "id": "uuid",
    "business_id": "uuid",
    "brand": "TechStartup Inc.",
    "tier": "Free",
    "status": "active",
    "subscribed_at": "2025-01-01T00:00:00Z",
    "notifications_enabled": true
  }
}
```

---

### Unsubscribe from a Business

**Method:** `DELETE`  
**Path:** `/api/personal/subscriptions/:id`  
**Purpose:** Soft delete the subscription record.

**Response:**

```json
{
  "data": {
    "id": "1",
    "status": "deleted",
    "deleted_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### Toggle Subscription Notifications

**Method:** `PATCH`  
**Path:** `/api/personal/subscriptions/:id/notifications`  
**Purpose:** Enable or disable push/email notifications for a specific business subscription.

**Request Body:**

```json
{
  "notifications_enabled": false
}
```

**Response:**

```json
{
  "data": {
    "id": "1",
    "notifications_enabled": false,
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

---

## 9. Rewards

### List Reward Categories

**Method:** `GET`  
**Path:** `/api/personal/rewards/categories`  
**Purpose:** Get all reward categories (discounts, freebies, experiences, exclusive).

**Response:**

```json
{
  "data": [
    { "id": "discounts", "name": "Discounts" },
    { "id": "freebies", "name": "Free Items" },
    { "id": "experiences", "name": "Experiences" },
    { "id": "exclusive", "name": "Exclusive Access" }
  ]
}
```

---

### List Rewards by Category

**Method:** `GET`  
**Path:** `/api/personal/rewards`  
**Purpose:** Get available rewards, optionally filtered by category.

**Query Parameters:**

| Param      | Type   | Description                                                                           |
| ---------- | ------ | ------------------------------------------------------------------------------------- |
| `category` | string | Filter by category ID: `discounts`, `freebies`, `experiences`, `exclusive` (optional) |

**Response:**

```json
{
  "data": [
    {
      "id": "uuid",
      "category_id": "discounts",
      "name": "10% Off Any Purchase",
      "voucher_code": "VDISC-10OFF-92K",
      "description": "Valid for 30 days",
      "expires_in_days": 30,
      "popular": true
    }
  ]
}
```

---

### Get Reward Detail

**Method:** `GET`  
**Path:** `/api/personal/rewards/:id`  
**Purpose:** Get detailed information about a specific reward.

**Response:**

```json
{
  "data": {
    "id": "uuid",
    "category_id": "discounts",
    "name": "10% Off Any Purchase",
    "voucher_code": "VDISC-10OFF-92K",
    "description": "Valid for 30 days",
    "expires_in_days": 30,
    "popular": true
  }
}
```

---

### Redeem Reward

**Method:** `POST`  
**Path:** `/api/personal/rewards/:id/redeem`  
**Purpose:** Claim a reward voucher. Creates a redemption history record for the user.

**Response:**

```json
{
  "data": {
    "redemption_id": "uuid",
    "reward_id": "uuid",
    "voucher_code": "VDISC-10OFF-92K",
    "brand": "TechCorp",
    "status": "active",
    "redeemed_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### List Redemption History

**Method:** `GET`  
**Path:** `/api/personal/rewards/history`  
**Purpose:** Get the user's reward redemption history.

**Query Parameters:**

| Param    | Type   | Description                             |
| -------- | ------ | --------------------------------------- |
| `status` | string | Filter by `active` or `used` (optional) |

**Response:**

```json
{
  "data": [
    {
      "id": "uuid",
      "reward_name": "10% Off Any Purchase",
      "brand": "TechCorp",
      "voucher_code": "VDISC-10OFF-92K",
      "redeemed_at": "2 days ago",
      "status": "used"
    }
  ]
}
```

---

### Update Redemption Record

**Method:** `PATCH`  
**Path:** `/api/personal/rewards/history/:id`  
**Purpose:** Update a redemption record, e.g., mark a voucher as used.

**Request Body:**

```json
{
  "status": "used"
}
```

**Response:**

```json
{
  "data": {
    "id": "uuid",
    "status": "used",
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### Delete Redemption Record

**Method:** `DELETE`  
**Path:** `/api/personal/rewards/history/:id`  
**Purpose:** Soft delete a redemption history record.

**Response:**

```json
{
  "data": {
    "id": "uuid",
    "deleted_at": "2025-01-01T00:00:00Z"
  }
}
```

---

## 10. Games

### Get Games Status

**Method:** `GET`  
**Path:** `/api/personal/games`  
**Purpose:** Returns the current status of the Games & Challenges feature. Returns a `coming_soon` flag while under development.

**Response:**

```json
{
  "data": {
    "status": "coming_soon",
    "message": "Games & Challenges is currently under development."
  }
}
```

---

## Route Summary

| Method   | Path                                                | Purpose                                         |
| -------- | --------------------------------------------------- | ----------------------------------------------- |
| `GET`    | `/api/personal/profile`                             | Get user profile                                |
| `PATCH`  | `/api/personal/profile`                             | Update basic info (display_name, username, bio) |
| `PATCH`  | `/api/personal/profile/contact`                     | Update contact info                             |
| `PATCH`  | `/api/personal/profile/social`                      | Update social links                             |
| `GET`    | `/api/personal/profile/interests`                   | List interests                                  |
| `POST`   | `/api/personal/profile/interests`                   | Add an interest                                 |
| `DELETE` | `/api/personal/profile/interests/:id`               | Soft delete an interest                         |
| `GET`    | `/api/personal/dashboard`                           | Get snapshot counts and peeks                   |
| `GET`    | `/api/personal/activity`                            | List activity feed + stats                      |
| `DELETE` | `/api/personal/activity/:id`                        | Soft delete an activity                         |
| `GET`    | `/api/personal/community/feed`                      | Get community message feed                      |
| `GET`    | `/api/personal/community/discover`                  | Discover communities                            |
| `GET`    | `/api/personal/community/:id`                       | Get community detail                            |
| `POST`   | `/api/personal/community/:id/follow`                | Follow a community                              |
| `DELETE` | `/api/personal/community/:id/follow`                | Unfollow a community                            |
| `POST`   | `/api/personal/community/:id/membership`            | Join a community                                |
| `DELETE` | `/api/personal/community/:id/membership`            | Leave a community                               |
| `GET`    | `/api/personal/community/:id/forum`                 | List forum messages                             |
| `POST`   | `/api/personal/community/:id/forum`                 | Post a forum message                            |
| `DELETE` | `/api/personal/community/:id/forum/leave`           | Leave the community forum                       |
| `POST`   | `/api/personal/community/:id/forum/:messageId/like` | Like a forum message                            |
| `DELETE` | `/api/personal/community/:id/forum/:messageId/like` | Unlike a forum message                          |
| `GET`    | `/api/personal/events`                              | List my events                                  |
| `GET`    | `/api/personal/events/explore`                      | Explore all events                              |
| `GET`    | `/api/personal/events/:id`                          | Get event detail                                |
| `POST`   | `/api/personal/events/:id/follow`                   | Follow an event                                 |
| `DELETE` | `/api/personal/events/:id/follow`                   | Unfollow an event                               |
| `PATCH`  | `/api/personal/events/:id/interested`               | Toggle interested                               |
| `PATCH`  | `/api/personal/events/:id/notify`                   | Toggle event date notification                  |
| `GET`    | `/api/personal/notifications`                       | List notifications                              |
| `GET`    | `/api/personal/notifications/:id`                   | Get notification detail                         |
| `PATCH`  | `/api/personal/notifications/:id/read`              | Mark notification as read                       |
| `DELETE` | `/api/personal/notifications/:id`                   | Soft delete notification                        |
| `GET`    | `/api/personal/membership/communities`              | Discover communities (membership)               |
| `GET`    | `/api/personal/membership/communities/mine`         | My joined communities                           |
| `GET`    | `/api/personal/membership/communities/:id`          | Community detail (membership)                   |
| `POST`   | `/api/personal/membership/communities/:id/join`     | Join a community                                |
| `DELETE` | `/api/personal/membership/communities/:id/join`     | Leave a community                               |
| `GET`    | `/api/personal/membership/events`                   | Browse upcoming events                          |
| `GET`    | `/api/personal/membership/events/mine`              | My registered/attended events                   |
| `GET`    | `/api/personal/membership/events/:id`               | Event detail (membership)                       |
| `POST`   | `/api/personal/membership/events/:id/register`      | Register for an event                           |
| `DELETE` | `/api/personal/membership/events/:id/register`      | Unregister from an event                        |
| `GET`    | `/api/personal/subscriptions`                       | List subscriptions                              |
| `GET`    | `/api/personal/subscriptions/:id`                   | Get subscription detail                         |
| `POST`   | `/api/personal/subscriptions`                       | Subscribe to a business                         |
| `DELETE` | `/api/personal/subscriptions/:id`                   | Unsubscribe (soft delete)                       |
| `PATCH`  | `/api/personal/subscriptions/:id/notifications`     | Toggle subscription notifications               |
| `GET`    | `/api/personal/rewards/categories`                  | List reward categories                          |
| `GET`    | `/api/personal/rewards`                             | List rewards (filterable by category)           |
| `GET`    | `/api/personal/rewards/:id`                         | Get reward detail                               |
| `POST`   | `/api/personal/rewards/:id/redeem`                  | Redeem a reward                                 |
| `GET`    | `/api/personal/rewards/history`                     | List redemption history                         |
| `PATCH`  | `/api/personal/rewards/history/:id`                 | Update redemption record                        |
| `DELETE` | `/api/personal/rewards/history/:id`                 | Soft delete redemption record                   |
| `GET`    | `/api/personal/games`                               | Get games feature status                        |
