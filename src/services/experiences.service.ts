import experiences from "@/data/experiences.json";
import type { Experience } from "@/types";

const time = (d: string | null) => (d ? new Date(d).getTime() : 0);

export const getExperiences = async () =>
  [...(experiences as unknown as Experience[])].sort((a, b) => time(b.start_date) - time(a.start_date));
