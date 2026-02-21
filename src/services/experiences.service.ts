import { supabase } from "@/lib/supabase";

type Experience = {
  id: number;
  company: string;
  position: string;
  start_date: string | null;
  end_date: string | null; // null si poste actuel
  description: string | null;
  logo_url: string | null;
  location: string | null;
  created_at: string;
};

export const getExperiences = async () => {
  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .order("start_date", { ascending: false });

  if (error) throw error;
  return data as Experience[];
};