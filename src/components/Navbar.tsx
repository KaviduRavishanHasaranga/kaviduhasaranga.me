'use client'

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-gray-800 dark:border-gray-800 light:border-gray-300 mx-2 sm:mx-4 mt-2 sm:mt-4 rounded-2xl">
      <div className="flex justify-between items-center px-4 sm:px-8 py-3 max-w-6xl mx-auto">
        <Link href="/" className="text-xl font-bold gradient-text">
          KR
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex gap-6 text-gray-300 dark:text-gray-300 light:text-gray-700">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-purple-400 transition"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-full glass-card hover:bg-white/10 transition"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full glass-card hover:bg-white/10 transition"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>

          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg glass-card hover:bg-white/10 transition"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full bg-gray-300 transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-gray-300 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-gray-300 transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-4 sm:px-8 pb-4 flex flex-col gap-3 text-gray-300 dark:text-gray-300 light:text-gray-700">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-purple-400 transition py-2 border-b border-gray-800/50 dark:border-gray-800/50 light:border-gray-300/50"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
