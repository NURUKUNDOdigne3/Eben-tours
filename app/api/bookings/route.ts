import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { sendBrandedEmail } from "@/app/lib/mailer";

function newPublicId(prefix: string) {
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${rand}`;
}

function isEmail(v: unknown) {
  if (typeof v !== "string") return false;
  const s = v.trim();
  if (!s) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  const packagePublicId = String(body?.packageId ?? "").trim();
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "")
    .trim()
    .toLowerCase();
  const phone = typeof body?.phone === "string" ? body.phone.trim() : null;

  const travellers = Number(body?.travellers);
  const dateRaw = String(body?.date ?? "").trim();

  if (!packagePublicId)
    return NextResponse.json({ error: "packageId required" }, { status: 400 });
  if (!name)
    return NextResponse.json({ error: "name required" }, { status: 400 });
  if (!isEmail(email))
    return NextResponse.json({ error: "email invalid" }, { status: 400 });
  if (!Number.isFinite(travellers) || travellers <= 0)
    return NextResponse.json({ error: "travellers invalid" }, { status: 400 });

  const travelDate = new Date(dateRaw);
  if (!dateRaw || Number.isNaN(travelDate.getTime()))
    return NextResponse.json({ error: "date invalid" }, { status: 400 });

  const pkg = await prisma.package.findFirst({
    where: { publicId: packagePublicId, status: "active" },
    select: { id: true, price: true, title: true, location: true },
  });

  if (!pkg)
    return NextResponse.json({ error: "Package not found" }, { status: 404 });

  const amount = Math.round(Number(pkg.price) * travellers);

  const existingCustomer = await prisma.customer.findFirst({
    where: { email },
    select: { id: true, publicId: true },
  });

  const customer = existingCustomer
    ? await prisma.customer.update({
        where: { id: existingCustomer.id },
        data: {
          name,
          email,
          phone,
          lastBooking: new Date(),
        },
        select: { id: true, publicId: true },
      })
    : await prisma.customer.create({
        data: {
          publicId: newPublicId("CST"),
          name,
          email,
          phone,
          lastBooking: new Date(),
        },
        select: { id: true, publicId: true },
      });

  const booking = await prisma.booking.create({
    data: {
      publicId: newPublicId("BKG"),
      travelDate,
      travellers,
      amount,
      status: "pending",
      customerId: customer.id,
      packageId: pkg.id,
    },
    select: { publicId: true, createdAt: true },
  });

  let emailSent = false;
  try {
    const prettyDate = travelDate.toISOString().slice(0, 10);
    const safeName = escapeHtml(name);
    const safePackageTitle = escapeHtml(pkg.title);
    const safeLocation = escapeHtml(pkg.location);

    const siteUrl = (
      process.env.NEXT_PUBLIC_SITE_URL ??
      process.env.SITE_URL ??
      ""
    ).trim();
    const ctaHref = siteUrl ? `${siteUrl.replace(/\/$/, "")}/packages` : "";

    const textBody =
      `Hi ${name},\n\n` +
      `We received your booking request and our team will get back to you shortly.\n\n` +
      `Booking details:\n` +
      `- Booking ID: ${booking.publicId}\n` +
      `- Package: ${pkg.title} (${pkg.location})\n` +
      `- Travel date: ${prettyDate}\n` +
      `- Travellers: ${travellers}\n` +
      `- Total: $${amount}\n\n` +
      `Thank you,\n` +
      `Eben Tours`;

    const subject = "We received your booking request";

    const bodyHtml =
      `<div style="font-size:18px;font-weight:900;margin:0 0 10px 0;">Booking received</div>` +
      `<div style="font-size:14px;line-height:1.8;color:#334155;font-weight:600;">` +
      `<p style="margin:0 0 12px 0;">Hi ${safeName}, we’ve received your booking request. Our team will review it and contact you shortly.</p>` +
      `<div style="border:1px solid rgba(30,86,49,0.14);border-radius:14px;background:#f6f8f7;padding:14px 14px;margin:0 0 14px 0;">` +
      `<div style="font-size:12px;letter-spacing:1px;color:#1e5631;font-weight:900;">BOOKING SUMMARY</div>` +
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:10px;font-size:14px;color:#0f172a;">` +
      `<tr><td style="padding:6px 0;color:#475569;font-weight:700;">Booking ID</td><td style="padding:6px 0;text-align:right;font-weight:900;color:#0f172a;">${escapeHtml(
        booking.publicId
      )}</td></tr>` +
      `<tr><td style="padding:6px 0;color:#475569;font-weight:700;">Package</td><td style="padding:6px 0;text-align:right;font-weight:800;">${safePackageTitle}</td></tr>` +
      `<tr><td style="padding:6px 0;color:#475569;font-weight:700;">Destination</td><td style="padding:6px 0;text-align:right;font-weight:800;">${safeLocation}</td></tr>` +
      `<tr><td style="padding:6px 0;color:#475569;font-weight:700;">Travel date</td><td style="padding:6px 0;text-align:right;font-weight:800;">${escapeHtml(
        prettyDate
      )}</td></tr>` +
      `<tr><td style="padding:6px 0;color:#475569;font-weight:700;">Travellers</td><td style="padding:6px 0;text-align:right;font-weight:800;">${travellers}</td></tr>` +
      `<tr><td style="padding:10px 0 2px 0;color:#1e5631;font-weight:900;">Total</td><td style="padding:10px 0 2px 0;text-align:right;font-size:16px;font-weight:900;color:#1e5631;">$${amount}</td></tr>` +
      `</table>` +
      `</div>` +
      (ctaHref
        ? `<a href="${escapeHtml(
            ctaHref
          )}" style="display:inline-block;text-decoration:none;background:#1e5631;color:#ffffff;padding:12px 16px;border-radius:12px;font-weight:900;font-size:13px;letter-spacing:0.3px;">Browse more packages</a>`
        : "") +
      `</div>`;

    await sendBrandedEmail({
      to: email,
      subject,
      title: "Booking Confirmation",
      text: textBody,
      bodyHtml,
    });
    emailSent = true;
  } catch {
    emailSent = false;
  }

  return NextResponse.json({
    ok: true,
    booking: {
      id: booking.publicId,
      status: "pending",
      createdAt: booking.createdAt.toISOString(),
    },
    customer: {
      id: customer.publicId,
    },
    emailSent,
  });
}
