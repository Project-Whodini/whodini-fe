# Whodini — Auth API Structure

> Covers registration, login, session management, role switching, and account-type expansion.
>
> **Source files:** `src/lib/indexeddb/auth.ts`, `src/lib/dummy/api.ts`, `src/app/auth/**`, `src/app/register/page.tsx`

---

## Base URL

```
/api/auth
```

---

## Endpoints

### 1. Register — `POST /api/auth/register`

Creates a new user identity with one or more account types. `personal` is always included.

**Request Body**

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "accountTypes": ["personal", "business", "community", "organizer", "agency"]
}
```

| Field        | Type     | Required | Constraints                                        |
| ------------ | -------- | -------- | -------------------------------------------------- |
| name         | string   | Yes      | Non-empty after trim                               |
| email        | string   | Yes      | Valid email; stored normalised (lowercased)        |
| password     | string   | Yes      | Minimum 6 characters                               |
| accountTypes | string[] | Yes      | Must include `"personal"`; duplicates are de-duped |

**Response `201 Created`**

```json
{
  "id": "WD-P-x8m9n2k5",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "accountTypes": ["personal", "business"],
  "createdAt": "2026-03-14T08:00:00.000Z"
}
```

**Errors**

| Status | Code                   | Reason                              |
| ------ | ---------------------- | ----------------------------------- |
| 400    | `name_required`        | `name` is blank                     |
| 400    | `email_required`       | `email` is blank                    |
| 400    | `password_too_short`   | Password shorter than 6 characters  |
| 400    | `personal_required`    | `accountTypes` missing `"personal"` |
| 409    | `email_already_exists` | Email is already registered         |

---

### 2. Login — `POST /api/auth/login`

Authenticates an existing user with email and password. Returns a session.

**Request Body**

```json
{
  "email": "string",
  "password": "string"
}
```

| Field    | Type   | Required |
| -------- | ------ | -------- |
| email    | string | Yes      |
| password | string | Yes      |

**Response `200 OK`**

```json
{
  "userId": "WD-P-x8m9n2k5",
  "email": "jane@example.com",
  "displayName": "Jane Smith",
  "roles": [
    {
      "accountType": "personal",
      "accountId": "WD-P-x8m9n2k5",
      "label": "Personal"
    },
    {
      "accountType": "business",
      "accountId": "WD-B-a42741f6",
      "label": "Jane's Boutique"
    }
  ],
  "activeRoleIndex": 0
}
```

**Errors**

| Status | Code                  | Reason                                |
| ------ | --------------------- | ------------------------------------- |
| 401    | `invalid_credentials` | Email not found or password incorrect |

---

### 3. Get Session — `GET /api/auth/session`

Returns the currently active session, or `null` if not signed in.

**Request** — No body required. Reads from session store / cookie.

**Response `200 OK` (signed in)**

```json
{
  "userId": "WD-P-x8m9n2k5",
  "email": "jane@example.com",
  "displayName": "Jane Smith",
  "roles": [
    {
      "accountType": "personal",
      "accountId": "WD-P-x8m9n2k5",
      "label": "Personal"
    }
  ],
  "activeRoleIndex": 0
}
```

**Response `200 OK` (not signed in)**

```json
null
```

---

### 4. Logout — `POST /api/auth/logout`

Clears the current session.

**Request** — No body required.

**Response `204 No Content`**

---

### 5. Switch Active Role — `PATCH /api/auth/session/role`

Changes which role (account type) is currently active in the session.

**Request Body**

```json
{
  "activeRoleIndex": 1
}
```

| Field           | Type    | Required | Constraints                                    |
| --------------- | ------- | -------- | ---------------------------------------------- |
| activeRoleIndex | integer | Yes      | 0-based index into `roles[]`; clamped to range |

**Response `200 OK`**

Returns the updated `Session` object (same shape as Login response).

**Errors**

| Status | Code            | Reason                  |
| ------ | --------------- | ----------------------- |
| 401    | `not_signed_in` | No active session found |

---

### 6. Add Account Type — `POST /api/auth/account-types`

Adds a new account type (role) to an already-authenticated user's session and, if applicable, creates the associated organisation record.

**Request Body**

The shape varies by `accountType`:

**Personal**

```json
{
  "accountType": "personal",
  "email": "string",
  "displayName": "string"
}
```

**Business**

```json
{
  "accountType": "business",
  "email": "string",
  "displayName": "string",
  "businessName": "string",
  "industry": "string | optional",
  "description": "string | optional"
}
```

**Community**

```json
{
  "accountType": "community",
  "email": "string",
  "displayName": "string",
  "communityName": "string",
  "approvalRequired": true,
  "description": "string | optional"
}
```

**Organizer**

```json
{
  "accountType": "organizer",
  "email": "string",
  "displayName": "string",
  "organizerName": "string"
}
```

**Agency**

```json
{
  "accountType": "agency",
  "email": "string",
  "displayName": "string",
  "agencyName": "string"
}
```

**Common required fields for all variants**

| Field       | Type   | Required |
| ----------- | ------ | -------- |
| accountType | enum   | Yes      |
| email       | string | Yes      |
| displayName | string | Yes      |

**Response `200 OK`**

Returns the updated `Session` object with the new role appended and set as `activeRoleIndex`.

**Errors**

| Status | Code                   | Reason                                       |
| ------ | ---------------------- | -------------------------------------------- |
| 400    | `invalid_account_type` | `accountType` is not one of the five allowed |
| 401    | `not_signed_in`        | No active session                            |

---

## Shared Types

### Session

```ts
type Session = {
  userId: string;
  email: string;
  displayName: string;
  roles: Role[];
  activeRoleIndex: number;
};
```

### Role

```ts
type Role = {
  accountType: 'personal' | 'business' | 'community' | 'organizer' | 'agency';
  accountId: string; // e.g. WD-B-a42741f6
  label: string; // Display name of the account
};
```

### AccountType enum

| Value     | ID Prefix | Example ID    |
| --------- | --------- | ------------- |
| personal  | WD-P      | WD-P-x8m9n2k5 |
| business  | WD-B      | WD-B-a42741f6 |
| community | WD-C      | WD-C-aee090b3 |
| organizer | WD-O      | WD-O-85203475 |
| agency    | WD-A      | WD-A-23dd8aa4 |

---

## Password Security Notes

- Passwords are **never stored in plaintext**.
- A random 16-byte salt is generated per user (`crypto.getRandomValues`).
- The stored hash is `SHA-256(salt || password)` encoded as Base64.
- Verification uses a **constant-time comparison** to prevent timing attacks.
- Fields stored: `password_salt_b64`, `password_hash_b64` (see `data-structure-auth.md`).
