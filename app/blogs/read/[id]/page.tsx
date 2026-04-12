import SectionHeader from "@/app/components/SectionHeader";
import BlogReaderEnhancements from "@/app/components/BlogReaderEnhancements";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import Image from "next/image";

type QuillOp = {
  insert?: string | { image?: string };
  attributes?: Record<string, string | number | boolean>;
};

type QuillDelta = {
  ops?: QuillOp[];
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(value: string) {
  return escapeHtml(value);
}

function sanitizeUrl(value: string, kind: "link" | "image") {
  const trimmed = value.trim();
  if (!trimmed) return "";

  if (trimmed.startsWith("/") || trimmed.startsWith("#")) {
    return trimmed;
  }

  if (kind === "image" && trimmed.startsWith("data:image/")) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed);
    const allowed =
      url.protocol === "http:" ||
      url.protocol === "https:" ||
      (kind === "link" &&
        (url.protocol === "mailto:" || url.protocol === "tel:"));

    return allowed ? url.toString() : "";
  } catch {
    return "";
  }
}

function getTextParagraphs(delta: QuillDelta) {
  const ops = Array.isArray(delta?.ops) ? delta.ops : [];
  const text = ops
    .map((op) => (typeof op.insert === "string" ? op.insert : ""))
    .join("");

  return text
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function renderInline(text: string, attributes?: QuillOp["attributes"]) {
  if (!text) return "";

  let html = escapeHtml(text);

  if (attributes?.link && typeof attributes.link === "string") {
    const safeHref = sanitizeUrl(attributes.link, "link");
    if (safeHref) {
      html = `<a href="${escapeAttr(
        safeHref
      )}" target="_blank" rel="noreferrer">${html}</a>`;
    }
  }
  if (attributes?.bold) html = `<strong>${html}</strong>`;
  if (attributes?.italic) html = `<em>${html}</em>`;
  if (attributes?.underline) html = `<u>${html}</u>`;
  if (attributes?.strike) html = `<s>${html}</s>`;

  return html;
}

function alignmentStyle(attributes?: QuillOp["attributes"]) {
  return attributes?.align && typeof attributes.align === "string"
    ? ` style="text-align:${escapeAttr(attributes.align)}"`
    : "";
}

function deltaToHtml(delta: QuillDelta) {
  const ops = Array.isArray(delta?.ops) ? delta.ops : [];
  const blocks: Array<
    | { kind: "block"; html: string; attributes?: QuillOp["attributes"] }
    | { kind: "image"; src: string }
  > = [];

  let lineHtml = "";

  const pushLine = (attributes?: QuillOp["attributes"]) => {
    if (!lineHtml.trim() && !attributes?.list && !attributes?.header) {
      return;
    }
    blocks.push({
      kind: "block",
      html: lineHtml.trim(),
      attributes,
    });
    lineHtml = "";
  };

  for (const op of ops) {
    if (typeof op.insert === "string") {
      const parts = op.insert.split("\n");

      parts.forEach((part, index) => {
        if (part) {
          lineHtml += renderInline(part, op.attributes);
        }

        if (index < parts.length - 1) {
          pushLine(op.attributes);
        }
      });
      continue;
    }

    if (op.insert?.image) {
      if (lineHtml.trim()) {
        pushLine();
      }

      blocks.push({
        kind: "image",
        src: op.insert.image,
      });
    }
  }

  if (lineHtml.trim()) {
    pushLine();
  }

  const htmlParts: string[] = [];
  let openList: null | "ol" | "ul" = null;

  const closeList = () => {
    if (openList) {
      htmlParts.push(`</${openList}>`);
      openList = null;
    }
  };

  for (const block of blocks) {
    if (block.kind === "image") {
      closeList();
      const safeSrc = sanitizeUrl(block.src, "image");
      if (safeSrc) {
        htmlParts.push(
          `<figure class="blog-figure"><img src="${escapeAttr(
            safeSrc
          )}" alt="" class="blog-inline-image" /></figure>`
        );
      }
      continue;
    }

    const attrs = block.attributes;
    const content = block.html || "&nbsp;";

    if (attrs?.list === "ordered" || attrs?.list === "bullet") {
      const listTag = attrs.list === "ordered" ? "ol" : "ul";
      if (openList !== listTag) {
        closeList();
        openList = listTag;
        htmlParts.push(`<${listTag} class="blog-list">`);
      }
      htmlParts.push(`<li>${content}</li>`);
      continue;
    }

    closeList();

    if (attrs?.header) {
      const level = Math.min(4, Math.max(1, Number(attrs.header) || 2));
      htmlParts.push(
        `<h${level} class="blog-heading"${alignmentStyle(attrs)}>${content}</h${level}>`
      );
      continue;
    }

    if (attrs?.blockquote) {
      htmlParts.push(
        `<blockquote class="blog-blockquote"${alignmentStyle(
          attrs
        )}>${content}</blockquote>`
      );
      continue;
    }

    if (attrs?.["code-block"]) {
      htmlParts.push(
        `<pre class="blog-code"><code>${content.replace(
          /<br\s*\/?>/g,
          "\n"
        )}</code></pre>`
      );
      continue;
    }

    htmlParts.push(
      `<div class="blog-paragraph"${alignmentStyle(attrs)}>${content}</div>`
    );
  }

  closeList();

  return htmlParts.join("");
}

export default async function BlogReadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "";
  const proto = h.get("x-forwarded-proto") ?? "http";
  const origin = host ? `${proto}://${host}` : "";

  const res = await fetch(`${origin}/api/blogs/${id}`, {
    cache: "no-store",
  });
  const data = await res.json().catch(() => null);
  const post = data?.post as
    | {
        id: string;
        title: string;
        category: string;
        readTime: string;
        imageUrl?: string | null;
        excerpt?: string;
        content: QuillDelta;
        updatedAt?: string;
      }
    | undefined;

  if (!res.ok || !post) notFound();

  const contentParagraphs = getTextParagraphs(post.content);
  const articleHtml = deltaToHtml(post.content);

  return (
    <>
      {/* <BlogReaderEnhancements
        title={post.title}
        content={contentParagraphs}
        backHref="/blogs"
      /> */}

      <SectionHeader
        title={post.title}
        note={post.category}
        description={post.excerpt || ""}
      />
      <div
        className="container"
        style={{ paddingBottom: "80px", position: "relative", marginTop: "80px" }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "10% 8% auto",
            height: "260px",
            background:
              "radial-gradient(circle, rgba(127,176,105,0.18) 0%, rgba(127,176,105,0) 70%)",
            filter: "blur(28px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            background: "#fff",
            borderRadius: "28px",
            overflow: "hidden",
            boxShadow: "0 28px 80px rgba(30,86,49,0.14)",
            border: "1px solid rgba(30,86,49,0.08)",
            position: "relative",
          }}
        >
          <div style={{ position: "relative" }}>
            <Image
              src={post.imageUrl || "/gorila.webp"}
              alt={post.title}
              width={1200}
              height={700}
              style={{ width: "100%", height: "460px", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(15,23,20,0.05) 0%, rgba(15,23,20,0.72) 100%)",
              }}
            />

          </div>

          <div
            style={{
              padding: "32px 28px 40px",
              background:
                "linear-gradient(180deg, rgba(248,251,247,0.92) 0%, #ffffff 22%)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                flexWrap: "wrap",
                marginBottom: "24px",
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
              className="blog-article"
              dangerouslySetInnerHTML={{ __html: articleHtml }}
            />
          </div>
        </div>

        <style>{`
          .blog-article {
            color: var(--color-secondary);
            font-size: 17px;
            line-height: 1.9;
          }

          .blog-article .blog-paragraph {
            margin: 0 0 1.2rem;
          }

          .blog-article .blog-heading {
            margin: 2.2rem 0 0.9rem;
            color: var(--color-secondary);
            font-family: var(--font-serif);
            line-height: 1.18;
          }

          .blog-article h1.blog-heading {
            font-size: clamp(2rem, 4vw, 2.7rem);
          }

          .blog-article h2.blog-heading {
            font-size: clamp(1.7rem, 3vw, 2.2rem);
          }

          .blog-article h3.blog-heading,
          .blog-article h4.blog-heading {
            font-size: clamp(1.35rem, 2.4vw, 1.7rem);
          }

          .blog-article a {
            color: var(--color-primary);
            text-decoration: underline;
            text-decoration-thickness: 1.5px;
            text-underline-offset: 3px;
          }

          .blog-article .blog-list {
            margin: 0 0 1.4rem;
            padding-left: 1.4rem;
          }

          .blog-article .blog-list li {
            margin-bottom: 0.65rem;
          }

          .blog-article .blog-blockquote {
            margin: 1.8rem 0;
            padding: 1.25rem 1.4rem;
            border-left: 4px solid rgba(30, 86, 49, 0.9);
            background: linear-gradient(135deg, rgba(30, 86, 49, 0.08), rgba(127, 176, 105, 0.08));
            border-radius: 0 18px 18px 0;
            font-style: italic;
          }

          .blog-article .blog-code {
            margin: 1.8rem 0;
            padding: 1rem 1.2rem;
            border-radius: 18px;
            background: #14211b;
            color: #f5f8f6;
            overflow-x: auto;
            font-size: 14px;
            line-height: 1.7;
          }

          .blog-article .blog-figure {
            margin: 2rem 0;
          }

          .blog-article .blog-inline-image {
            width: 100%;
            height: auto;
            display: block;
            border-radius: 22px;
            border: 1px solid rgba(30, 86, 49, 0.08);
            box-shadow: 0 22px 60px rgba(30, 86, 49, 0.14);
          }

          @media (max-width: 768px) {
            .blog-article {
              font-size: 16px;
            }
          }
        `}</style>
      </div>
    </>
  );
}
