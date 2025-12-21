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
          {loading
            ? null
            : rows.map((post) => (
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
              ))}
        </div>
      </div>
    </>
  );
}
