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
