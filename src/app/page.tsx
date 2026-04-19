// src/app/page.tsx
import dynamic from 'next/dynamic';
import Hero from "@/components/Hero";
import About from "@/components/About";

// Lazy load below-the-fold components for faster initial load
const Education = dynamic(() => import("@/components/Education"), { ssr: true });
const Skills = dynamic(() => import("@/components/Skills"), { ssr: true });
const Projects = dynamic(() => import("@/components/Projects"), { ssr: true });
const Github = dynamic(() => import("@/components/Github"), { ssr: true });
const Community = dynamic(() => import("@/components/Community"), { ssr: true });
const Passions = dynamic(() => import("@/components/Passions"), { ssr: true });
const Roadmap = dynamic(() => import("@/components/Roadmap"), { ssr: true });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: true });
const Blog = dynamic(() => import("@/components/Blog"), { ssr: true });

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Education />
      <Skills />
      <Projects />
      <Github />      
      <Passions />
      <Roadmap />
      <Contact />
      <Blog />
    </>
  );
}
