import { supabase } from "@/lib/supabase";
import type { Contact } from "@/types";

export const sendContact = async (contact: Contact) => {
  const { error } = await supabase
    .from("contacts")
    .insert([contact]);

  if (error) throw error;

  await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  });
};