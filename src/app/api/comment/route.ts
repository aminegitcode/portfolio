import { resend } from "@/lib/resend";
import { escapeHtml } from "@/lib/escapeHtml";
import { NextResponse } from "next/server";

// Reçoit un commentaire et te l'envoie par mail avec le bloc JSON prêt à coller
// dans src/data/comments.json (modération manuelle).
export async function POST(req: Request) {
  const { name, message } = await req.json();

  if (!name?.trim() || !message?.trim() || name.length > 80 || message.length > 1000) {
    return NextResponse.json({ error: "Commentaire invalide" }, { status: 400 });
  }

  const entry = {
    id: Date.now(),
    name: name.trim(),
    message: message.trim(),
    created_at: new Date().toISOString(),
    is_pinned: false,
  };

  const { error } = await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: process.env.CONTACT_EMAIL!,
    subject: `Nouveau commentaire de ${entry.name}`,
    html: `
      <p><strong>Nom :</strong> ${escapeHtml(entry.name)}</p>
      <p><strong>Message :</strong><br/>${escapeHtml(entry.message).replace(/\n/g, "<br/>")}</p>
      <hr/>
      <p>Pour le publier, ajoute ceci dans <code>src/data/comments.json</code> :</p>
      <pre>${escapeHtml(JSON.stringify(entry, null, 2))},</pre>
    `,
  });

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ success: true });
}
