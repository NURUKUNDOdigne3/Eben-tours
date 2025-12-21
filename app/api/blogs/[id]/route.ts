import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

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

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const p = await prisma.blogPost.findUnique({
    where: { publicId: id },
  });

  if (!p || p.status !== "published")
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  const paragraphs = deltaToParagraphs(p.content);

  return NextResponse.json({
    post: {
      id: p.publicId,
      title: p.title,
      category: p.category,
      readTime: p.readTime,
      imageUrl: p.imageUrl,
      excerpt: excerptFromParagraphs(paragraphs),
      content: paragraphs,
      updatedAt: p.updatedAt.toISOString().slice(0, 10),
    },
  });
}
