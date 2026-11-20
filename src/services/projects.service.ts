import projects from "@/data/projects.json";
import type { Project } from "@/types";

export const getProjects = async () => projects as unknown as Project[];
