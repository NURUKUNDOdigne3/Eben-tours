"use client";

import { useState } from "react";

export default function AdminTopbar() {
  const [query, setQuery] = useState("");

  return (
    <header className="sticky top-0 z-40 border-b border-emerald-900/10 bg-white/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 p-4 sm:p-6">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[var(--color-primary)] sm:flex">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 3H3v7h7V3Zm11 0h-7v7h7V3ZM10 14H3v7h7v-7Zm11 0h-7v7h7v-7Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <div className="relative w-full max-w-md">
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/40">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm9 16-3.1-3.1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search bookings, tours..."
              className="w-full rounded-xl border border-emerald-900/10 bg-white px-9 py-2.5 text-sm font-semibold text-[var(--color-secondary)] outline-none transition focus:ring-2 focus:ring-emerald-600/20"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-900/10 bg-white text-[var(--color-secondary)] hover:bg-emerald-50"
          >
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-extrabold text-white">
              3
            </span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2Zm6-6V11a6 6 0 1 0-12 0v5L4 18v1h16v-1l-2-2Z"
                fill="currentColor"
              />
            </svg>
          </button>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-900/10 bg-white text-[var(--color-secondary)] hover:bg-emerald-50"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 4h16v12H5.17L4 17.17V4Zm2 4h12v2H6V8Zm0 4h9v2H6v-2Z"
                fill="currentColor"
              />
            </svg>
          </button>

          <div className="ml-1 flex items-center gap-2 rounded-xl border border-emerald-900/10 bg-white px-2 py-1.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-700 text-xs font-extrabold text-white">
              FB
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-extrabold text-[var(--color-secondary)]">
                Fab
              </div>
              <div className="text-[10px] font-semibold text-[var(--muted)]">
                Manager
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
