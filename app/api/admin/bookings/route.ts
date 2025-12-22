import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/prisma";
import { sendBrandedEmail } from "@/app/lib/mailer";

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

  const targets = await prisma.booking.findMany({
    where: { publicId: { in: body.bookingIds } },
    include: { customer: true, package: true },
  });

  await prisma.booking.updateMany({
    where: { publicId: { in: body.bookingIds } },
    data: { status: body.status },
  });

  if (body.status === "confirmed" || body.status === "cancelled") {
    for (const b of targets) {
      const email = b.customer?.email;
      if (!email) continue;

      const subject =
        body.status === "confirmed"
          ? `Booking confirmed: ${b.package.title}`
          : `Booking update: ${b.package.title}`;

      const statusLine =
        body.status === "confirmed"
          ? "Your booking has been confirmed."
          : "Your booking has been rejected.";

      try {
        const prettyDate = b.travelDate.toISOString().slice(0, 10);
        await sendBrandedEmail({
          to: email,
          subject,
          title: "Booking Update",
          text:
            `Hi ${b.customer.name},\n\n` +
            `${statusLine}\n\n` +
            `Booking ID: ${b.publicId}\n` +
            `Package: ${b.package.title}\n` +
            `Date: ${prettyDate}\n` +
            `Travellers: ${b.travellers}\n\n` +
            `— Eben Tours`,
          bodyHtml:
            `<div style=\"font-size:18px;font-weight:900;margin:0 0 10px 0;\">${subject.replace(
              /</g,
              "&lt;"
            )}</div>` +
            `<div style=\"font-size:14px;line-height:1.8;color:#334155;font-weight:600;\">` +
            `<p style=\"margin:0 0 12px 0\">Hi ${String(
              b.customer.name
            ).replace(/</g, "&lt;")},</p>` +
            `<p style=\"margin:0 0 14px 0\">${statusLine.replace(
              /</g,
              "&lt;"
            )}</p>` +
            `<div style=\"border:1px solid rgba(30,86,49,0.14);border-radius:14px;background:#f6f8f7;padding:14px 14px;margin:0 0 14px 0;\">` +
            `<div style=\"font-size:12px;letter-spacing:1px;color:#1e5631;font-weight:900;\">BOOKING DETAILS</div>` +
            `<div style=\"margin-top:8px;font-size:13px;color:#0f172a;font-weight:800;\">Booking ID: ${String(
              b.publicId
            ).replace(/</g, "&lt;")}</div>` +
            `<div style=\"margin-top:6px;font-size:13px;color:#0f172a;font-weight:800;\">Package: ${String(
              b.package.title
            ).replace(/</g, "&lt;")}</div>` +
            `<div style=\"margin-top:6px;font-size:13px;color:#0f172a;font-weight:800;\">Date: ${prettyDate}</div>` +
            `<div style=\"margin-top:6px;font-size:13px;color:#0f172a;font-weight:800;\">Travellers: ${b.travellers}</div>` +
            `</div>` +
            `<p style=\"margin:0\">— Eben Tours</p>` +
            `</div>`,
        });
      } catch {
        // ignore per-recipient failures
      }
    }
  }

  return NextResponse.json({ ok: true });
}
