"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUp, LinkIcon } from "lucide-react";

function clamp(num: number, min: number, max: number) {
  return Math.min(max, Math.max(min, num));
}

export default function BlogReaderEnhancements({
  title,
  content,
  backHref = "/blogs",
}: {
  title: string;
  content: string[];
  backHref?: string;
}) {
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState<null | "copied" | "failed">(null);

  const estimatedReadingTime = useMemo(() => {
    const words = content.join(" ").trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min read`;
  }, [content]);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const scrollHeight = doc.scrollHeight - window.innerHeight;
      const raw = scrollHeight <= 0 ? 1 : scrollTop / scrollHeight;
      setProgress(clamp(raw, 0, 1));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const progressPercent = Math.round(progress * 100);

  const copyLink = async () => {
    setCopied(null);

    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setCopied("copied");
    } catch {
      setCopied("failed");
    }

    window.setTimeout(() => setCopied(null), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="fixed left-0 top-[65px] z-60 h-1.5 w-full bg-black/5">
        <div
          aria-hidden="true"
          className="h-full rounded-r-full bg-gradient-to-r from-emerald-500 via-green-600 to-lime-500 shadow-[0_0_16px_rgba(16,185,129,0.45)] transition-[width] duration-100 ease-linear"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="fixed bottom-4 right-4 z-60 flex flex-col gap-3">
        <div className=" rounded-2xl border border-emerald-900/10 bg-white/80 p-3 shadow-[0_18px_60px_rgba(30,86,49,0.18)] backdrop-blur-xl">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex items-center justify-center rounded-xl border border-emerald-900/10 bg-white px-3 py-2 text-xs font-extrabold text-[var(--color-secondary)] transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
            >
              <LinkIcon />
            </button>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center justify-center rounded-xl border border-emerald-900/10 bg-white px-3 py-2 text-xs font-extrabold text-[var(--color-secondary)] transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
            >
              <ArrowUp />
            </button>
          </div>

          {copied === "copied" && (
            <div className="mt-2 text-xs font-semibold text-emerald-700">
              Link copied.
            </div>
          )}
          {copied === "failed" && (
            <div className="mt-2 text-xs font-semibold text-red-700">
              Could not copy link.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
