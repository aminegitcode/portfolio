import { supabase } from "@/lib/supabase";
import type { Profile } from "@/types";

export const getProfile = async () => {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .single(); 

  if (error) throw error;
  return data as Profile;
};