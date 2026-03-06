import React from 'react'
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 px-8 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-center gap-8">
          {/* Logo */}
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
            <span className="text-2xl font-bold gradient-text">KH</span>
          </div>

          {/* Tagline */}
          <p className="text-center text-gray-300 text-base max-w-xs">
            Building the future, one block at a time.
          </p>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a href="#home" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">Home</a>
            <a href="#about" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">About</a>
            <a href="#projects" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">Projects</a>
            <a href="#skills" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">Skills</a>
            <a href="#contact" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">Contact</a>
          </nav>

          {/* Social Icons */}
          <div className="flex gap-4 justify-center">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 glass-card flex items-center justify-center rounded-full hover:bg-white/10 hover:scale-125 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
              <FaGithub className="text-2xl text-gray-300" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 glass-card flex items-center justify-center rounded-full hover:bg-white/10 hover:scale-125 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
              <FaLinkedin className="text-2xl text-gray-300" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 glass-card flex items-center justify-center rounded-full hover:bg-white/10 hover:scale-125 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300">
              <FaTwitter className="text-2xl text-gray-300" />
            </a>
            <a href="mailto:kavidu@example.com" className="w-12 h-12 glass-card flex items-center justify-center rounded-full hover:bg-white/10 hover:scale-125 hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300">
              <HiMail className="text-2xl text-gray-300" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-center text-gray-400 text-sm pt-4">
            © {currentYear} Kavidu Hasaranga. All rights reserved.
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-left">
              <h3 className="text-xl font-bold gradient-text mb-4">Kavidu Hasaranga</h3>
              <p className="text-gray-400 text-sm">
                Full Stack Developer passionate about creating impactful digital experiences.
              </p>
            </div>

            <div className="text-left">
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#about" className="hover:text-purple-400 hover:translate-x-1 transition-all duration-200">About</a></li>
                <li><a href="#projects" className="hover:text-purple-400 hover:translate-x-1 transition-all duration-200">Projects</a></li>
                <li><a href="#skills" className="hover:text-purple-400 hover:translate-x-1 transition-all duration-200">Skills</a></li>
                <li><a href="#contact" className="hover:text-purple-400 hover:translate-x-1 transition-all duration-200">Contact</a></li>
              </ul>
            </div>

            <div className="text-left">
              <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
              <div className="flex gap-4 justify-start">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 glass-card flex items-center justify-center rounded-full hover:bg-white/10 hover:scale-125 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                  <FaGithub className="text-xl text-gray-300" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 glass-card flex items-center justify-center rounded-full hover:bg-white/10 hover:scale-125 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
                  <FaLinkedin className="text-xl text-gray-300" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 glass-card flex items-center justify-center rounded-full hover:bg-white/10 hover:scale-125 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300">
                  <FaTwitter className="text-xl text-gray-300" />
                </a>
                <a href="mailto:kavidu@example.com" className="w-10 h-10 glass-card flex items-center justify-center rounded-full hover:bg-white/10 hover:scale-125 hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300">
                  <HiMail className="text-xl text-gray-300" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>© {currentYear} Kavidu Hasaranga. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
