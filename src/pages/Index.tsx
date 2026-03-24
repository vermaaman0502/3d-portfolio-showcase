import { useState, useEffect, useCallback } from "react";
import Scene3D from "@/components/Scene3D";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

  // Simulate loading
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => setIsLoaded(true), 400);
      }
      setLoadProgress(progress);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Track scroll progress & active section
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress(docHeight > 0 ? scrollY / docHeight : 0);

    // Determine active section
    const sections = ["hero", "about", "projects", "skills", "contact"];
    for (const id of sections.reverse()) {
      const el = document.getElementById(id);
      if (el && scrollY >= el.offsetTop - 300) {
        setActiveSection(id);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <LoadingScreen progress={loadProgress} isLoaded={isLoaded} />

      {/* 3D background scene */}
      <Scene3D scrollProgress={scrollProgress} />

      {/* Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Content sections overlaid on the 3D scene */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </>
  );
};

export default Index;
