import skills from "@/data/skills.json";
import type { Skill } from "@/types";

export const getSkills = async () => skills as unknown as Skill[];
