import { supabase } from "@/lib/supabase";

type Skill = {
  id: number;
  name: string;
  category: string | null;
  icon_url: string | null;
  slug: string | null;
  created_at: string;
};

export const getSkills = async () => {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("category", { ascending: true });

  if (error) throw error;
  return data as Skill[];
};
