# Whodini — Business Section DB Schema

> Derived from the mock/static data structures used across `src/app/business/**`.

---

## Table: businesses

Core business/brand profile created and managed by a business owner.

| Column        | Type     | Constraints   | Description                                      |
| ------------- | -------- | ------------- | ------------------------------------------------ |
| id            | string   | PK            | Business account identifier (e.g. WD-B-a42741f6) |
| owner_id      | uuid     | FK → users.id | User who owns this business account              |
| business_name | string   | NOT NULL      | Display name of the business                     |
| description   | text     | NULLABLE      | Business description / tagline                   |
| category      | string   | NULLABLE      | Industry category (e.g. Retail, Tech, Food)      |
| logo_url      | string   | NULLABLE      | URL or base64 data of the uploaded logo          |
| address       | string   | NULLABLE      | Street address                                   |
| city          | string   | NULLABLE      | City                                             |
| state         | string   | NULLABLE      | State / province                                 |
| zip_code      | string   | NULLABLE      | Postal / ZIP code                                |
| country       | string   | NULLABLE      | Country                                          |
| phone         | string   | NULLABLE      | Contact phone number                             |
| email         | string   | NULLABLE      | Contact email address                            |
| website       | string   | NULLABLE      | Business website URL                             |
| facebook      | string   | NULLABLE      | Facebook profile/page URL                        |
| instagram     | string   | NULLABLE      | Instagram handle or URL                          |
| twitter       | string   | NULLABLE      | Twitter/X handle or URL                          |
| tiktok        | string   | NULLABLE      | TikTok handle or URL                             |
| linkedin      | string   | NULLABLE      | LinkedIn profile URL                             |
| youtube       | string   | NULLABLE      | YouTube channel URL                              |
| created_at    | datetime | NOT NULL      | When the business profile was created            |

---

## Table: brand_products

Brand-level products associated with a business, tracked for follow/subscribe state and promotions.

| Column      | Type    | Constraints        | Description                                                        |
| ----------- | ------- | ------------------ | ------------------------------------------------------------------ |
| id          | string  | PK                 | Product identifier                                                 |
| business_id | uuid    | FK → businesses.id | Owning business                                                    |
| name        | string  | NOT NULL           | Product display name                                               |
| category    | string  | DEFAULT 'General'  | Product category (Bundle, Package, Toolkit, Digital Product, etc.) |
| followed    | boolean | DEFAULT false      | Whether the product is being followed                              |
| subscribed  | boolean | DEFAULT false      | Whether the product has active subscribers                         |
| promotions  | int     | DEFAULT 0          | Number of active promotions for this product                       |

---

## Table: business_events

Events created and managed by a business/brand.

| Column          | Type     | Constraints        | Description                                              |
| --------------- | -------- | ------------------ | -------------------------------------------------------- |
| id              | string   | PK                 | Event identifier                                         |
| business_id     | uuid     | FK → businesses.id | Hosting business                                         |
| organizer_label | string   | NOT NULL           | Display name of the organizer (brand name)               |
| title           | string   | NOT NULL           | Event title                                              |
| description     | text     | NULLABLE           | Event description                                        |
| starts_at       | datetime | NOT NULL           | ISO datetime when the event starts                       |
| location_type   | enum     | NOT NULL           | `in_person` \| `virtual` \| `hybrid`                     |
| location_label  | string   | NULLABLE           | Venue name or URL for virtual events                     |
| payment_type    | enum     | NOT NULL           | `free` \| `paid`                                         |
| price           | decimal  | DEFAULT 0          | Ticket price (0 for free events)                         |
| is_advertised   | boolean  | DEFAULT false      | Whether the event is currently being advertised/featured |

---

## Table: service_categories

Top-level groupings for services and products in the business catalog.

| Column | Type   | Constraints | Description                  |
| ------ | ------ | ----------- | ---------------------------- |
| id     | string | PK          | Category slug identifier     |
| name   | string | NOT NULL    | Display name of the category |

---

## Table: service_catalog_items

Products and services listed in the business's service/product catalog.

| Column      | Type     | Constraints                | Description                                           |
| ----------- | -------- | -------------------------- | ----------------------------------------------------- |
| id          | string   | PK                         | Catalog item identifier                               |
| business_id | uuid     | FK → businesses.id         | Owning business                                       |
| category_id | string   | FK → service_categories.id | Parent category                                       |
| type        | enum     | NOT NULL                   | `product` \| `service`                                |
| title       | string   | NOT NULL                   | Item display name                                     |
| description | text     | NULLABLE                   | Item description                                      |
| image_url   | string   | NULLABLE                   | Banner/thumbnail image URL or base64 data             |
| price       | decimal  | DEFAULT 0                  | Price of the product or service                       |
| duration    | string   | DEFAULT 'Monthly'          | Billing or delivery duration (e.g. Monthly, One-time) |
| clients     | int      | DEFAULT 0                  | Number of clients/customers using this item           |
| rating      | decimal  | DEFAULT 0                  | Average rating score                                  |
| status      | enum     | DEFAULT 'active'           | `active` \| `featured` \| `premium`                   |
| features    | string[] | NOT NULL                   | List of feature bullet points                         |

---

## Table: business_history_events

Audit log of all significant business events and actions over time.

| Column      | Type     | Constraints        | Description                                                                                                                                                                                                                  |
| ----------- | -------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id          | string   | PK                 | History event identifier                                                                                                                                                                                                     |
| business_id | uuid     | FK → businesses.id | Owning business                                                                                                                                                                                                              |
| type        | enum     | NOT NULL           | `subscriber_added` \| `subscriber_removed` \| `notification_sent` \| `sale_completed` \| `team_member_added` \| `team_member_removed` \| `settings_changed` \| `content_updated` \| `review_received` \| `milestone_reached` |
| title       | string   | NOT NULL           | Short event title                                                                                                                                                                                                            |
| description | text     | NOT NULL           | Detailed description of what happened                                                                                                                                                                                        |
| actor       | string   | NULLABLE           | Name of the user who triggered the event                                                                                                                                                                                     |
| importance  | enum     | NOT NULL           | `low` \| `medium` \| `high`                                                                                                                                                                                                  |
| metadata    | jsonb    | NULLABLE           | Arbitrary key/value data associated with the event (e.g. milestone count, sale amount)                                                                                                                                       |
| timestamp   | datetime | NOT NULL           | ISO datetime the event occurred                                                                                                                                                                                              |

---

## Table: business_notifications

Notifications composed and sent by a business to its subscribers.

| Column          | Type     | Constraints        | Description                                                                  |
| --------------- | -------- | ------------------ | ---------------------------------------------------------------------------- |
| id              | string   | PK                 | Notification identifier                                                      |
| business_id     | uuid     | FK → businesses.id | Sending business                                                             |
| title           | string   | NOT NULL           | Notification headline                                                        |
| message         | text     | NOT NULL           | Full notification body                                                       |
| type            | enum     | NOT NULL           | `promotional` \| `informational` \| `urgent` \| `event`                      |
| audience        | enum     | NOT NULL           | `all_subscribers` \| `location_based` \| `premium_only` \| `new_subscribers` |
| location_radius | string   | NULLABLE           | Radius filter for location-based audience (e.g. "10 km")                     |
| scheduled_time  | datetime | NULLABLE           | When to deliver (null = immediate)                                           |
| action_url      | string   | NULLABLE           | Deep-link or landing page URL attached to the notification                   |
| image_url       | string   | NULLABLE           | Optional image/banner URL                                                    |
| delivered       | int      | DEFAULT 0          | Number of successful deliveries                                              |
| opened          | int      | DEFAULT 0          | Number of opens                                                              |
| clicked         | int      | DEFAULT 0          | Number of click-throughs                                                     |
| status          | enum     | NOT NULL           | `sent` \| `scheduled` \| `draft` \| `failed`                                 |
| sent_at         | datetime | NULLABLE           | ISO datetime the notification was actually sent                              |

---

## Table: business_subscribers

Subscribers associated with a business, from the business's perspective.

| Column        | Type     | Constraints        | Description                                             |
| ------------- | -------- | ------------------ | ------------------------------------------------------- |
| id            | string   | PK                 | Subscriber record identifier                            |
| business_id   | uuid     | FK → businesses.id | Owning business                                         |
| name          | string   | NOT NULL           | Subscriber's display name                               |
| email         | string   | NOT NULL           | Subscriber's email address                              |
| digital_id    | string   | NOT NULL           | Subscriber's platform handle (e.g. "@sarahj")           |
| tier          | string   | DEFAULT 'Free'     | Subscription tier (Free, Standard, Premium, etc.)       |
| subscribed_at | date     | NOT NULL           | ISO date when subscription was created                  |
| status        | enum     | NOT NULL           | `active` \| `inactive` \| `cancelled`                   |
| color         | string   | NULLABLE           | Tailwind color class for avatar display                 |
| last_activity | datetime | NULLABLE           | ISO datetime of the subscriber's last recorded activity |
| total_spent   | decimal  | DEFAULT 0          | Cumulative spend by this subscriber                     |
| next_billing  | date     | NULLABLE           | Next billing date for this subscriber                   |
| monthly_value | string   | NULLABLE           | Display string for monthly revenue (e.g. "$29.99")      |

---

## Table: subscriber_activities

Recent engagement and lifecycle events for business subscribers.

| Column        | Type     | Constraints                  | Description                                                   |
| ------------- | -------- | ---------------------------- | ------------------------------------------------------------- |
| id            | string   | PK                           | Activity identifier                                           |
| subscriber_id | string   | FK → business_subscribers.id | Associated subscriber                                         |
| business_id   | uuid     | FK → businesses.id           | Associated business                                           |
| type          | enum     | NOT NULL                     | `subscription` \| `engagement` \| `cancellation` \| `payment` |
| action        | string   | NOT NULL                     | Short action label (e.g. "New Premium Subscription")          |
| description   | text     | NOT NULL                     | Detailed description of the activity                          |
| timestamp     | datetime | NOT NULL                     | ISO datetime of the activity                                  |

---

## Table: subscriber_engagement_metrics

Aggregate engagement health metrics for a business's subscriber base.

| Column      | Type   | Constraints        | Description                                       |
| ----------- | ------ | ------------------ | ------------------------------------------------- |
| id          | string | PK                 | Metric record identifier                          |
| business_id | uuid   | FK → businesses.id | Owning business                                   |
| metric      | string | NOT NULL           | Metric name (e.g. "Churn Risk", "Payment Issues") |
| count       | int    | DEFAULT 0          | Current count for the metric                      |
| description | string | NOT NULL           | Human-readable explanation                        |
| trend       | enum   | NOT NULL           | `up` \| `down` \| `stable`                        |
| color       | string | NULLABLE           | Tailwind color class for visual indicator         |

---

## Table: business_settings

Business-level settings covering general info, privacy, subscription plan, and API configuration.

| Column                   | Type    | Constraints                | Description                                            |
| ------------------------ | ------- | -------------------------- | ------------------------------------------------------ |
| id                       | uuid    | PK                         | Settings record identifier                             |
| business_id              | uuid    | FK → businesses.id, UNIQUE | One settings record per business                       |
| two_factor_enabled       | boolean | DEFAULT false              | Whether 2FA is enabled for this business account       |
| privacy_policy_file_name | string  | NULLABLE                   | Original file name of the uploaded privacy policy      |
| privacy_policy_file_url  | string  | NULLABLE                   | URL or base64 data of the uploaded privacy policy file |
| privacy_policy_file_type | string  | NULLABLE                   | MIME type of the privacy policy file                   |
| plan_name                | string  | NULLABLE                   | Active subscription plan name (e.g. "Business Pro")    |
| plan_type                | enum    | NULLABLE                   | `monthly` \| `annual`                                  |
| next_billing             | date    | NULLABLE                   | Next billing date for the platform plan                |
| auto_renew               | boolean | DEFAULT true               | Whether the platform subscription auto-renews          |
| billing_history_enabled  | boolean | DEFAULT false              | Whether billing history is accessible                  |
| api_key                  | string  | NULLABLE                   | API key for third-party integrations                   |
| webhook_url              | string  | NULLABLE                   | Webhook endpoint URL                                   |
| rate_limit_enabled       | boolean | DEFAULT false              | Whether API rate limiting is active                    |
| api_logging              | boolean | DEFAULT false              | Whether API request logging is enabled                 |

---

## Table: business_overview_items

Products and services shown on the public-facing business overview page, with featured and filtering support.

| Column      | Type    | Constraints        | Description                                            |
| ----------- | ------- | ------------------ | ------------------------------------------------------ |
| id          | string  | PK                 | Item identifier                                        |
| business_id | uuid    | FK → businesses.id | Owning business                                        |
| name        | string  | NOT NULL           | Item display name                                      |
| description | text    | NOT NULL           | Item description                                       |
| price       | decimal | DEFAULT 0          | Item price                                             |
| category    | string  | NOT NULL           | Category label (Web Design, Marketing, Branding, etc.) |
| type        | enum    | NOT NULL           | `product` \| `service`                                 |
| featured    | boolean | DEFAULT false      | Whether this item is featured/highlighted on overview  |
