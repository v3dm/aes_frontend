import React, { useState } from "react";
import { decrypt } from "@/lib/aes";

const DecryptForm: React.FC = () => {
  const [ciphertext, setCiphertext] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [plaintext, setPlaintext] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  async function handleDecrypt(e?: React.FormEvent) {
    e?.preventDefault();
    setPlaintext(null);
    setStatus(null);
    try {
      const res = await decrypt(ciphertext, password);
      setPlaintext(res.plaintext);
    } catch (err: any) {
      setStatus("Decrypt error: " + (err.message ?? err));
    }
  }

  return (
    <section style={{ padding: 12, maxWidth: 900 }}>
      <h3>Decrypt</h3>

      <form onSubmit={handleDecrypt}>
        <div style={{ marginBottom: 8 }}>
          <label style={{ display: "block", fontWeight: 600 }}>Ciphertext (base64)</label>
          <textarea
            rows={6}
            value={ciphertext}
            onChange={(e) => setCiphertext(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label style={{ display: "block", fontWeight: 600 }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <button type="submit">Decrypt</button>
        </div>
      </form>

      {plaintext !== null && (
        <div style={{ marginTop: 12 }}>
          <label style={{ display: "block", fontWeight: 600 }}>Plaintext</label>
          <textarea readOnly rows={6} value={plaintext} style={{ width: "100%" }} />
        </div>
      )}

      {status && <div style={{ marginTop: 10, color: "red" }}>{status}</div>}
    </section>
  );
};

export default DecryptForm;
