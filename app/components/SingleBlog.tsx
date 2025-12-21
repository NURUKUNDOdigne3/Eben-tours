import Link from "next/link";
import type { BlogPost } from "../blogs/blogsData";

export default function SingleBlog({ post }: { post: BlogPost }) {
  return (
    <article className="card">
      <img src={post.image || "/gorila.jpg"} alt={post.title} loading="lazy" />
      <div>
        <h3>{post.title}</h3>
        <p
          style={{
            color: "#666",
            fontSize: "14px",
            lineHeight: 1.5,
            margin: 0,
            flex: 1,
          }}
        >
          {post.excerpt}
        </p>
        <p className="meta">
          <i
            className="fas fa-clock"
            style={{ color: "var(--color-primary)" }}
          ></i>{" "}
          {post.readTime} <span style={{ color: "#ccc" }}>•</span>{" "}
          <i
            className="fas fa-shield-alt"
            style={{ color: "var(--color-primary)" }}
          ></i>{" "}
          {post.category}
        </p>
        <Link href={`/blogs/read/${post.id}`} className="read-more">
          Read Article
        </Link>
      </div>
    </article>
  );
}
