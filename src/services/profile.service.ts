import { supabase } from "@/lib/supabase";

type Profile = {
  id: number;
  full_name: string;
  subtitle: string;
  subtitle_en: string;
  hero_texts: string[];
  hero_texts_en: string[];
  bio: string;
  bio_en: string;
  email: string;
  github_url: string;
  linkedin_url: string;
  photo_url: string;
  created_at: string;
};

export const getProfile = async () => {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .single(); 

  if (error) throw error;
  return data as Profile;
};