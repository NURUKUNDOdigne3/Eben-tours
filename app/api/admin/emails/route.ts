import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/prisma";
import { sendEmail } from "@/app/lib/mailer";

function isEmail(v: unknown) {
  if (typeof v !== "string") return false;
  const s = v.trim();
  if (!s) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function GET() {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const count = await prisma.customer.count({
    where: {
      email: { not: null },
    },
  });

  return NextResponse.json({ count });
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);

  const subject = String(body?.subject ?? "").trim();
  const message = String(body?.message ?? "").trim();

  if (!subject)
    return NextResponse.json({ error: "subject required" }, { status: 400 });
  if (!message)
    return NextResponse.json({ error: "message required" }, { status: 400 });

  const customers = await prisma.customer.findMany({
    select: { email: true, name: true },
    where: { email: { not: null } },
  });

  const targets = customers
    .map((c) => ({
      email: typeof c.email === "string" ? c.email.trim() : "",
      name: c.name,
    }))
    .filter((c) => isEmail(c.email));

  let sent = 0;
  let failed = 0;

  for (const t of targets) {
    try {
      await sendEmail({
        to: t.email,
        subject,
        text: `Hi ${t.name},\n\n${message}\n\n— Eben Tours`,
        html:
          `<div style=\"font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;line-height:1.6;color:#111\">` +
          `<p>Hi ${String(t.name).replace(/</g, "&lt;")},</p>` +
          `<p>${message.replace(/</g, "&lt;").replace(/\n/g, "<br/>")}</p>` +
          `<p style=\"margin-top:18px\">— Eben Tours</p>` +
          `</div>`,
      });
      sent += 1;
    } catch {
      failed += 1;
    }
  }

  return NextResponse.json({ ok: true, sent, failed });
}
