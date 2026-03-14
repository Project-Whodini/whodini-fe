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

## Table: user_profiles

Full profile information for a personal account. Managed via `src/app/personal/profile/page.tsx`.

| Column          | Type   | Constraints           | Description                                        |
| --------------- | ------ | --------------------- | -------------------------------------------------- |
| id              | uuid   | PK                    | Profile record identifier                          |
| user_id         | string | FK → users.id, UNIQUE | Owning personal account                            |
| display_name    | string | NOT NULL              | Public display name                                |
| username        | string | NOT NULL, UNIQUE      | @ handle (e.g. @wengsantos)                        |
| bio             | text   | NULLABLE              | Short personal bio                                 |
| email           | string | NOT NULL              | Contact email address                              |
| phone           | string | NULLABLE              | Contact phone number                               |
| location        | string | NULLABLE              | City / country                                     |
| birthdate       | date   | NULLABLE              | ISO date of birth (e.g. 1995-07-22)                |
| website         | string | NULLABLE              | Personal website URL                               |
| instagram       | string | NULLABLE              | Instagram handle                                   |
| twitter         | string | NULLABLE              | Twitter / X handle                                 |
| facebook        | string | NULLABLE              | Facebook profile name                              |
| avatar_initials | string | NULLABLE              | Fallback initials for avatar display (e.g. WS)     |
| member_since    | string | NOT NULL              | Human-readable join date label (e.g. January 2025) |

### user_interests (child)

Tags representing the user's personal interests, editable from the Profile page.

| Column     | Type   | Constraints           | Description                               |
| ---------- | ------ | --------------------- | ----------------------------------------- |
| id         | uuid   | PK                    | Interest record id                        |
| profile_id | uuid   | FK → user_profiles.id | Owning profile                            |
| label      | string | NOT NULL              | Interest label (e.g. Technology, Fashion) |
| sort_order | int    | DEFAULT 0             | Display ordering                          |

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

## Table: community_forum_messages

Chat messages posted inside a community's forum thread. Seeded with context messages per community; user-sent messages are appended client-side.

| Column       | Type     | Constraints         | Description                  |
| ------------ | -------- | ------------------- | ---------------------------- |
| id           | int      | PK                  | Message identifier           |
| community_id | int      | FK → communities.id | Parent community             |
| user_id      | uuid     | FK → users.id       | Authenticated author         |
| author       | string   | NOT NULL            | Display name at time of post |
| text         | text     | NOT NULL            | Message body                 |
| likes        | int      | DEFAULT 0           | Aggregate like count         |
| timestamp    | datetime | NOT NULL            | ISO timestamp of the message |
| deleted_at   | datetime | NULLABLE            | Soft delete timestamp        |

### community_forum_message_likes (child)

Tracks per-user likes on forum messages to support toggleable like/unlike.

| Column     | Type     | Constraints                      | Description                    |
| ---------- | -------- | -------------------------------- | ------------------------------ |
| id         | int      | PK                               | Like record identifier         |
| message_id | int      | FK → community_forum_messages.id | Liked message                  |
| user_id    | uuid     | FK → users.id                    | User who liked the message     |
| created_at | datetime | NOT NULL                         | When the like was created      |
| deleted_at | datetime | NULLABLE                         | Soft delete timestamp (unlike) |

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
