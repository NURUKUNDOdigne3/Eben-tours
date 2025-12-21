import nodemailer from "nodemailer";

function requireEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is not set`);
  return v;
}

export async function sendEmail(input: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}) {
  const host = requireEnv("MAILEROO_SMTP_HOST");
  const port = Number(requireEnv("MAILEROO_SMTP_PORT"));
  const user = requireEnv("MAILEROO_SMTP_USER");
  const pass = requireEnv("MAILEROO_SMTP_PASS");
  const from = requireEnv("MAILEROO_FROM");

  if (!Number.isFinite(port) || port <= 0)
    throw new Error("MAILEROO_SMTP_PORT invalid");

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to: input.to,
    subject: input.subject,
    text: input.text,
    html: input.html,
  });
}
