import { supabase } from "@/lib/supabase";

type Certificate = {
  id: number;
  title: string;
  issuer: string | null;
  issue_date: string | null;
  expiration_date: string | null;
  certificate_url: string | null;
  img_url: string | null;
  description: string | null;
  created_at: string;
};

export const getCertificates = async () => {
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .order("issue_date", { ascending: false });

  if (error) throw error;
  return data as Certificate[];
};