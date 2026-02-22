import { supabase } from "@/lib/supabase";
import type { Skill } from "@/types";


export const getSkills = async () => {
  const { data, error } = await supabase
    .from("skills")
    .select("*");

  if (error) throw error;
  return data as Skill[];
};
