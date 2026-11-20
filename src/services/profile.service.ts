import profile from "@/data/profile.json";
import type { Profile } from "@/types";

export const getProfile = async () => profile as unknown as Profile;
