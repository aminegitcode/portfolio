"use client";
import React, { useEffect, useState } from "react";
import Badge from "../ui/Badge";
import { useLanguage } from "@/context/LanguageContext";
import { getComments } from "@/services/comments.service";
import type { Comment } from "@/types";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import CommentCard from "../ui/CommentCard";
import CommentForm from "../ui/CommentForm";

function Comments() {
  const { language } = useLanguage();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getComments()
      .then((data) => setComments(data as Comment[]))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const sorted = [...comments].sort((a, b) => (b.is_pinned ? 1 : 0) - (a.is_pinned ? 1 : 0));

  return (
    <section id="comments" className="bg-linear-to-b bg-background/50 ">
      <div className="px-10 lg:px-20 container mx-auto flex flex-col items-center pt-20 pb-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="items-center flex-col flex text-center "
        >
          <Badge className="mb-5">
            {language === "fr" ? "Commentaires" : "Comments"}
          </Badge>
          <h2 className="section-title lg:text-5xl">
            {language === "fr" ? (
              <>Laissez un <span className="gradient-text glow-text">Commentaire</span></>
            ) : (
              <>Leave a <span className="gradient-text glow-text">Comment</span></>
            )}
          </h2>
          <p className="section-subtitle text-center max-w-2xl">
            {language === "fr"
              ? "Vos retours, suggestions ou simplement un mot — tout est le bienvenu."
              : "Your feedback, suggestions, or just a kind word — all are welcome."}
          </p>
        </motion.div>

        {/* Main box */}
       
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
  className="w-full  flex flex-col lg:flex-row gap-6   rounded-2xl "
>
  {/* Form side */}
  <div className=" rounded-2xl p-6 border-white/5 border  bg-white/5  flex flex-col gap-5 max-w-xl w-full  h-fit">
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-2xl bg-primary/8   flex items-center justify-center">
        <MessageSquare className="w-4 h-4 text-primary" />
      </div>
      <h3 className="text-base font-semibold text-foreground">
        {language === "fr" ? "Nouveau commentaire" : "New comment"}
      </h3>
    </div>
    <CommentForm language={language} onNewComments={setComments} />
  </div>

  {/* Comments side */}
  <div className="border border-white/5 bg-white/5 rounded-2xl p-6 flex flex-col gap-4 flex-1 min-w-0">
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-2xl bg-primary/8  flex items-center justify-center">
        <MessageSquare className="w-4 h-4 text-primary" />
      </div>
      <h3 className="text-base font-semibold text-foreground">
        {language === "fr" ? "Commentaires" : "Comments"}
        <span className="ml-2 text-primary font-bold">({comments.length})</span>
      </h3>
    </div>

    <div className="w-full h-px bg-white/5" />

    <div className="flex flex-col gap-3 max-h-120 overflow-y-auto pr-1">
      {loading ? (
        <div className="text-muted-foreground text-sm text-center py-6">
          {language === "fr" ? "Chargement..." : "Loading..."}
        </div>
      ) : sorted.length === 0 ? (
        <div className="text-muted-foreground text-sm text-center py-6">
          {language === "fr" ? "Aucun commentaire pour l'instant." : "No comments yet."}
        </div>
      ) : (
        sorted.map((comment, index) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            language={language}
            index={index}
          />
        ))
      )}
    </div>
  </div>
</motion.div>
      </div>
    </section>
  );
}

export default Comments;