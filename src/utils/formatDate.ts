// lib/format.ts

export const formatDate = (date: string, local: "fr" | "en" = "fr") => {
  return new Date(date).toLocaleDateString(
    local === "fr" ? "fr-FR" : "en-US",
    {
      year: "numeric",
      month: "long",
    }
  );
};