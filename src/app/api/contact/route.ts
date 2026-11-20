import { resend } from "@/lib/resend";
import { escapeHtml } from "@/lib/escapeHtml";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: process.env.CONTACT_EMAIL!,
    replyTo: email,
    subject: subject || `New message from ${name}`,
    html: `
      <p><strong>Name :</strong> ${escapeHtml(name)}</p>
      <p><strong>Email :</strong> ${escapeHtml(email)}</p>
      <p><strong>Message :</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
    `,
  });

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ success: true });
}
