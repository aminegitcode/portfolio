"use client";
import React, { useState } from "react";
import Badge from "../ui/Badge";
import { useLanguage } from "@/context/LanguageContext";
import { sendContact } from "@/services/contact.service";
import type { Contact } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, User, MessageSquare, Tag, Clock } from "lucide-react";
import { Button } from "../ui/Button";

function Contact() {
  const { language } = useLanguage();
  const [form, setForm] = useState<Contact>({
    name: "",
    email: "",
    message: "",
    subject: null,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Contact, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const validate = () => {
    const newErrors: Partial<Record<keyof Contact, string>> = {};
    if (!form.name.trim())
      newErrors.name = language === "fr" ? "Nom requis" : "Name required";
    if (!form.email.trim())
      newErrors.email = language === "fr" ? "Email requis" : "Email required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = language === "fr" ? "Email invalide" : "Invalid email";
    if (!form.message.trim())
      newErrors.message =
        language === "fr" ? "Message requis" : "Message required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      await sendContact(form);
      setForm({ name: "", email: "", message: "", subject: null });
      setCharCount(0);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field: keyof Contact) =>
    `w-full px-4 py-2.5 rounded-xl bg-input border text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-300 focus:border-primary/40 focus:ring-2 focus:ring-ring/10 ${
      errors[field]
        ? "border-red-500/40"
        : "border-border/50 hover:border-border"
    }`;

  const infoItems = [
    {
      icon: <Mail className="w-3.5 h-3.5 text-primary" />,
      bg: "bg-primary/10 border-primary/20",
      label: "Email",
      value: "djabri.aminee@gmail.com",
    },
    {
      icon: <MessageSquare className="w-3.5 h-3.5 text-secondary" />,
      bg: "bg-secondary/10 border-secondary/20",
      label: language === "fr" ? "Disponibilité" : "Availability",
      value:
        language === "fr" ? "Ouvert aux opportunités" : "Open to opportunities",
    },
    {
      icon: <Clock className="w-3.5 h-3.5 text-primary" />,
      bg: "bg-primary/10 border-primary/20",
      label: language === "fr" ? "Réponse" : "Response time",
      value: language === "fr" ? "Sous 24 heures" : "Within 24 hours",
    },
  ];

  return (
    <section id="contact" className="bg-background">
      <div className="px-6 lg:px-20 container mx-auto flex flex-col items-center pt-20 pb-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="items-center flex-col flex text-center mb-16"
        >
          <Badge className="mb-5">
            {language === "fr" ? "Contact" : "Contact"}
          </Badge>
          <h2 className="section-title lg:text-5xl">
            {language === "fr" ? (
              <>
                Travaillons{" "}
                <span className="gradient-text">Ensemble</span>
              </>
            ) : (
              <>
                Let's Work{" "}
                <span className="gradient-text">Together</span>
              </>
            )}
          </h2>
          <p className="section-subtitle text-center max-w-2xl">
            {language === "fr"
              ? "Un projet en tête, une question ou juste envie de dire bonjour — je suis disponible."
              : "A project in mind, a question, or just want to say hello — I'm available."}
          </p>
        </motion.div>

        <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-5">

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-7 flex flex-col gap-6 lg:w-[300px] flex-shrink-0 h-fit"
          >
            <div>
              <h3 className="font-semibold text-foreground mb-1.5 text-base">
                {language === "fr" ? "Parlons-en" : "Let's talk"}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                {language === "fr"
                  ? "Je réponds généralement sous 24h. N'hésitez pas à me contacter pour toute opportunité."
                  : "I usually respond within 24h. Feel free to reach out for any opportunity."}
              </p>
            </div>

            <div className="h-px bg-border/30" />

            {/* Info items */}
            <div className="flex flex-col gap-4">
              {infoItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 ${item.bg}`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-medium">
                      {item.label}
                    </p>
                    <p className="text-sm text-foreground/80">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-px bg-border/30" />

            {/* Status */}
            <div className="flex items-center gap-2.5 bg-secondary/5 border border-secondary/15 rounded-xl px-3 py-2.5">
              <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_hsl(160,85%,60%,0.8)] animate-glow-pulse flex-shrink-0" />
              <span className="text-xs text-secondary/80">
                {language === "fr"
                  ? "Disponible pour de nouveaux projets"
                  : "Available for new projects"}
              </span>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-7 flex flex-col gap-4 flex-1"
          >
            {/* Name + Email */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1.5">
                  <User className="w-3 h-3" />
                  {language === "fr" ? "Nom" : "Name"}
                  <span className="text-red-400/70">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder={
                    language === "fr" ? "Votre nom" : "Your name"
                  }
                  className={inputClass("name")}
                />
                {errors.name && (
                  <span className="text-xs text-red-400/80">{errors.name}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1.5">
                  <Mail className="w-3 h-3" />
                  Email
                  <span className="text-red-400/70">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  placeholder={
                    language === "fr" ? "Votre email" : "Your email"
                  }
                  className={inputClass("email")}
                />
                {errors.email && (
                  <span className="text-xs text-red-400/80">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1.5">
                <Tag className="w-3 h-3" />
                {language === "fr" ? "Sujet" : "Subject"}
                <span className="text-muted-foreground/30 text-[9px] normal-case tracking-normal font-normal">
                  ({language === "fr" ? "optionnel" : "optional"})
                </span>
              </label>
              <input
                type="text"
                value={form.subject ?? ""}
                onChange={(e) =>
                  setForm({ ...form, subject: e.target.value || null })
                }
                placeholder={
                  language === "fr"
                    ? "Sujet de votre message"
                    : "Subject of your message"
                }
                className={inputClass("subject")}
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1.5">
                <MessageSquare className="w-3 h-3" />
                Message
                <span className="text-red-400/70">*</span>
              </label>
              <textarea
                value={form.message}
                onChange={(e) => {
                  setForm({ ...form, message: e.target.value });
                  setCharCount(e.target.value.length);
                }}
                placeholder={
                  language === "fr"
                    ? "Décrivez votre projet ou votre demande..."
                    : "Describe your project or request..."
                }
                rows={5}
                className={`${inputClass("message")} resize-none`}
              />
              <div className="flex justify-between items-center">
                {errors.message ? (
                  <span className="text-xs text-red-400/80">
                    {errors.message}
                  </span>
                ) : (
                  <span />
                )}
                <span className="text-[10px] text-muted-foreground/40 ml-auto">
                  {charCount} / 1000
                </span>
              </div>
            </div>

            {/* Submit */}
            <Button
              variant="gradient"
              size="lg"
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 mt-1"
            >
              <Send className="w-4 h-4" />
              {submitting
                ? language === "fr"
                  ? "Envoi en cours..."
                  : "Sending..."
                : language === "fr"
                ? "Envoyer le message"
                : "Send message"}
            </Button>

            {/* Success */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2 text-sm text-secondary/90 bg-secondary/5 border border-secondary/15 rounded-xl px-4 py-3"
                >
                  ✓{" "}
                  {language === "fr"
                    ? "Message envoyé avec succès !"
                    : "Message sent successfully!"}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;