import { supabase } from "@/lib/supabase";
import type { Education } from "@/types";


export const getEducation = async () => {
  const { data, error } = await supabase
    .from("education")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) throw error;
  return data as Education[];
};