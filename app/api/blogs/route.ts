import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

function coerceStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.map((x) => String(x ?? "").trim()).filter(Boolean);
}

function deltaToParagraphs(delta: unknown): string[] {
  const ops = (delta as any)?.ops;
  if (!Array.isArray(ops)) return [];

  const text = ops
    .map((op: any) => (typeof op?.insert === "string" ? op.insert : ""))
    .join("");

  return text
    .split(/\n+/)
    .map((x) => x.trim())
    .filter(Boolean);
}

function excerptFromParagraphs(paragraphs: string[]): string {
  const joined = paragraphs.join(" ").trim();
  if (!joined) return "";
  if (joined.length <= 170) return joined;
  return `${joined.slice(0, 170).trim()}...`;
}

function toListRow(p: any) {
  const paragraphs = deltaToParagraphs(p.content);
  return {
    id: p.publicId,
    title: p.title,
    category: p.category,
    readTime: p.readTime,
    status: p.status,
    imageUrl: p.imageUrl,
    excerpt: excerptFromParagraphs(paragraphs),
    content: paragraphs,
    updatedAt: p.updatedAt.toISOString().slice(0, 10),
  };
}

export async function GET() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "published" },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json({ rows: posts.map(toListRow) });
}
