"use server";

import { prisma } from "@/app/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type BookingRow = {
  id: string;
  customer: string;
  packageName: string;
  date: string;
  travellers: number;
  amount: number;
  status: BookingStatus;
};

async function requireAuth() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  return userId;
}

export async function listBookings(): Promise<BookingRow[]> {
  await requireAuth();

  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: { customer: true, package: true },
  });

  return bookings.map((b) => ({
    id: b.publicId,
    customer: b.customer.name,
    packageName: b.package.title,
    date: b.travelDate.toISOString().slice(0, 10),
    travellers: b.travellers,
    amount: b.amount,
    status: b.status,
  }));
}

export async function updateBookingStatus(input: {
  bookingId: string;
  status: BookingStatus;
}) {
  await requireAuth();

  await prisma.booking.update({
    where: { publicId: input.bookingId },
    data: { status: input.status },
  });
}

export async function updateBookingDetails(input: {
  bookingId: string;
  date: string;
  travellers: number;
}) {
  await requireAuth();

  await prisma.booking.update({
    where: { publicId: input.bookingId },
    data: {
      travelDate: new Date(input.date),
      travellers: input.travellers,
    },
  });
}

export async function bulkUpdateBookingStatus(input: {
  bookingIds: string[];
  status: BookingStatus;
}) {
  await requireAuth();

  if (input.bookingIds.length === 0) return;

  await prisma.booking.updateMany({
    where: { publicId: { in: input.bookingIds } },
    data: { status: input.status },
  });
}
