import { supabase } from "@/lib/supabase";
import type { Project } from "@/types";


export const getProjects = async () => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    ;

  if (error) throw error;
  return data as Project[];
};