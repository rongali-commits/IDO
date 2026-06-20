import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();
  if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  const key = process.env.BUTTONDOWN_API_KEY;
  if (!key) return NextResponse.json({ error: "Newsletter provider is not configured" }, { status: 503 });
  const response = await fetch("https://api.buttondown.email/v1/subscribers", { method: "POST", headers: { Authorization: `Token ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ email_address: email }) });
  if (!response.ok && response.status !== 409) return NextResponse.json({ error: "Subscription failed" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
