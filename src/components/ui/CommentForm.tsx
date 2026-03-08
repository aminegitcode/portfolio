"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "../ui/Button";
import { addComment, getComments } from "@/services/comments.service";
import type { Comment } from "@/types";

interface CommentFormProps {
  language: string;
  onNewComments: (comments: Comment[]) => void;
}

export default function CommentForm({ language, onNewComments }: CommentFormProps) {
  const [form, setForm] = useState({ name: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: { name?: string; message?: string } = {};
    if (!form.name.trim()) newErrors.name = language === "fr" ? "Nom requis" : "Name required";
    if (!form.message.trim()) newErrors.message = language === "fr" ? "Message requis" : "Message required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      await addComment({ name: form.name, message: form.message } as Comment);
      const updated = await getComments();
      onNewComments(updated as Comment[]);
      setForm({ name: "", message: "" });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 ">

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-muted-foreground">
          {language === "fr" ? "Nom" : "Name"}
          <span className="text-red-400 ml-0.5">*</span>
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder={language === "fr" ? "Entrez votre nom" : "Enter your name"}
          className={`w-full px-4  py-2.5 rounded-xl bg-white/10   border text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all duration-300 focus:border-primary/50
            ${errors.name ? "border-red-500/50" : "border-white/10"}`}
        />
        {errors.name && <span className="text-xs text-red-400">{errors.name}</span>}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-muted-foreground">
          {language === "fr" ? "Message" : "Message"}
          <span className="text-red-400 ml-0.5">*</span>
        </label>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder={language === "fr" ? "Écrivez votre message ici..." : "Write your message here..."}
          rows={4}
          className={`w-full px-4 py-2.5 rounded-xl bg-white/10 border text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all duration-300 focus:border-primary/50 resize-none
            ${errors.message ? "border-red-500/50" : "border-white/10"}`}
        />
        {errors.message && <span className="text-xs text-red-400">{errors.message}</span>}
      </div>

      {/* Submit */}
      <Button
        variant="gradient"
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2 py-3"
      >
        <Send className="w-4 h-4" />
        {submitting
          ? (language === "fr" ? "Envoi..." : "Sending...")
          : (language === "fr" ? "Poster le commentaire" : "Post Comment")
        }
      </Button>

      {/* Success */}
      <AnimatePresence>
        {success && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-emerald-400 text-center"
          >
            {language === "fr" ? "Commentaire ajouté !" : "Comment posted!"}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}