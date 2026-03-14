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
