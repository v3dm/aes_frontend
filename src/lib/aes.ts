// src/lib/aes.ts

export type EncryptResp = { ciphertext_b64: string };
export type DecryptResp = { plaintext: string };
export type SaveResp = { id: number; created_at: string };
export type BlobSummary = {
  id: number;
  filename?: string | null;
  note?: string | null;
  created_at: string;
};
export type BlobFull = {
  id: number;
  ciphertext_b64: string;
  filename?: string | null;
  note?: string | null;
  owner?: string | null;
  algorithm?: string | null;
  kdf?: string | null;
  created_at: string;
};

// ⭐ NEW: Base API URL (local or Render)
const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8000"; // fallback for local dev

async function handleRes<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  return (await res.json()) as T;
}

export async function encrypt(
  plaintext: string,
  password: string
): Promise<EncryptResp> {
  const res = await fetch(`${API_BASE}/api/encrypt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plaintext, password }),
  });
  return handleRes<EncryptResp>(res);
}

export async function decrypt(
  ciphertext_b64: string,
  password: string
): Promise<DecryptResp> {
  const res = await fetch(`${API_BASE}/api/decrypt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ciphertext_b64, password }),
  });
  return handleRes<DecryptResp>(res);
}

export async function save(
  ciphertext_b64: string,
  filename?: string,
  note?: string,
  owner?: string
): Promise<SaveResp> {
  const res = await fetch(`${API_BASE}/api/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ciphertext_b64, filename, note, owner }),
  });
  return handleRes<SaveResp>(res);
}

export async function listBlobs(
  limit = 50
): Promise<BlobSummary[]> {
  const res = await fetch(`${API_BASE}/api/blobs?limit=${limit}`);
  return handleRes<BlobSummary[]>(res);
}

export async function getBlob(id: number): Promise<BlobFull> {
  const res = await fetch(`${API_BASE}/api/blob/${id}`);
  return handleRes<BlobFull>(res);
}

export async function deleteBlob(
  id: number
): Promise<{ deleted: boolean }> {
  const res = await fetch(`${API_BASE}/api/blob/${id}`, {
    method: "DELETE",
  });
  return handleRes<{ deleted: boolean }>(res);
}
