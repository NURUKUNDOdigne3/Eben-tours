"use client";

import SectionHeader from "../components/SectionHeader";
import SingleBlog from "../components/SingleBlog";
import { useEffect, useState } from "react";

type BlogListRow = {
  id: string;
  title: string;
  excerpt: string;
  imageUrl?: string | null;
  readTime: string;
  category: string;
  content: string[];
};

function BlogsGridSkeleton({ count = 6 }: { count?: number }) {
  return Array.from({ length: count }).map((_, i) => (
    <div
      key={i}
      className="animate-pulse"
      style={{
        background: "#fff",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 8px 20px rgba(30,86,49,0.08)",
        border: "1px solid rgba(30,86,49,0.08)",
      }}
    >
      <div style={{ height: "190px", background: "rgba(30,86,49,0.10)" }} />
      <div style={{ padding: "16px" }}>
        <div
          style={{
            height: "14px",
            width: "75%",
            background: "rgba(30,86,49,0.12)",
            borderRadius: "8px",
            marginBottom: "12px",
          }}
        />
        <div
          style={{
            height: "10px",
            width: "100%",
            background: "rgba(30,86,49,0.10)",
            borderRadius: "8px",
            marginBottom: "8px",
          }}
        />
        <div
          style={{
            height: "10px",
            width: "92%",
            background: "rgba(30,86,49,0.10)",
            borderRadius: "8px",
            marginBottom: "14px",
          }}
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            style={{
              height: "10px",
              width: "30%",
              background: "rgba(30,86,49,0.12)",
              borderRadius: "8px",
            }}
          />
          <div
            style={{
              height: "10px",
              width: "20%",
              background: "rgba(30,86,49,0.12)",
              borderRadius: "8px",
            }}
          />
        </div>
      </div>
    </div>
  ));
}

export default function BlogsPage() {
  const [rows, setRows] = useState<BlogListRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((data) => {
        if (!alive) return;
        setRows(Array.isArray(data?.rows) ? data.rows : []);
      })
      .catch(() => {
        if (!alive) return;
        setRows([]);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      <SectionHeader
        title="Latest from our Journal"
        note="Our Journal"
        description="Stories, tips, and insights from the trail. Discover travel wisdom and conservation practices."
      />

      <div className="container">
        <div className="grid grid-cols-3 gap-4">
          {loading ? (
            <BlogsGridSkeleton />
          ) : rows.length === 0 ? (
            <div
              className="col-span-3"
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "28px",
                border: "1px solid rgba(30,86,49,0.10)",
                boxShadow: "0 10px 40px rgba(30,86,49,0.06)",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  color: "var(--color-secondary)",
                  fontSize: "18px",
                  fontWeight: 700,
                }}
              >
                No posts yet
              </h3>
              <p style={{ margin: "10px 0 0", color: "var(--muted)" }}>
                There are no published blog posts in the database.
              </p>
            </div>
          ) : (
            rows.map((post) => (
              <SingleBlog
                key={post.id}
                post={{
                  id: post.id,
                  title: post.title,
                  excerpt: post.excerpt,
                  image: post.imageUrl || "/gorila.webp",
                  readTime: post.readTime,
                  category: post.category,
                  content: post.content,
                }}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
