
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import { getProfile } from "@/services/profile.service";
import type { Profile } from "@/types";
import Education from "@/components/sections/Education";

export default async function Home() {
  const profile: Profile = await getProfile();

  return (
    <div>
      <Hero profile={profile} />
      <About profile={profile} />
      <Skills /> 
      <Education/>
    </div>
  );
}