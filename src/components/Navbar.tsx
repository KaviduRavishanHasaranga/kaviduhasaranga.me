'use client'

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navLinks = useMemo(() => [
    { href: "#about", label: "About" },
    { href: "#education", label: "Education" },
    { href: "#skills", label: "Skills" },
    { href: "#certifications", label: "Certifications" },
    { href: "#projects", label: "Projects" },
    { href: "#github", label: "GitHub" },
    { href: "#passions", label: "Passions" },
    { href: "#contact", label: "Contact" },
    { href: "#blog", label: "Blog" },
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Get all sections
      const sections = navLinks.map(link => {
        const element = document.querySelector(link.href);
        if (element) {
          const rect = element.getBoundingClientRect();
          return {
            id: link.href,
            top: rect.top,
            bottom: rect.bottom,
            height: rect.height
          };
        }
        return null;
      }).filter(Boolean);

      // Find which section is currently in view
      // A section is active if its top is above the middle of the viewport
      // and its bottom is below the middle
      const middle = window.innerHeight / 2;
      
      for (const section of sections) {
        if (section && section.top <= middle && section.bottom >= middle) {
          setActiveSection(section.id);
          break;
        }
      }

      // If no section is in the middle, check which one is closest to top
      if (!sections.some(s => s && s.top <= middle && s.bottom >= middle)) {
        const topSection = sections.find(s => s && s.top > 0);
        if (topSection) {
          setActiveSection(topSection.id);
        }
      }
    };

    handleScroll(); // Check on mount
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 glass-card bg-white/90 dark:bg-white/5 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 mx-2 sm:mx-4 mt-2 sm:mt-4 rounded-2xl transition-all duration-300 ${
        scrolled ? 'shadow-2xl shadow-purple-500/10' : ''
      }`}
    >
      <div className="flex justify-between items-center px-4 sm:px-8 py-3 max-w-6xl mx-auto">
        <Link href="/" className="text-xl font-bold gradient-text">
          KR
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex gap-6 text-gray-600 dark:text-gray-300">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className={`hover:text-purple-400 transition relative group ${
                  activeSection === link.href ? 'text-purple-400' : ''
                }`}
              >
                {link.label}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-linear-to-r from-purple-400 to-pink-400"
                  initial={{ width: activeSection === link.href ? "100%" : 0 }}
                  animate={{ width: activeSection === link.href ? "100%" : 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Download CV Button */}
          <motion.a
            href="cv.pdf"
            download="Kavidu_Hasaranga_CV.pdf"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold border border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 text-purple-400 dark:text-purple-300"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            CV
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition border border-gray-200 dark:border-white/10"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 lg:hidden">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition border border-gray-200 dark:border-white/10"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </motion.button>

          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition border border-gray-200 dark:border-white/10"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full bg-gray-500 dark:bg-gray-300 transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-gray-500 dark:bg-gray-300 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-gray-500 dark:bg-gray-300 transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="px-4 sm:px-8 pb-4 flex flex-col gap-3 text-gray-600 dark:text-gray-300">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    // Delay scroll until the menu close animation settles
                    setTimeout(() => {
                      const target = document.querySelector(link.href);
                      if (target) {
                        const navbarHeight = 80;
                        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
                        window.scrollTo({
                          top: targetPosition,
                          behavior: 'smooth'
                        });
                      }
                    }, 350);
                  }}
                  className={`hover:text-purple-400 transition py-2 border-b border-gray-200/70 dark:border-gray-800/50 ${
                    activeSection === link.href ? 'text-purple-400 font-semibold' : ''
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}

              {/* Download CV — Mobile */}
              <motion.a
                href="/cv.pdf"
                download="Kavidu_Hasaranga_CV.pdf"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.05 + 0.05 }}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 py-2 font-semibold text-purple-400 dark:text-purple-300 hover:text-purple-300 transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download CV
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
