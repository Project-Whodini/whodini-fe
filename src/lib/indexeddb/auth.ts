export type AccountType = "personal" | "business" | "community" | "organizer" | "agency";

export type LocalUser = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  accountTypes: AccountType[];
};

type StoredUser = LocalUser & {
  passwordSaltB64: string;
  passwordHashB64: string;
};

const DB_NAME = "whodini_indexeddb_v1";
const DB_VERSION = 1;
const USERS_STORE = "users";

function toLocalUser(user: StoredUser): LocalUser {
  return {
    id: user.id,
    createdAt: user.createdAt,
    name: user.name,
    email: user.email,
    accountTypes: user.accountTypes,
  };
}

function requireBrowser(): void {
  if (typeof window === "undefined" || typeof indexedDB === "undefined") {
    throw new Error("IndexedDB is not available in this environment");
  }
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function createId(prefix: string): string {
  try {
    return `${prefix}_${crypto.randomUUID()}`;
  } catch {
    return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
  }
}

function toBase64(bytes: Uint8Array): string {
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s);
}

function fromBase64(value: string): Uint8Array {
  const s = atob(value);
  const bytes = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) bytes[i] = s.charCodeAt(i);
  return bytes;
}

async function sha256(bytes: Uint8Array): Promise<Uint8Array> {
  const data = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(data).set(bytes);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return new Uint8Array(hash);
}

async function hashPassword(password: string): Promise<{
  passwordSaltB64: string;
  passwordHashB64: string;
}> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const pwBytes = new TextEncoder().encode(password);
  const combined = new Uint8Array(salt.length + pwBytes.length);
  combined.set(salt, 0);
  combined.set(pwBytes, salt.length);
  const digest = await sha256(combined);
  return {
    passwordSaltB64: toBase64(salt),
    passwordHashB64: toBase64(digest),
  };
}

async function verifyPassword(input: {
  password: string;
  passwordSaltB64: string;
  passwordHashB64: string;
}): Promise<boolean> {
  const salt = fromBase64(input.passwordSaltB64);
  const pwBytes = new TextEncoder().encode(input.password);
  const combined = new Uint8Array(salt.length + pwBytes.length);
  combined.set(salt, 0);
  combined.set(pwBytes, salt.length);
  const digest = await sha256(combined);
  const computed = toBase64(digest);
  if (computed.length !== input.passwordHashB64.length) return false;
  let diff = 0;
  for (let i = 0; i < computed.length; i++) diff |= computed.charCodeAt(i) ^ input.passwordHashB64.charCodeAt(i);
  return diff === 0;
}

function requestToPromise<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error("IndexedDB request failed"));
  });
}

function openDb(): Promise<IDBDatabase> {
  requireBrowser();
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(USERS_STORE)) {
        const store = db.createObjectStore(USERS_STORE, { keyPath: "id" });
        store.createIndex("email", "email", { unique: true });
        store.createIndex("createdAt", "createdAt", { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error("Failed to open IndexedDB"));
  });
}

export async function getUserByEmail(email: string): Promise<LocalUser | null> {
  const db = await openDb();
  try {
    const tx = db.transaction([USERS_STORE], "readonly");
    const store = tx.objectStore(USERS_STORE);
    const idx = store.index("email");
    const user = await requestToPromise<StoredUser | undefined>(idx.get(normalizeEmail(email)));
    if (!user) return null;
    return toLocalUser(user);
  } finally {
    db.close();
  }
}

export async function signInWithEmailPassword(input: {
  email: string;
  password: string;
}): Promise<LocalUser> {
  const email = normalizeEmail(input.email);
  const db = await openDb();
  try {
    const tx = db.transaction([USERS_STORE], "readonly");
    const store = tx.objectStore(USERS_STORE);
    const idx = store.index("email");
    const user = await requestToPromise<StoredUser | undefined>(idx.get(email));
    if (!user) throw new Error("Invalid email or password");
    const ok = await verifyPassword({
      password: input.password,
      passwordSaltB64: user.passwordSaltB64,
      passwordHashB64: user.passwordHashB64,
    });
    if (!ok) throw new Error("Invalid email or password");
    return toLocalUser(user);
  } finally {
    db.close();
  }
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
  accountTypes: AccountType[];
}): Promise<LocalUser> {
  const name = input.name.trim();
  const email = normalizeEmail(input.email);
  if (!name) throw new Error("Name is required");
  if (!email) throw new Error("Email is required");
  if (input.password.trim().length < 6) throw new Error("Password must be at least 6 characters");
  if (!input.accountTypes.includes("personal")) throw new Error("Personal account type is required");

  const db = await openDb();
  try {
    const tx = db.transaction([USERS_STORE], "readwrite");
    const store = tx.objectStore(USERS_STORE);
    const idx = store.index("email");

    const existing = await requestToPromise<StoredUser | undefined>(idx.get(email));
    if (existing) throw new Error("Email is already registered");

    const now = new Date().toISOString();
    const { passwordHashB64, passwordSaltB64 } = await hashPassword(input.password);

    const user: StoredUser = {
      id: createId("user"),
      createdAt: now,
      name,
      email,
      accountTypes: Array.from(new Set(input.accountTypes)),
      passwordHashB64,
      passwordSaltB64,
    };

    await requestToPromise(store.add(user));

    return toLocalUser(user);
  } finally {
    db.close();
  }
}
