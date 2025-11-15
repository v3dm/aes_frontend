import React, { useState } from "react";
import { encrypt, save } from "@/lib/aes";

const EncryptForm: React.FC = () => {
  const [plaintext, setPlaintext] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cipher, setCipher] = useState<string | null>(null);
  const [filename, setFilename] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  // NEW: auto-save after encrypt
  async function handleEncrypt(e?: React.FormEvent) {
    e?.preventDefault();
    setStatus(null);
    setCipher(null);

    if (!plaintext) {
      setStatus("Please enter plaintext to encrypt.");
      return;
    }
    if (!password) {
      setStatus("Please enter a password for encryption.");
      return;
    }

    setProcessing(true);
    try {
      setStatus("Encrypting...");
      const enc = await encrypt(plaintext, password);
      setCipher(enc.ciphertext_b64);
      setStatus("Encrypted — now saving...");

      // Auto-save immediately after encryption
      try {
        const saved = await save(enc.ciphertext_b64, filename || undefined);
        setStatus(`Saved successfully (id=${saved.id})`);
      } catch (saveErr: any) {
        console.error("Auto-save error:", saveErr);
        setStatus("Encrypted but save failed: " + (saveErr.message ?? saveErr));
      }
    } catch (err: any) {
      console.error("Encrypt error:", err);
      setStatus("Encrypt failed: " + (err.message ?? err));
    } finally {
      setProcessing(false);
    }
  }

  // Optional manual save (keeps UI fallback)
  async function handleSave() {
    if (!cipher) {
      setStatus("No ciphertext to save");
      return;
    }
    setProcessing(true);
    setStatus("Saving...");
    try {
      const r = await save(cipher, filename || undefined);
      setStatus(`Saved (id=${r.id})`);
    } catch (err: any) {
      console.error("Save error:", err);
      setStatus("Save failed: " + (err.message ?? err));
    } finally {
      setProcessing(false);
    }
  }

  return (
    <section style={{ padding: 12, maxWidth: 900 }}>
      <h3>Encrypt</h3>

      <form onSubmit={handleEncrypt}>
        <div style={{ marginBottom: 8 }}>
          <label style={{ display: "block", fontWeight: 600 }}>Plaintext</label>
          <textarea
            rows={4}
            value={plaintext}
            onChange={(e) => setPlaintext(e.target.value)}
            style={{ width: "100%" }}
            disabled={processing}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label style={{ display: "block", fontWeight: 600 }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%" }}
            disabled={processing}
          />
        </div>

        <div>
          <button type="submit" disabled={processing}>
            {processing ? "Working..." : "Encrypt & Save"}
          </button>
        </div>
      </form>

      {cipher && (
        <div style={{ marginTop: 12 }}>
          <label style={{ display: "block", fontWeight: 600 }}>Ciphertext (base64)</label>
          <textarea readOnly rows={6} value={cipher} style={{ width: "100%" }} />

          <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
            <input
              placeholder="filename (optional)"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
            />
            <button onClick={handleSave} disabled={!cipher || processing}>
              Save (manual)
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(cipher).catch(() => {});
              }}
            >
              Copy
            </button>
          </div>
        </div>
      )}

      {status && <div style={{ marginTop: 10 }}>{status}</div>}
    </section>
  );
};

export default EncryptForm;
