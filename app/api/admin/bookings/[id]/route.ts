import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/prisma";
import { sendBrandedEmail } from "@/app/lib/mailer";

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
    const updated = await prisma.booking.update({
      where: { publicId: id },
      data: { status: body.status },
      include: { customer: true, package: true },
    });

    const customerEmail = updated.customer?.email;
    if (customerEmail) {
      const status = updated.status;
      const subject =
        status === "confirmed"
          ? `Booking confirmed: ${updated.package.title}`
          : status === "cancelled"
          ? `Booking update: ${updated.package.title}`
          : null;

      if (subject) {
        const statusLine =
          status === "confirmed"
            ? "Your booking has been confirmed."
            : "Your booking has been rejected.";

        const prettyDate = updated.travelDate.toISOString().slice(0, 10);

        await sendBrandedEmail({
          to: customerEmail,
          subject,
          title: "Booking Update",
          text:
            `Hi ${updated.customer.name},\n\n` +
            `${statusLine}\n\n` +
            `Booking ID: ${updated.publicId}\n` +
            `Package: ${updated.package.title}\n` +
            `Date: ${prettyDate}\n` +
            `Travellers: ${updated.travellers}\n\n` +
            `— Eben Tours`,
          bodyHtml:
            `<div style=\"font-size:18px;font-weight:900;margin:0 0 10px 0;\">${subject.replace(
              /</g,
              "&lt;"
            )}</div>` +
            `<div style=\"font-size:14px;line-height:1.8;color:#334155;font-weight:600;\">` +
            `<p style=\"margin:0 0 12px 0\">Hi ${String(
              updated.customer.name
            ).replace(/</g, "&lt;")},</p>` +
            `<p style=\"margin:0 0 14px 0\">${statusLine.replace(
              /</g,
              "&lt;"
            )}</p>` +
            `<div style=\"border:1px solid rgba(30,86,49,0.14);border-radius:14px;background:#f6f8f7;padding:14px 14px;margin:0 0 14px 0;\">` +
            `<div style=\"font-size:12px;letter-spacing:1px;color:#1e5631;font-weight:900;\">BOOKING DETAILS</div>` +
            `<div style=\"margin-top:8px;font-size:13px;color:#0f172a;font-weight:800;\">Booking ID: ${String(
              updated.publicId
            ).replace(/</g, "&lt;")}</div>` +
            `<div style=\"margin-top:6px;font-size:13px;color:#0f172a;font-weight:800;\">Package: ${String(
              updated.package.title
            ).replace(/</g, "&lt;")}</div>` +
            `<div style=\"margin-top:6px;font-size:13px;color:#0f172a;font-weight:800;\">Date: ${prettyDate}</div>` +
            `<div style=\"margin-top:6px;font-size:13px;color:#0f172a;font-weight:800;\">Travellers: ${updated.travellers}</div>` +
            `</div>` +
            `<p style=\"margin:0\">— Eben Tours</p>` +
            `</div>`,
        });
      }
    }

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
