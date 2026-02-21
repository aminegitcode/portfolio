import { supabase } from "@/lib/supabase";

type Project = {
  id: number;
  title: string;
  description: string | null;
  description_en: string | null;
  image_url: string | null;
  project_url: string | null;
  github_url: string | null;
  category: string;
  tags: string[] | null;
  created_at: string;
};

export const getProjects = async () => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    ;

  if (error) throw error;
  return data as Project[];
};