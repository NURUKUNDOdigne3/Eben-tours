import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/prisma";

type SettingsPayload = {
  name: string;
  role: string;
  email: string;
  orgName: string;
  orgPhone: string;
  notifyBookings: boolean;
  notifyMessages: boolean;
  notifyMarketing: boolean;
};

function toPayload(u: any): SettingsPayload {
  return {
    name: u.name ?? "",
    role: u.role ?? "admin",
    email: u.email ?? "",
    orgName: u.orgName ?? "Eben Tours",
    orgPhone: u.orgPhone ?? "+",
    notifyBookings: Boolean(u.notifyBookings),
    notifyMessages: Boolean(u.notifyMessages),
    notifyMarketing: Boolean(u.notifyMarketing),
  };
}

export async function GET() {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.upsert({
    where: { clerkId: userId },
    update: {},
    create: { clerkId: userId },
  });

  return NextResponse.json({ settings: toPayload(user) });
}

export async function PATCH(req: Request) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await req.json()) as Partial<SettingsPayload>;

  const data: any = {};

  if (typeof body.name === "string") data.name = body.name.trim();
  if (typeof body.role === "string") data.role = body.role.trim();
  if (typeof body.email === "string") data.email = body.email.trim();
  if (typeof body.orgName === "string") data.orgName = body.orgName.trim();
  if (typeof body.orgPhone === "string") data.orgPhone = body.orgPhone.trim();
  if (typeof body.notifyBookings === "boolean")
    data.notifyBookings = body.notifyBookings;
  if (typeof body.notifyMessages === "boolean")
    data.notifyMessages = body.notifyMessages;
  if (typeof body.notifyMarketing === "boolean")
    data.notifyMarketing = body.notifyMarketing;

  const updated = await prisma.user.upsert({
    where: { clerkId: userId },
    update: data,
    create: { clerkId: userId, ...data },
  });

  return NextResponse.json({ settings: toPayload(updated) });
}
