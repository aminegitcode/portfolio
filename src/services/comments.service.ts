import comments from "@/data/comments.json";
import type { Comment } from "@/types";

const time = (d: string) => new Date(d).getTime();

// Lecture : commentaires validés, stockés dans src/data/comments.json
export const getComments = async () =>
  [...(comments as unknown as Comment[])].sort((a, b) => time(b.created_at) - time(a.created_at));

// Envoi : le commentaire t'arrive par mail (Resend). Tu le valides en l'ajoutant à comments.json.
export const addComment = async (comment: Pick<Comment, "name" | "message">) => {
  const res = await fetch("/api/comment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
  if (!res.ok) throw new Error("Échec de l'envoi du commentaire");
};
