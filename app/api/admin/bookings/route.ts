import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: { customer: true, package: true },
  });

  return NextResponse.json({
    rows: bookings.map((b) => ({
      id: b.publicId,
      customer: b.customer.name,
      packageName: b.package.title,
      date: b.travelDate.toISOString().slice(0, 10),
      travellers: b.travellers,
      amount: b.amount,
      status: b.status,
    })),
  });
}

export async function PATCH(req: Request) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await req.json()) as {
    bookingIds: string[];
    status: "pending" | "confirmed" | "cancelled";
  };

  if (!Array.isArray(body.bookingIds) || body.bookingIds.length === 0) {
    return NextResponse.json({ error: "bookingIds required" }, { status: 400 });
  }

  await prisma.booking.updateMany({
    where: { publicId: { in: body.bookingIds } },
    data: { status: body.status },
  });

  return NextResponse.json({ ok: true });
}
