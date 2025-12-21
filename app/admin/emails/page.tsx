"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export default function AdminEmailsPage() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [subject, setSubject] = useState("New update from Eben Tours");
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState<null | string>(null);

  const fetchCount = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get<{ count: number }>("/api/admin/emails");
      setCount(typeof res.data?.count === "number" ? res.data.count : 0);
    } catch {
      setCount(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchCount();
  }, [fetchCount]);

  const send = useCallback(async () => {
    if (sending) return;
    if (!subject.trim()) return;
    if (!message.trim()) return;

    setSending(true);
    try {
      const res = await axios.post("/api/admin/emails", {
        subject: subject.trim(),
        message: message.trim(),
      });

      const sent = Number(res.data?.sent ?? 0);
      const failed = Number(res.data?.failed ?? 0);

      setToast(`Sent: ${sent} • Failed: ${failed}`);
      window.setTimeout(() => setToast(null), 2500);
    } catch (err: any) {
      setToast(String(err?.response?.data?.error || "Failed to send"));
      window.setTimeout(() => setToast(null), 2500);
    } finally {
      setSending(false);
    }
  }, [message, sending, subject]);

  return (
    <div className="p-6">
      <div className="mb-4">
        <div className="text-lg font-extrabold text-[var(--color-secondary)]">
          Emails
        </div>
        <div className="mt-1 text-sm font-semibold text-[var(--muted)]">
          Send announcements to customers (e.g. new packages). Booking status
          emails are sent automatically.
        </div>
      </div>

      {toast ? (
        <div className="mb-4 rounded-xl border border-emerald-900/10 bg-white px-4 py-3 text-sm font-semibold text-[var(--color-secondary)]">
          {toast}
        </div>
      ) : null}

      <div className="rounded-2xl border border-emerald-900/10 bg-white p-4">
        <div className="text-xs font-extrabold text-[var(--muted)]">
          BROADCAST
        </div>

        <div className="mt-2 text-sm font-semibold text-[var(--muted)]">
          Recipients: {loading ? "Loading..." : count === null ? "—" : count}
        </div>

        <div className="mt-3 grid grid-cols-1! gap-3!">
          <label className="grid grid-cols-1! gap-1!">
            <span className="text-xs font-extrabold text-[var(--muted)]">
              Subject
            </span>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-xl border border-emerald-900/10 bg-white px-3 py-2 text-sm font-semibold text-[var(--color-secondary)]"
            />
          </label>

          <label className="grid grid-cols-1! gap-1!">
            <span className="text-xs font-extrabold text-[var(--muted)]">
              Message
            </span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={8}
              placeholder="Write your announcement..."
              className="w-full rounded-xl border border-emerald-900/10 bg-white px-3 py-2 text-sm font-semibold text-[var(--color-secondary)]"
            />
          </label>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={fetchCount}
              disabled={loading || sending}
              className="rounded-xl border border-emerald-900/10 bg-white px-3 py-2 text-xs font-extrabold text-[var(--color-secondary)] hover:bg-emerald-50"
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={send}
              disabled={sending || loading}
              className="rounded-xl bg-emerald-700 px-3 py-2 text-xs font-extrabold text-white hover:bg-emerald-800"
            >
              {sending ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
