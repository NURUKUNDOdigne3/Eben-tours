import { NextResponse } from "next/server";
import { sendBrandedEmail } from "@/app/lib/mailer";

function requireEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is not set`);
  return v;
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
  const adminTo = requireEnv("ADMIN_CONTACT_EMAIL");

  const body = await req.json().catch(() => null);

  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "")
    .trim()
    .toLowerCase();
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const message = String(body?.message ?? "").trim();

  if (!name)
    return NextResponse.json({ error: "name required" }, { status: 400 });
  if (!isEmail(email))
    return NextResponse.json({ error: "email invalid" }, { status: 400 });
  if (!message)
    return NextResponse.json({ error: "message required" }, { status: 400 });

  const submittedAt = new Date();
  const prettyDate = submittedAt.toISOString().replace("T", " ").slice(0, 19);

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone || "—");
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

  const subject = `New contact message from ${name}`;

  const replyLink = `mailto:${encodeURIComponent(
    email
  )}?subject=${encodeURIComponent("Re: Your message to Eben Tours")}`;

  const textBody =
    `New contact message (Eben Tours)\n\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Phone: ${phone || "-"}\n` +
    `Submitted: ${prettyDate}\n\n` +
    `Message:\n${message}`;

  const bodyHtml =
    `<div style="font-size:18px;font-weight:900;margin:0 0 10px 0;">New contact message</div>` +
    `<div style="font-size:14px;line-height:1.8;color:#334155;font-weight:600;">` +
    `<p style="margin:0 0 12px 0;">A visitor submitted the contact form. Details below:</p>` +
    `<div style="border:1px solid rgba(30,86,49,0.14);border-radius:14px;background:#f6f8f7;padding:14px 14px;margin:0 0 14px 0;">` +
    `<div style="font-size:12px;letter-spacing:1px;color:#1e5631;font-weight:900;">SENDER DETAILS</div>` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:10px;font-size:14px;color:#0f172a;">` +
    `<tr><td style="padding:6px 0;color:#475569;font-weight:700;">Name</td><td style="padding:6px 0;text-align:right;font-weight:800;">${safeName}</td></tr>` +
    `<tr><td style="padding:6px 0;color:#475569;font-weight:700;">Email</td><td style="padding:6px 0;text-align:right;font-weight:800;"><a href="mailto:${safeEmail}" style="color:#1e5631;text-decoration:none;font-weight:900;">${safeEmail}</a></td></tr>` +
    `<tr><td style="padding:6px 0;color:#475569;font-weight:700;">Phone</td><td style="padding:6px 0;text-align:right;font-weight:800;">${safePhone}</td></tr>` +
    `<tr><td style="padding:6px 0;color:#475569;font-weight:700;">Submitted</td><td style="padding:6px 0;text-align:right;font-weight:800;">${escapeHtml(
      prettyDate
    )}</td></tr>` +
    `</table>` +
    `</div>` +
    `<div style="border:1px solid rgba(15,23,42,0.08);border-radius:14px;background:#ffffff;padding:14px 14px;margin:0 0 14px 0;">` +
    `<div style="font-size:12px;letter-spacing:1px;color:#0f172a;font-weight:900;">MESSAGE</div>` +
    `<div style="margin-top:10px;font-size:14px;line-height:1.8;color:#0f172a;font-weight:600;">${safeMessage}</div>` +
    `</div>` +
    `<a href="${escapeHtml(
      replyLink
    )}" style="display:inline-block;text-decoration:none;background:#1e5631;color:#ffffff;padding:12px 16px;border-radius:12px;font-weight:900;font-size:13px;letter-spacing:0.3px;">Reply to ${safeName}</a>` +
    `</div>`;

  await sendBrandedEmail({
    to: adminTo,
    subject,
    title: "Contact Message",
    text: textBody,
    bodyHtml,
  });

  return NextResponse.json({ ok: true });
}
