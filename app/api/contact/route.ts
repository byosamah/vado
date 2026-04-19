import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Body = {
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let data: Body;
  try {
    data = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const fullName = data.fullName?.trim() ?? "";
  const email = data.email?.trim() ?? "";
  const message = data.message?.trim() ?? "";

  if (!fullName || fullName.length < 2) {
    return NextResponse.json({ ok: false, error: "invalid_name" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  if (!message || message.length < 10) {
    return NextResponse.json({ ok: false, error: "invalid_message" }, { status: 400 });
  }

  // Hook up SMTP / Resend / CRM here before go-live.
  // Intentionally no silent success — failures should surface.
  console.info("[contact] new enquiry", {
    fullName,
    email,
    phone: data.phone?.trim() ?? null,
    messageLength: message.length,
  });

  return NextResponse.json({ ok: true });
}
