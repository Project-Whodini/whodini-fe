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
