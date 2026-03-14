# Whodini — DB Schema Index

This file is an overview index. Each section has been split into its own file under `docs/`.

| Section             | File                                                                 |
| ------------------- | -------------------------------------------------------------------- |
| Registration & Auth | [docs/data-structure-auth.md](docs/data-structure-auth.md)           |
| Personal            | [docs/data-structure-personal.md](docs/data-structure-personal.md)   |
| Business            | [docs/data-structure-business.md](docs/data-structure-business.md)   |
| Community           | [docs/data-structure-community.md](docs/data-structure-community.md) |
| Organizer           | [docs/data-structure-organizer.md](docs/data-structure-organizer.md) |
| Agency              | [docs/data-structure-agency.md](docs/data-structure-agency.md)       |

---

# Whodini — Personal Section DB Schema

> Derived from the mock/static data structures used across `src/app/personal/**`.

---

## Table: users

Represents the logged-in personal account displayed on the dashboard.

| Column                 | Type   | Constraints | Description                                      |
| ---------------------- | ------ | ----------- | ------------------------------------------------ |
| id                     | string | PK          | Personal account identifier (e.g. WD-P-x8m9n2k5) |
| display_name           | string | NOT NULL    | Name shown on the welcome header                 |
| last_followed_business | string | NULLABLE    | Name of the most recently followed business      |
| last_joined_community  | string | NULLABLE    | Name of the most recently joined community       |

---

## Table: cross_account_snapshot

Aggregated counts per account type for the personal dashboard overview.

| Column              | Type | Constraints   | Description                            |
| ------------------- | ---- | ------------- | -------------------------------------- |
| id                  | uuid | PK            | Snapshot identifier                    |
| user_id             | uuid | FK → users.id | Owning user                            |
| businesses_followed | int  | DEFAULT 0     | Number of businesses the user followed |
| communities_joined  | int  | DEFAULT 0     | Number of communities the user joined  |
| upcoming_events     | int  | DEFAULT 0     | Number of upcoming events              |
| active_agencies     | int  | DEFAULT 0     | Number of active agency accounts       |

---

## Table: activities

Tracks user actions over time (follows, event check-ins, subscriptions, community joins, etc.).

| Column      | Type   | Constraints   | Description                                                                                     |
| ----------- | ------ | ------------- | ----------------------------------------------------------------------------------------------- |
| id          | int    | PK            | Activity identifier                                                                             |
| user_id     | uuid   | FK → users.id | Owning user                                                                                     |
| type        | enum   | NOT NULL      | `follow` \| `involved` \| `event` \| `subscription` \| `community` \| `reward` \| `achievement` |
| category    | string | NOT NULL      | Display label (Follow, Involved, Event, Subscription, Community, Reward, Achievement)           |
| title       | string | NOT NULL      | Short activity title                                                                            |
| description | string | NULLABLE      | Extended description of the action                                                              |
| icon        | string | NULLABLE      | Emoji icon representing the activity                                                            |
| timestamp   | string | NOT NULL      | Human-readable relative time (e.g. "2 hours ago")                                               |
| period      | enum   | NOT NULL      | `today` \| `this_week` \| `this_month`                                                          |

### activity_stats (aggregate / computed)

| Column           | Type | Description                       |
| ---------------- | ---- | --------------------------------- |
| subscriptions    | int  | Total subscription activity count |
| follows          | int  | Total follow activity count       |
| involved_actions | int  | Total involved/engagement count   |

---

## Table: community_posts

Posts/messages from communities the user is part of or following.

| Column    | Type   | Constraints | Description                       |
| --------- | ------ | ----------- | --------------------------------- |
| id        | int    | PK          | Post identifier                   |
| community | string | NOT NULL    | Name of the originating community |
| author    | string | NOT NULL    | Display name of the post author   |
| message   | text   | NOT NULL    | Post body                         |
| timestamp | string | NOT NULL    | Relative time string              |
| likes     | int    | DEFAULT 0   | Like/reaction count               |
| image     | string | NULLABLE    | Emoji thumbnail for the post      |

---

## Table: communities

Discoverable and joined communities.

| Column      | Type     | Constraints   | Description                                                                                 |
| ----------- | -------- | ------------- | ------------------------------------------------------------------------------------------- |
| id          | int      | PK            | Community identifier                                                                        |
| name        | string   | NOT NULL      | Community display name                                                                      |
| description | text     | NOT NULL      | Short description of the community                                                          |
| members     | int      | DEFAULT 0     | Total member count                                                                          |
| category    | string   | NOT NULL      | Category label (Business, Food & Drink, Lifestyle, Creative, Professional, Local, Hobbyist) |
| image       | string   | NULLABLE      | Emoji or image reference                                                                    |
| tags        | string[] | NULLABLE      | Descriptive tags                                                                            |
| location    | string   | NULLABLE      | Physical or virtual location                                                                |
| followed    | boolean  | DEFAULT false | Whether the current user follows this community                                             |
| is_member   | boolean  | DEFAULT false | Whether the current user is a member                                                        |
| is_new      | boolean  | DEFAULT false | Newly created flag                                                                          |

### community_recent_activities (child)

| Column       | Type   | Constraints         | Description          |
| ------------ | ------ | ------------------- | -------------------- |
| id           | int    | PK                  | Activity identifier  |
| community_id | int    | FK → communities.id | Parent community     |
| title        | string | NOT NULL            | Activity title       |
| timestamp    | string | NOT NULL            | Relative time string |

---

## Table: events

Events posted by businesses or communities, viewable and trackable by personal users.

| Column         | Type    | Constraints   | Description                                      |
| -------------- | ------- | ------------- | ------------------------------------------------ |
| id             | int     | PK            | Event identifier                                 |
| title          | string  | NOT NULL      | Event title                                      |
| description    | text    | NOT NULL      | Event description                                |
| date           | string  | NOT NULL      | Display date string (e.g. "March 15, 2026")      |
| time           | string  | NOT NULL      | Display time range (e.g. "9:00 AM - 6:00 PM")    |
| location       | string  | NOT NULL      | Venue or address                                 |
| attendees      | int     | DEFAULT 0     | Number of registered attendees                   |
| business       | string  | NOT NULL      | Name of the hosting business                     |
| followed       | boolean | DEFAULT false | Whether the user follows this event's business   |
| interested     | boolean | DEFAULT false | Whether the user marked as interested            |
| notify_on_date | boolean | DEFAULT false | Whether the user enabled event-date notification |
| image          | string  | NULLABLE      | Emoji or image reference                         |

---

## Table: membership_communities

Communities the user can join or has joined, tracked under the Membership section.

| Column      | Type    | Constraints   | Description                                    |
| ----------- | ------- | ------------- | ---------------------------------------------- |
| id          | string  | PK            | Community identifier (e.g. "community_1")      |
| name        | string  | NOT NULL      | Community display name                         |
| category    | string  | NOT NULL      | Category (Professional, Hobbyist, Local, etc.) |
| description | text    | NOT NULL      | Summary description                            |
| members     | int     | DEFAULT 0     | Total member count                             |
| location    | string  | NOT NULL      | Physical meeting location                      |
| joined      | boolean | DEFAULT false | Whether the user has joined                    |

---

## Table: membership_events

Events the user can register for or has attended, tracked under the Membership section.

| Column      | Type    | Constraints   | Description                                     |
| ----------- | ------- | ------------- | ----------------------------------------------- |
| id          | string  | PK            | Event identifier (e.g. "event_1")               |
| title       | string  | NOT NULL      | Event title                                     |
| type        | string  | NOT NULL      | Event type (Seminar, Workshop, Gathering, etc.) |
| description | text    | NOT NULL      | Event description                               |
| date        | date    | NOT NULL      | ISO date string (e.g. "2026-03-10")             |
| venue       | string  | NOT NULL      | Event location                                  |
| registered  | boolean | DEFAULT false | Whether the user has registered                 |
| attended    | boolean | DEFAULT false | Whether the user has attended                   |

---

## Table: notifications

Notifications received from followed or subscribed businesses/events.

| Column       | Type   | Constraints       | Description                                               |
| ------------ | ------ | ----------------- | --------------------------------------------------------- |
| id           | int    | PK                | Notification identifier                                   |
| user_id      | uuid   | FK → users.id     | Recipient user                                            |
| brand        | string | NOT NULL          | Name of the originating brand/business                    |
| source_type  | enum   | NOT NULL          | `business` \| `event`                                     |
| relationship | enum   | NOT NULL          | `followed` \| `subscribed`                                |
| title        | string | NOT NULL          | Notification headline                                     |
| message      | text   | NOT NULL          | Full notification body                                    |
| type         | enum   | NOT NULL          | `promotion` \| `announcement` \| `event`                  |
| icon         | string | NULLABLE          | Emoji icon                                                |
| timestamp    | string | NULLABLE          | Relative time when sent (for pending notifications)       |
| expires_at   | string | NULLABLE          | Relative expiry duration (e.g. "2 days")                  |
| expired_at   | string | NULLABLE          | Relative time when it expired (for expired notifications) |
| status       | enum   | DEFAULT 'pending' | `pending` \| `expired`                                    |

---

## Table: reward_categories

Top-level groupings for available rewards.

| Column | Type   | Constraints | Description                                                         |
| ------ | ------ | ----------- | ------------------------------------------------------------------- |
| id     | string | PK          | Category slug (discounts, freebies, experiences, exclusive)         |
| name   | string | NOT NULL    | Display name (Discounts, Free Items, Experiences, Exclusive Access) |

---

## Table: rewards

Individual reward vouchers available to users.

| Column       | Type    | Constraints               | Description                              |
| ------------ | ------- | ------------------------- | ---------------------------------------- |
| id           | int     | PK                        | Reward identifier                        |
| category_id  | string  | FK → reward_categories.id | Parent category                          |
| name         | string  | NOT NULL                  | Reward display name                      |
| voucher_code | string  | NOT NULL, UNIQUE          | Unique redeemable voucher code           |
| description  | string  | NOT NULL                  | Short usage description                  |
| expires      | string  | NOT NULL                  | Expiry label (e.g. "30 days", "Limited") |
| popular      | boolean | DEFAULT false             | Whether flagged as popular               |

---

## Table: reward_history

Log of rewards redeemed or currently active for the user.

| Column       | Type   | Constraints     | Description                       |
| ------------ | ------ | --------------- | --------------------------------- |
| id           | int    | PK              | History entry identifier          |
| user_id      | uuid   | FK → users.id   | Owning user                       |
| reward_id    | int    | FK → rewards.id | Associated reward                 |
| name         | string | NOT NULL        | Reward name at time of redemption |
| brand        | string | NOT NULL        | Brand that issued the reward      |
| voucher_code | string | NOT NULL        | Voucher code used                 |
| date         | string | NOT NULL        | Relative redemption date          |
| status       | enum   | NOT NULL        | `active` \| `used`                |

---

## Table: subscriptions

Business subscriptions held by the user.

| Column                | Type     | Constraints    | Description                                       |
| --------------------- | -------- | -------------- | ------------------------------------------------- |
| id                    | string   | PK             | Subscription identifier                           |
| user_id               | uuid     | FK → users.id  | Subscribing user                                  |
| brand                 | string   | NOT NULL       | Business/brand name                               |
| digital_id            | string   | NOT NULL       | Brand's digital handle (e.g. "@techstartup")      |
| industry              | string   | NOT NULL       | Industry label                                    |
| tier                  | string   | DEFAULT 'Free' | Subscription tier (Free, Premium, etc.)           |
| subscribed_at         | date     | NOT NULL       | ISO date when subscription started                |
| status                | enum     | NOT NULL       | `active` \| `inactive` \| `cancelled`             |
| color                 | string   | NULLABLE       | Tailwind color class for brand avatar             |
| notifications_enabled | boolean  | DEFAULT false  | Whether user enabled notifications for this brand |
| benefits              | string[] | NOT NULL       | List of subscription benefits                     |
| next_billing          | date     | NULLABLE       | Next billing date (null for free tier)            |
| monthly_price         | decimal  | DEFAULT 0      | Monthly cost (0 for free tier)                    |
| price_label           | string   | NOT NULL       | Display price label (e.g. "Free", "₱299/mo")      |

---

## Table: subscription_recent_activities

Recent content/updates from subscribed brands.

| Column          | Type     | Constraints           | Description                        |
| --------------- | -------- | --------------------- | ---------------------------------- |
| id              | string   | PK                    | Activity identifier                |
| subscription_id | string   | FK → subscriptions.id | Associated subscription            |
| type            | enum     | NOT NULL              | `content` \| `event` \| `discount` |
| brand           | string   | NOT NULL              | Brand that generated the activity  |
| title           | string   | NOT NULL              | Activity title                     |
| description     | text     | NOT NULL              | Activity description               |
| timestamp       | datetime | NOT NULL              | ISO timestamp of the activity      |

---

---

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

---

---

# Whodini — Community Section DB Schema

> Derived from the mock/static data structures used across `src/app/community/**`.

---

## Table: community_profiles

Core community profile managed by the community owner.

| Column         | Type     | Constraints   | Description                                       |
| -------------- | -------- | ------------- | ------------------------------------------------- |
| id             | string   | PK            | Community account identifier (e.g. WD-C-aee090b3) |
| owner_id       | uuid     | FK → users.id | User who owns/administers the community           |
| name           | string   | NOT NULL      | Community display name                            |
| description    | text     | NULLABLE      | Community description / mission statement         |
| email          | string   | NULLABLE      | Contact email address                             |
| phone          | string   | NULLABLE      | Contact phone number                              |
| website        | string   | NULLABLE      | Community website URL                             |
| total_members  | int      | DEFAULT 0     | Total member count across all chapters            |
| total_chapters | int      | DEFAULT 0     | Total number of active chapters                   |
| total_events   | int      | DEFAULT 0     | Total number of events hosted                     |
| created_at     | datetime | NOT NULL      | When the community profile was created            |

---

## Table: chapters

Regional or thematic sub-divisions of a community.

| Column          | Type   | Constraints                | Description                                       |
| --------------- | ------ | -------------------------- | ------------------------------------------------- |
| id              | string | PK                         | Chapter identifier                                |
| community_id    | uuid   | FK → community_profiles.id | Parent community                                  |
| community_label | string | NOT NULL                   | Display name of the parent community              |
| name            | string | NOT NULL                   | Chapter display name                              |
| region          | string | NOT NULL                   | Geographic region (city, country, district, etc.) |
| description     | text   | NULLABLE                   | Chapter description                               |
| category        | string | NOT NULL                   | Chapter category / focus area                     |
| leader_name     | string | NOT NULL                   | Name of the chapter leader                        |
| member_count    | int    | DEFAULT 0                  | Number of members in this chapter                 |
| status          | enum   | DEFAULT 'active'           | `active` \| `inactive`                            |
| founded_at      | date   | NOT NULL                   | ISO date when the chapter was founded             |

---

## Table: community_members

Members enrolled in the community, with chapter assignment and role.

| Column          | Type     | Constraints                | Description                                             |
| --------------- | -------- | -------------------------- | ------------------------------------------------------- |
| id              | string   | PK                         | Member record identifier                                |
| community_id    | uuid     | FK → community_profiles.id | Parent community                                        |
| community_label | string   | NOT NULL                   | Display name of the parent community                    |
| whodini_id      | string   | NULLABLE                   | Linked Whodini personal account ID (e.g. WD-P-x8m9n2k5) |
| name            | string   | NOT NULL                   | Member display name                                     |
| email           | string   | NOT NULL                   | Member email address                                    |
| bio             | text     | NULLABLE                   | Short member biography                                  |
| interests       | string[] | NULLABLE                   | List of interest tags                                   |
| role            | enum     | DEFAULT 'member'           | `member` \| `moderator` \| `leader`                     |
| status          | enum     | DEFAULT 'active'           | `active` \| `inactive`                                  |
| chapter_name    | string   | NOT NULL                   | Name of the chapter this member belongs to              |
| join_date       | date     | NOT NULL                   | ISO date when the member joined                         |
| avatar_initials | string   | NULLABLE                   | Two-letter initials used for avatar display             |

---

## Table: community_events

Events organised and hosted by the community, optionally under a specific chapter.

| Column          | Type   | Constraints                | Description                                                          |
| --------------- | ------ | -------------------------- | -------------------------------------------------------------------- |
| id              | string | PK                         | Event identifier                                                     |
| community_id    | uuid   | FK → community_profiles.id | Hosting community                                                    |
| community_label | string | NOT NULL                   | Display name of the hosting community                                |
| chapter_name    | string | NOT NULL                   | Chapter organising the event                                         |
| event_name      | string | NOT NULL                   | Event title                                                          |
| description     | text   | NULLABLE                   | Event description                                                    |
| date            | date   | NOT NULL                   | ISO date of the event                                                |
| time            | string | NOT NULL                   | Display time string (e.g. "09:00 AM")                                |
| location        | string | NOT NULL                   | Venue or address                                                     |
| capacity        | int    | NOT NULL                   | Maximum number of attendees                                          |
| attendee_count  | int    | DEFAULT 0                  | Current number of registered attendees                               |
| status          | enum   | NOT NULL                   | `upcoming` \| `ongoing` \| `completed` \| `cancelled` \| `postponed` |

---

## Table: directory_entries

Links, documents, and resources curated in the community's resource directory.

| Column          | Type     | Constraints                | Description                                                         |
| --------------- | -------- | -------------------------- | ------------------------------------------------------------------- |
| id              | string   | PK                         | Directory entry identifier                                          |
| community_id    | uuid     | FK → community_profiles.id | Owning community                                                    |
| community_label | string   | NOT NULL                   | Display name of the owning community                                |
| title           | string   | NOT NULL                   | Entry display title                                                 |
| description     | text     | NULLABLE                   | Short description of the resource                                   |
| category        | string   | NOT NULL                   | Category (Guidelines, Resources, Directory, Tools, Events, etc.)    |
| resource_type   | string   | NOT NULL                   | Resource type label (Document, Guide, Database, Hub, Toolkit, etc.) |
| url             | string   | NOT NULL                   | Link to the external resource                                       |
| tags            | string[] | NULLABLE                   | Descriptive tags for search and filtering                           |
| status          | enum     | DEFAULT 'active'           | `active` \| `inactive`                                              |

---

## Table: message_threads

Discussion threads on the community message board.

| Column          | Type   | Constraints                | Description                                                          |
| --------------- | ------ | -------------------------- | -------------------------------------------------------------------- |
| id              | string | PK                         | Thread identifier                                                    |
| community_id    | uuid   | FK → community_profiles.id | Parent community                                                     |
| community_label | string | NOT NULL                   | Display name of the parent community                                 |
| title           | string | NOT NULL                   | Thread title / discussion topic                                      |
| description     | text   | NULLABLE                   | Short summary of the thread topic                                    |
| category        | string | NOT NULL                   | Discussion category (Technology, Networking, Events, Business, etc.) |
| author          | string | NOT NULL                   | Display name of the thread starter                                   |
| post_count      | int    | DEFAULT 0                  | Number of replies in the thread                                      |
| view_count      | int    | DEFAULT 0                  | Number of views                                                      |
| last_activity   | string | NOT NULL                   | Relative time of the last post/activity                              |
| status          | enum   | DEFAULT 'active'           | `active` \| `archived`                                               |

---

## Table: forum_posts

Individual replies / posts within a message thread.

| Column    | Type    | Constraints             | Description                                          |
| --------- | ------- | ----------------------- | ---------------------------------------------------- |
| id        | string  | PK                      | Post identifier                                      |
| thread_id | string  | FK → message_threads.id | Parent thread                                        |
| author    | string  | NOT NULL                | Display name of the post author                      |
| content   | text    | NOT NULL                | Body of the post / reply                             |
| timestamp | string  | NOT NULL                | Relative or ISO timestamp of the post                |
| is_own    | boolean | DEFAULT false           | Whether the post belongs to the current session user |

---

## Table: community_staff

Named staff members whose identity is always displayed with their real name, role, and position on the message board.

| Column       | Type   | Constraints                | Description                                      |
| ------------ | ------ | -------------------------- | ------------------------------------------------ |
| id           | uuid   | PK                         | Staff record identifier                          |
| community_id | uuid   | FK → community_profiles.id | Owning community                                 |
| name         | string | NOT NULL                   | Staff member's display name                      |
| position     | string | NOT NULL                   | Job / position title (e.g. "Community Director") |
| role         | enum   | NOT NULL                   | `admin` \| `moderator` \| `coordinator`          |

---

## Table: community_milestones

Historical milestones and significant achievements logged for the community.

| Column          | Type   | Constraints                | Description                                                                              |
| --------------- | ------ | -------------------------- | ---------------------------------------------------------------------------------------- |
| id              | string | PK                         | Milestone identifier                                                                     |
| community_id    | uuid   | FK → community_profiles.id | Owning community                                                                         |
| community_label | string | NOT NULL                   | Display name of the owning community                                                     |
| title           | string | NOT NULL                   | Short milestone title                                                                    |
| description     | text   | NOT NULL                   | Detailed description of the milestone                                                    |
| date            | date   | NOT NULL                   | ISO date when the milestone occurred                                                     |
| category        | string | NOT NULL                   | Milestone category (Foundation, Growth, Events, Partnerships, Expansion, Programs, etc.) |
| impact          | string | NOT NULL                   | Human-readable description of the milestone's impact                                     |

---

## Table: community_forum_stats

Dashboard aggregate stats shown on the community home page.

| Column       | Type | Constraints                        | Description                         |
| ------------ | ---- | ---------------------------------- | ----------------------------------- |
| id           | uuid | PK                                 | Stats record identifier             |
| community_id | uuid | FK → community_profiles.id, UNIQUE | One record per community            |
| total_forums | int  | DEFAULT 0                          | Total number of forum threads       |
| total_posts  | int  | DEFAULT 0                          | Total post count across all threads |

---

## Table: community_forums_preview

Top-level forum topics shown on the community dashboard (quick-glance list).

| Column       | Type   | Constraints                | Description                                                              |
| ------------ | ------ | -------------------------- | ------------------------------------------------------------------------ |
| id           | int    | PK                         | Forum preview identifier                                                 |
| community_id | uuid   | FK → community_profiles.id | Parent community                                                         |
| title        | string | NOT NULL                   | Forum/topic title                                                        |
| posts        | int    | DEFAULT 0                  | Number of posts in this forum                                            |
| last_active  | string | NOT NULL                   | Relative time of last activity                                           |
| category     | string | NOT NULL                   | Topic category (Technology, Career, Finance, Design, Productivity, etc.) |

---

## Table: community_notifications

Notifications composed and sent by a community admin to its members.

| Column         | Type     | Constraints                | Description                                        |
| -------------- | -------- | -------------------------- | -------------------------------------------------- |
| id             | string   | PK                         | Notification identifier                            |
| community_id   | uuid     | FK → community_profiles.id | Sending community                                  |
| title          | string   | NOT NULL                   | Notification headline                              |
| message        | text     | NOT NULL                   | Full notification body                             |
| type           | enum     | NOT NULL                   | `announcement` \| `event` \| `urgent` \| `general` |
| audience       | enum     | NOT NULL                   | `all_members` \| `chapter_members`                 |
| scheduled_time | datetime | NULLABLE                   | Scheduled send time (null = immediate)             |
| action_url     | string   | NULLABLE                   | Optional deep-link or landing page URL             |
| opened         | int      | DEFAULT 0                  | Number of opens                                    |
| clicked        | int      | DEFAULT 0                  | Number of click-throughs                           |
| status         | enum     | NOT NULL                   | `sent` \| `scheduled` \| `draft`                   |
| sent_at        | datetime | NULLABLE                   | ISO datetime the notification was actually sent    |

---

## Table: community_settings

General settings for a community profile.

| Column       | Type   | Constraints                        | Description                       |
| ------------ | ------ | ---------------------------------- | --------------------------------- |
| id           | uuid   | PK                                 | Settings record identifier        |
| community_id | uuid   | FK → community_profiles.id, UNIQUE | One settings record per community |
| name         | string | NOT NULL                           | Community display name            |
| description  | text   | NULLABLE                           | Community description             |
| email        | string | NULLABLE                           | Contact email                     |
| phone        | string | NULLABLE                           | Contact phone number              |
| website      | string | NULLABLE                           | Community website URL             |

---

---

# Whodini — Organizer Section DB Schema

> Derived from the mock/static data structures used across `src/app/organizer/**`.

---

## Table: organizer_profiles

Core profile and contact information for an organizer account.

| Column      | Type      | Constraints | Description                                       |
| ----------- | --------- | ----------- | ------------------------------------------------- |
| id          | string    | PK          | Organizer account identifier (e.g. WD-O-85203475) |
| org_name    | string    | NOT NULL    | Organization display name                         |
| email       | string    | NOT NULL    | Primary contact email                             |
| phone       | string    | NULLABLE    | Contact phone number                              |
| address     | string    | NULLABLE    | Street address                                    |
| city        | string    | NULLABLE    | City                                              |
| website     | string    | NULLABLE    | Organization website URL                          |
| description | text      | NULLABLE    | Organization bio / description                    |
| logo_url    | string    | NULLABLE    | URL to uploaded organization logo                 |
| created_at  | timestamp | NOT NULL    | Record creation timestamp                         |
| updated_at  | timestamp | NOT NULL    | Last update timestamp                             |

---

## Table: organizer_events

Events created and managed by an organizer.

| Column          | Type      | Constraints                        | Description                                |
| --------------- | --------- | ---------------------------------- | ------------------------------------------ |
| id              | uuid      | PK                                 | Event identifier                           |
| organizer_id    | uuid      | FK → organizer_profiles.id         | Owning organizer                           |
| organizer_label | string    | NOT NULL                           | Denormalized organizer name label          |
| title           | string    | NOT NULL                           | Event title                                |
| description     | text      | NULLABLE                           | Event description                          |
| starts_at       | timestamp | NOT NULL                           | Event start date/time (ISO)                |
| ends_at         | timestamp | NOT NULL                           | Event end date/time (ISO)                  |
| location_type   | enum      | NOT NULL: in_person/virtual/hybrid | Venue modality                             |
| location_label  | string    | NULLABLE                           | Human-readable venue name or URL           |
| payment_type    | enum      | NOT NULL: free/paid                | Whether the event is free or ticketed      |
| price           | numeric   | DEFAULT 0                          | Ticket price (0 for free events)           |
| capacity        | integer   | NOT NULL                           | Maximum number of registrations            |
| category        | string    | NULLABLE                           | Event category / type                      |
| status          | string    | NOT NULL, DEFAULT 'upcoming'       | Event status (upcoming / past / cancelled) |
| created_at      | timestamp | NOT NULL                           | Record creation timestamp                  |

---

## Table: event_service_links

Junction table linking events to services.

| Column     | Type | Constraints                          | Description       |
| ---------- | ---- | ------------------------------------ | ----------------- |
| event_id   | uuid | FK → organizer_events.id, NOT NULL   | Event reference   |
| service_id | uuid | FK → organizer_services.id, NOT NULL | Service reference |

---

## Table: event_vendor_links

Junction table linking events to vendors.

| Column    | Type | Constraints                         | Description      |
| --------- | ---- | ----------------------------------- | ---------------- |
| event_id  | uuid | FK → organizer_events.id, NOT NULL  | Event reference  |
| vendor_id | uuid | FK → organizer_vendors.id, NOT NULL | Vendor reference |

---

## Table: event_team_member_links

Junction table linking events to assigned team members.

| Column         | Type | Constraints                              | Description           |
| -------------- | ---- | ---------------------------------------- | --------------------- |
| event_id       | uuid | FK → organizer_events.id, NOT NULL       | Event reference       |
| team_member_id | uuid | FK → organizer_team_members.id, NOT NULL | Team member reference |

---

## Table: event_registrations

Attendee registrations for organizer events.

| Column        | Type      | Constraints                        | Description                      |
| ------------- | --------- | ---------------------------------- | -------------------------------- |
| id            | uuid      | PK                                 | Registration identifier          |
| event_id      | uuid      | FK → organizer_events.id, NOT NULL | Associated event                 |
| name          | string    | NOT NULL                           | Registrant full name             |
| email         | string    | NOT NULL                           | Registrant email                 |
| phone         | string    | NULLABLE                           | Registrant phone number          |
| registered_at | timestamp | NOT NULL                           | Registration timestamp (ISO)     |
| status        | enum      | NOT NULL: registered/cancelled     | Current registration status      |
| ticket_type   | enum      | NOT NULL: free/paid                | Mirrors the event's payment_type |

---

## Table: organizer_services

Service providers available for assignment to events.

| Column          | Type      | Constraints                            | Description                                    |
| --------------- | --------- | -------------------------------------- | ---------------------------------------------- |
| id              | uuid      | PK                                     | Service record identifier                      |
| organizer_id    | uuid      | FK → organizer_profiles.id             | Owning organizer                               |
| organizer_label | string    | NOT NULL                               | Denormalized organizer name label              |
| service_name    | string    | NOT NULL                               | Name of the service                            |
| provider        | string    | NOT NULL                               | Service provider / company name                |
| contact_person  | string    | NULLABLE                               | Primary contact at the provider                |
| email           | string    | NOT NULL                               | Provider contact email                         |
| phone           | string    | NULLABLE                               | Provider contact phone                         |
| category        | string    | NULLABLE                               | Service category (e.g. Audio/Visual, Catering) |
| description     | text      | NULLABLE                               | Service description                            |
| pricing         | numeric   | NOT NULL, DEFAULT 0                    | Service cost                                   |
| pricing_type    | enum      | NOT NULL: hourly/daily/flat            | How the service is billed                      |
| status          | enum      | NOT NULL: available/booked/unavailable | Current availability status                    |
| created_at      | timestamp | NOT NULL                               | Record creation timestamp                      |

---

## Table: organizer_vendors

Vendors (exhibitors / booth holders) available for assignment to events.

| Column          | Type      | Constraints                           | Description                            |
| --------------- | --------- | ------------------------------------- | -------------------------------------- |
| id              | uuid      | PK                                    | Vendor record identifier               |
| organizer_id    | uuid      | FK → organizer_profiles.id            | Owning organizer                       |
| organizer_label | string    | NOT NULL                              | Denormalized organizer name label      |
| business_name   | string    | NOT NULL                              | Vendor / business name                 |
| contact_person  | string    | NULLABLE                              | Primary contact name                   |
| email           | string    | NOT NULL                              | Contact email                          |
| phone           | string    | NULLABLE                              | Contact phone                          |
| category        | string    | NULLABLE                              | Vendor category (e.g. Food & Beverage) |
| description     | text      | NULLABLE                              | Vendor description                     |
| booth_size      | string    | NULLABLE                              | Assigned booth size (e.g. 10x10)       |
| status          | enum      | NOT NULL: pending/confirmed/cancelled | Vendor participation status            |
| created_at      | timestamp | NOT NULL                              | Record creation timestamp              |

---

## Table: organizer_team_members

Staff and volunteers belonging to an organizer account.

| Column          | Type      | Constraints                             | Description                       |
| --------------- | --------- | --------------------------------------- | --------------------------------- |
| id              | uuid      | PK                                      | Team member identifier            |
| organizer_id    | uuid      | FK → organizer_profiles.id              | Owning organizer                  |
| organizer_label | string    | NOT NULL                                | Denormalized organizer name label |
| full_name       | string    | NOT NULL                                | Member full name                  |
| role            | string    | NULLABLE                                | Job title / role description      |
| email           | string    | NOT NULL                                | Contact email                     |
| phone           | string    | NULLABLE                                | Contact phone                     |
| department      | string    | NULLABLE                                | Department or team                |
| access_level    | enum      | NOT NULL: admin/manager/staff/volunteer | Role-based access level           |
| status          | enum      | NOT NULL: active/inactive/on_leave      | Current employment status         |
| joined_at       | timestamp | NOT NULL                                | Date the member joined            |

---

## Table: organizer_team_permissions

Granular feature permissions for each team member.

| Column             | Type    | Constraints                                | Description                              |
| ------------------ | ------- | ------------------------------------------ | ---------------------------------------- |
| team_member_id     | uuid    | PK, FK → organizer_team_members.id, UNIQUE | One permissions record per team member   |
| manage_events      | boolean | NOT NULL, DEFAULT false                    | Can create/edit/delete events            |
| manage_vendors     | boolean | NOT NULL, DEFAULT false                    | Can add/manage vendor relationships      |
| manage_services    | boolean | NOT NULL, DEFAULT false                    | Can configure service providers          |
| manage_team        | boolean | NOT NULL, DEFAULT false                    | Can add/edit/remove team members         |
| view_reports       | boolean | NOT NULL, DEFAULT false                    | Can access analytics and reports         |
| manage_billing     | boolean | NOT NULL, DEFAULT false                    | Can handle payments and billing settings |
| send_notifications | boolean | NOT NULL, DEFAULT false                    | Can send messages/notifications          |
| export_data        | boolean | NOT NULL, DEFAULT false                    | Can export event and attendee data       |

---

## Table: organizer_blast_emails

Mass email blasts sent to event attendees.

| Column           | Type      | Constraints                | Description                               |
| ---------------- | --------- | -------------------------- | ----------------------------------------- |
| id               | uuid      | PK                         | Blast email record identifier             |
| organizer_id     | uuid      | FK → organizer_profiles.id | Sending organizer                         |
| event_id         | uuid      | FK → organizer_events.id   | Target event                              |
| recipient_filter | enum      | NOT NULL: registered/all   | Whether to send to registered-only or all |
| subject          | string    | NOT NULL                   | Email subject line                        |
| body             | text      | NOT NULL                   | Email body content                        |
| recipient_count  | integer   | NOT NULL                   | Number of recipients at send time         |
| sent_at          | timestamp | NOT NULL                   | Timestamp the blast was sent              |

---

---

# Whodini — Agency Section DB Schema

> Derived from the mock/static data structures used across `src/app/agency/**`.

---

## Table: agency_profiles

Core profile, contact, and localization settings for an agency account.

| Column            | Type      | Constraints                 | Description                                    |
| ----------------- | --------- | --------------------------- | ---------------------------------------------- |
| id                | string    | PK                          | Agency account identifier (e.g. WD-A-23dd8aa4) |
| organization_name | string    | NOT NULL                    | Agency display name                            |
| email             | string    | NOT NULL                    | Primary contact email                          |
| phone             | string    | NULLABLE                    | Contact phone number                           |
| website           | string    | NULLABLE                    | Agency website URL                             |
| address           | string    | NULLABLE                    | Street address                                 |
| city              | string    | NULLABLE                    | City                                           |
| state             | string    | NULLABLE                    | State / province                               |
| zip_code          | string    | NULLABLE                    | Postal / zip code                              |
| country           | string    | NULLABLE                    | Country                                        |
| description       | text      | NULLABLE                    | Agency bio / description                       |
| timezone          | string    | NULLABLE                    | IANA timezone (e.g. America/Los_Angeles)       |
| currency          | string    | NULLABLE, DEFAULT 'USD'     | Preferred billing currency code                |
| language          | string    | NULLABLE, DEFAULT 'English' | Preferred display language                     |
| created_at        | timestamp | NOT NULL                    | Record creation timestamp                      |
| updated_at        | timestamp | NOT NULL                    | Last update timestamp                          |

---

## Table: agency_services

Service offerings defined and managed by an agency.

| Column        | Type   | Constraints                     | Description                                       |
| ------------- | ------ | ------------------------------- | ------------------------------------------------- |
| id            | uuid   | PK                              | Service record identifier                         |
| agency_id     | uuid   | FK → agency_profiles.id         | Owning agency                                     |
| agency_label  | string | NOT NULL                        | Denormalized agency name label                    |
| service_name  | string | NOT NULL                        | Name of the service offering                      |
| description   | text   | NULLABLE                        | Service description                               |
| category      | string | NULLABLE                        | Service category (e.g. Branding, Web Development) |
| delivery_time | string | NULLABLE                        | Estimated delivery / turnaround time              |
| status        | enum   | NOT NULL: available/unavailable | Whether the service is currently offered          |

---

## Table: agency_clients

Client accounts managed by an agency.

| Column           | Type      | Constraints               | Description                               |
| ---------------- | --------- | ------------------------- | ----------------------------------------- |
| id               | uuid      | PK                        | Client record identifier                  |
| agency_id        | uuid      | FK → agency_profiles.id   | Owning agency                             |
| agency_label     | string    | NOT NULL                  | Denormalized agency name label            |
| name             | string    | NOT NULL                  | Client / company name                     |
| email            | string    | NOT NULL                  | Primary contact email                     |
| phone            | string    | NULLABLE                  | Contact phone number                      |
| industry         | string    | NULLABLE                  | Client industry (e.g. Technology, Retail) |
| website          | string    | NULLABLE                  | Client website URL                        |
| status           | enum      | NOT NULL: active/inactive | Client engagement status                  |
| monthly_retainer | numeric   | NULLABLE, DEFAULT 0       | Monthly retainer amount                   |
| notes            | text      | NULLABLE                  | Internal notes about the client           |
| joined_at        | timestamp | NOT NULL                  | Date the client was onboarded             |

---

## Table: client_service_assignments

Junction table linking clients to assigned agency services.

| Column     | Type | Constraints                       | Description       |
| ---------- | ---- | --------------------------------- | ----------------- |
| client_id  | uuid | FK → agency_clients.id, NOT NULL  | Client reference  |
| service_id | uuid | FK → agency_services.id, NOT NULL | Service reference |

---

## Table: client_team_assignments

Junction table linking clients to assigned team members.

| Column         | Type | Constraints                           | Description           |
| -------------- | ---- | ------------------------------------- | --------------------- |
| client_id      | uuid | FK → agency_clients.id, NOT NULL      | Client reference      |
| team_member_id | uuid | FK → agency_team_members.id, NOT NULL | Team member reference |

---

## Table: agency_team_members

Staff members belonging to an agency account.

| Column         | Type      | Constraints               | Description                             |
| -------------- | --------- | ------------------------- | --------------------------------------- |
| id             | uuid      | PK                        | Team member identifier                  |
| agency_id      | uuid      | FK → agency_profiles.id   | Owning agency                           |
| agency_label   | string    | NOT NULL                  | Denormalized agency name label          |
| name           | string    | NOT NULL                  | Member full name                        |
| email          | string    | NOT NULL                  | Contact email                           |
| position       | string    | NULLABLE                  | Job title / position                    |
| specialization | string    | NULLABLE                  | Area of expertise (e.g. UI Design, SEO) |
| hourly_rate    | numeric   | NOT NULL, DEFAULT 0       | Billing rate per hour                   |
| status         | enum      | NOT NULL: active/inactive | Current employment status               |
| skills         | string[]  | NULLABLE                  | Array of skill tags                     |
| joined_at      | timestamp | NOT NULL                  | Date the member joined the agency       |

---

## Table: team_client_assignments

Junction table linking team members to their assigned clients (inverse of `client_team_assignments`).

| Column         | Type | Constraints                           | Description           |
| -------------- | ---- | ------------------------------------- | --------------------- |
| team_member_id | uuid | FK → agency_team_members.id, NOT NULL | Team member reference |
| client_id      | uuid | FK → agency_clients.id, NOT NULL      | Client reference      |

---

---

# Whodini — Registration & User Identity DB Schema

> Derived from `src/app/register/page.tsx` and `src/lib/indexeddb/auth.ts`.
>
> **Design rule:** A single user account can hold any combination of account types simultaneously (personal is always required; business, community, organizer, and agency are optional add-ons).

### ID Format Reference

Each account type uses a prefixed, human-readable identifier in the format `WD-{TYPE}-{8 alphanumeric chars}`:

| Account Type | Prefix | Example       |
| ------------ | ------ | ------------- |
| Personal     | WD-P   | WD-P-x8m9n2k5 |
| Business     | WD-B   | WD-B-a42741f6 |
| Community    | WD-C   | WD-C-aee090b3 |
| Organizer    | WD-O   | WD-O-85203475 |
| Agency       | WD-A   | WD-A-23dd8aa4 |

---

## Table: users

Core identity record for every registered user. One row = one person.

| Column            | Type      | Constraints      | Description                                                  |
| ----------------- | --------- | ---------------- | ------------------------------------------------------------ |
| id                | string    | PK               | Personal account identifier (e.g. WD-P-x8m9n2k5)             |
| name              | string    | NOT NULL         | Display name                                                 |
| email             | string    | NOT NULL, UNIQUE | Login email (stored normalised / lowercased)                 |
| password_salt_b64 | string    | NOT NULL         | Base64-encoded random 16-byte salt used for password hashing |
| password_hash_b64 | string    | NOT NULL         | Base64-encoded SHA-256(salt + password) hash                 |
| created_at        | timestamp | NOT NULL         | Account registration timestamp                               |

---

## Table: user_account_types

Maps each user to the account type(s) they have enabled. One row per active account type per user.

| Column       | Type | Constraints                                            | Description                            |
| ------------ | ---- | ------------------------------------------------------ | -------------------------------------- |
| user_id      | uuid | FK → users.id, NOT NULL                                | Owning user                            |
| account_type | enum | NOT NULL: personal/business/community/organizer/agency | The account type enabled for this user |

> **Constraints:**
>
> - `(user_id, account_type)` — composite UNIQUE (a user can only have each type once)
> - `personal` is always present for every user (enforced at application level)
