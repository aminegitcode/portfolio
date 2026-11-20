import type { Contact } from "@/types";

// Le message est envoyé directement par mail via la route /api/contact (Resend)
export const sendContact = async (contact: Contact) => {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  });
  if (!res.ok) throw new Error("Échec de l'envoi du message");
};
