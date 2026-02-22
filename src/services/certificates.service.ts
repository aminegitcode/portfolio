import { supabase } from "@/lib/supabase";
import type { Certificate } from "@/types";

export const getCertificates = async () => {
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .order("issue_date", { ascending: false });

  if (error) throw error;
  return data as Certificate[];
};