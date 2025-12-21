import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [totalBookings, revenueAgg, totalTours] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.aggregate({ _sum: { amount: true } }),
    prisma.package.count(),
  ]);

  const revenue = revenueAgg._sum.amount ?? 0;

  const since = new Date();
  since.setDate(since.getDate() - 6);
  since.setHours(0, 0, 0, 0);

  const recent = await prisma.booking.findMany({
    where: { createdAt: { gte: since } },
    select: { createdAt: true, amount: true },
  });

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const buckets = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(since);
    d.setDate(since.getDate() + i);
    return {
      key: d.toISOString().slice(0, 10),
      name: dayLabels[d.getDay()],
      bookings: 0,
      revenue: 0,
    };
  });

  for (const b of recent) {
    const key = b.createdAt.toISOString().slice(0, 10);
    const bucket = buckets.find((x) => x.key === key);
    if (!bucket) continue;
    bucket.bookings += 1;
    bucket.revenue += b.amount;
  }

  const packageRevenue = await prisma.booking.groupBy({
    by: ["packageId"],
    _sum: { amount: true },
  });

  const packages = await prisma.package.findMany({
    where: { id: { in: packageRevenue.map((p) => p.packageId) } },
    select: { id: true, title: true },
  });

  const breakdown = packageRevenue
    .map((p) => ({
      name: packages.find((x) => x.id === p.packageId)?.title ?? "Unknown",
      value: p._sum.amount ?? 0,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  const breakdownTotal = breakdown.reduce((a, b) => a + b.value, 0);
  const breakdownPercent = breakdown.map((b) => ({
    name: b.name,
    value:
      breakdownTotal === 0 ? 0 : Math.round((b.value / breakdownTotal) * 100),
  }));

  return NextResponse.json({
    kpis: {
      totalBookings,
      revenue,
      messages: 0,
      totalTours,
    },
    bookingTrends: buckets.map(({ name, bookings }) => ({ name, bookings })),
    revenueBreakdown: breakdownPercent,
  });
}
