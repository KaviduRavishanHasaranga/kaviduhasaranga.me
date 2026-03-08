'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#education", label: "Education" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#github", label: "GitHub" },
    { href: "#research", label: "Research" },
    { href: "#roadmap", label: "Roadmap" },
    { href: "#contact", label: "Contact" },
    { href: "#blog", label: "Blog" },
  ];

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
                className="hover:text-purple-400 transition relative group"
              >
                {link.label}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-linear-to-r from-purple-400 to-pink-400"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition border border-gray-200 dark:border-white/10"
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
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-purple-400 transition py-2 border-b border-gray-200/70 dark:border-gray-800/50"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
