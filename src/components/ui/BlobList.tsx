import React, { useEffect, useState } from "react";
import { listBlobs, getBlob, deleteBlob } from "@/lib/aes";

type Summary = {
  id: number;
  filename?: string | null;
  note?: string | null;
  created_at: string;
};

const BlobList: React.FC = () => {
  const [list, setList] = useState<Summary[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<any | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setMsg(null);
    try {
      const l = await listBlobs();
      setList(l);
    } catch (err: any) {
      setMsg("List error: " + (err.message ?? err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleView(id: number) {
    setSelected(null);
    try {
      const b = await getBlob(id);
      setSelected(b);
    } catch (err: any) {
      setMsg("Get error: " + (err.message ?? err));
    }
  }

  async function handleDelete(id: number) {
    if (!confirm(`Delete blob ${id}?`)) return;
    try {
      await deleteBlob(id);
      setMsg("Deleted " + id);
      load();
    } catch (err: any) {
      setMsg("Delete error: " + (err.message ?? err));
    }
  }

  return (
    <section style={{ padding: 12, maxWidth: 900 }}>
      <h3>Saved Blobs</h3>

      <div style={{ marginBottom: 8 }}>
        <button onClick={load} disabled={loading}>
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {msg && <div style={{ marginBottom: 8 }}>{msg}</div>}

      <ul>
        {list.map((r) => (
          <li key={r.id} style={{ marginBottom: 10 }}>
            <div>
              <strong>{r.filename ?? `(id ${r.id})`}</strong> — {r.note ?? ""}
            </div>
            <div style={{ marginTop: 6 }}>
              <button onClick={() => handleView(r.id)} style={{ marginRight: 8 }}>
                View
              </button>
              <button onClick={() => handleDelete(r.id)} style={{ marginRight: 8 }}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selected && (
        <div style={{ marginTop: 12 }}>
          <h4>Blob {selected.id}</h4>
          <div>Filename: {selected.filename}</div>
          <div>Note: {selected.note}</div>
          <div style={{ marginTop: 8 }}>
            <label style={{ display: "block", fontWeight: 600 }}>Ciphertext (base64)</label>
            <textarea readOnly rows={8} style={{ width: "100%" }} value={selected.ciphertext_b64} />
          </div>
        </div>
      )}
    </section>
  );
};

export default BlobList;
