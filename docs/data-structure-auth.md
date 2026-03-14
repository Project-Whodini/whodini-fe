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
