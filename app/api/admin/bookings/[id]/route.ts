import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const body = (await req.json()) as
    | { status: "pending" | "confirmed" | "cancelled" }
    | { date: string; travellers: number };

  if ("status" in body) {
    await prisma.booking.update({
      where: { publicId: id },
      data: { status: body.status },
    });

    return NextResponse.json({ ok: true });
  }

  if (typeof body.date !== "string" || !Number.isFinite(body.travellers)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  await prisma.booking.update({
    where: { publicId: id },
    data: {
      travelDate: new Date(body.date),
      travellers: body.travellers,
    },
  });

  return NextResponse.json({ ok: true });
}
