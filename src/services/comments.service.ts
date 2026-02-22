import { supabase } from "@/lib/supabase";

type Comment = {
  name: string;
  message: string;
};

//read
export const getComments = async () => {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

//add
export const addComment = async (comment: Comment) => {
  const { error } = await supabase
    .from("comments")
    .insert([comment]);

  if (error) throw error;
};