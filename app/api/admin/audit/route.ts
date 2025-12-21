import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const entity = url.searchParams.get("entity") ?? "all";
  const action = url.searchParams.get("action") ?? "all";
  const q = (url.searchParams.get("q") ?? "").trim();

  const where: any = {};

  if (entity !== "all" && entity) where.entity = entity;
  if (action !== "all" && action) where.action = action;

  if (q) {
    where.OR = [
      { summary: { contains: q, mode: "insensitive" } },
      { actorName: { contains: q, mode: "insensitive" } },
    ];
  }

  const events = await prisma.auditEvent.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 200,
    select: {
      id: true,
      entity: true,
      action: true,
      summary: true,
      href: true,
      actorName: true,
      createdAt: true,
    },
  });

  return NextResponse.json({
    rows: events.map((e) => ({
      id: e.id,
      entity: e.entity,
      action: e.action,
      summary: e.summary,
      href: e.href,
      actor: e.actorName,
      createdAt: e.createdAt.toISOString(),
    })),
  });
}
