import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Workflow } from "@/components/sections/workflow";
import { Outputs } from "@/components/sections/outputs";
import { Security } from "@/components/sections/security";
import { Stack } from "@/components/sections/stack";
import { Pilot } from "@/components/sections/pilot";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Workflow />
        <Outputs />
        <Security />
        <Stack />
        <Pilot />
      </main>
      <Footer />
    </div>
  );
}
