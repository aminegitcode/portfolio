import education from "@/data/education.json";
import type { Education } from "@/types";

export const getEducation = async () =>
  [...(education as unknown as Education[])].sort((a, b) => b.order_index - a.order_index);
