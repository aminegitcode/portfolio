import { supabase } from "@/lib/supabase";

type Education = {
  id: number;
  school_name: string;
  school_name_an: string;
  degree: string;
  degree_an: string;
  field: string | null;
  field_en: string | null;
  description: string | null;
  description_en: string | null;
  period: string;
  period_en: string;
  location: string;
  logo_url: string | null;
  school_url: string | null;
  tags: string[] | null;
  order_index: number;
  created_at: string;
};

export const getEducation = async () => {
  const { data, error } = await supabase
    .from("education")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) throw error;
  return data as Education[];
};