import SectionHeader from "@/app/components/SectionHeader";
import BlogReaderEnhancements from "@/app/components/BlogReaderEnhancements";
import { blogPosts } from "../../blogsData";
import { notFound } from "next/navigation";

export default async function BlogReadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return (
    <>
      <BlogReaderEnhancements
        title={post.title}
        content={post.content}
        backHref="/blogs"
      />

      <SectionHeader
        title={post.title}
        note={post.category}
        description={post.excerpt}
      />

      <div className="container" style={{ paddingBottom: "60px" }}>
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            background: "#fff",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(30,86,49,0.12)",
            border: "1px solid rgba(30,86,49,0.08)",
          }}
        >
          <div style={{ position: "relative" }}>
            <img
              src={post.image}
              alt={post.title}
              style={{ width: "100%", height: "420px", objectFit: "cover" }}
            />
          </div>

          <div style={{ padding: "28px" }}>
            <div
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                flexWrap: "wrap",
                marginBottom: "18px",
                color: "var(--muted)",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              <span>
                <i
                  className="fas fa-clock"
                  style={{ color: "var(--color-primary)", marginRight: "6px" }}
                />
                {post.readTime}
              </span>
              <span style={{ color: "#ccc" }}>•</span>
              <span>
                <i
                  className="fas fa-tag"
                  style={{ color: "var(--color-primary)", marginRight: "6px" }}
                />
                {post.category}
              </span>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              {post.content.map((paragraph, idx) => (
                <p
                  key={idx}
                  style={{
                    margin: 0,
                    color: "var(--color-secondary)",
                    lineHeight: 1.9,
                    fontSize: "16px",
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
