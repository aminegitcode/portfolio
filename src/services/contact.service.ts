import { supabase } from "@/lib/supabase";

type Contact = {
  name: string;
  email: string;
  message: string;
  subject: string | null;
};

export const sendContact = async (contact: Contact) => {
  const { error } = await supabase
    .from("contacts")
    .insert([contact]);

  if (error) throw error;
};