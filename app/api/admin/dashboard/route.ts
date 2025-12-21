import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [totalBookings, revenueAgg, totalTours, messages] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.aggregate({ _sum: { amount: true } }),
    prisma.package.count(),
    prisma.auditEvent.count({ where: { action: "message" } }),
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

  const countryRevenueRows = await prisma.booking.findMany({
    select: {
      amount: true,
      package: { select: { country: true } },
    },
  });

  const countryTotals = new Map<string, number>();
  for (const row of countryRevenueRows) {
    const k = String(row.package.country);
    countryTotals.set(k, (countryTotals.get(k) ?? 0) + row.amount);
  }

  const breakdownTotal = Array.from(countryTotals.values()).reduce(
    (a, b) => a + b,
    0
  );

  const breakdownPercent =
    breakdownTotal === 0
      ? [{ name: "No revenue yet", value: 100 }]
      : Array.from(countryTotals.entries())
          .map(([name, value]) => ({
            name,
            value: Math.round((value / breakdownTotal) * 100),
          }))
          .sort((a, b) => b.value - a.value);

  return NextResponse.json({
    kpis: {
      totalBookings,
      revenue,
      messages,
      totalTours,
    },
    bookingTrends: buckets.map(({ name, bookings }) => ({ name, bookings })),
    revenueBreakdown: breakdownPercent,
  });
}
