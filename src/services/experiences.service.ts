import { supabase } from "@/lib/supabase";
import type { Experience } from "@/types";

export const getExperiences = async () => {
  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .order("start_date", { ascending: false });

  if (error) throw error;
  return data as Experience[];
};