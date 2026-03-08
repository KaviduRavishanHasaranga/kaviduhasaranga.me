import React from 'react'
import { FaGithub, FaLinkedin, FaPaperPlane, FaDownload, FaInstagram } from 'react-icons/fa'
import { FaTwitch, FaTwitter, FaX } from 'react-icons/fa6'
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi'

export default function Contact() {
  return (
    <section className="py-20 px-4 md:px-8" id="contact">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 mt-8">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Contact Form */}
          <div className="glass-card bg-white/80 dark:bg-white/5 p-8 md:p-10 shadow-xl shadow-purple-500/5 backdrop-blur-sm border border-gray-200 dark:border-white/10">
            <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-8">Send me a message</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Name *</label>
                  <input 
                    type="text" 
                    placeholder="Your name"
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Email *</label>
                  <input 
                    type="email" 
                    placeholder="your.email@example.com"
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Subject *</label>
                <input 
                  type="text" 
                  placeholder="Project discussion"
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Message *</label>
                <textarea 
                  placeholder="Tell me about your project..."
                  rows={6}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  required
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-600/20"
              >
                <FaPaperPlane className="text-sm" />
                Send Message
              </button>
            </form>
          </div>

          {/* Right Column: Info, Socials, Resume */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="glass-card bg-white/80 dark:bg-white/5 p-8 shadow-xl shadow-purple-500/5 backdrop-blur-sm border border-gray-200 dark:border-white/10">
              <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-8">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 transition-all duration-300">
                    <HiMail className="text-xl text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="font-semibold text-gray-900 dark:text-white">hkkrhasaranga@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 transition-all duration-300">
                    <HiPhone className="text-xl text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="font-semibold text-gray-900 dark:text-white">+94 78 702 1394</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 transition-all duration-300">
                    <HiLocationMarker className="text-xl text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                    <p className="font-semibold text-gray-900 dark:text-white">Kalutara, Sri Lanka</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Follow Me */}
            <div className="glass-card bg-white/80 dark:bg-white/5 p-8 shadow-xl shadow-purple-500/5 backdrop-blur-sm border border-gray-200 dark:border-white/10">
              <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-8">Follow Me</h3>
              <div className="flex gap-4">
                {[
                  { icon: <FaGithub />, href: "https://github.com/KaviduRavishanHasaranga", color: "hover:text-black dark:hover:text-white" },
                  { icon: <FaLinkedin />, href: "https://linkedin.com/in/kavidurhasaranga", color: "hover:text-blue-600 dark:hover:text-blue-400" },
                  { icon: <HiMail />, href: "mailto:hkkrhasaranga@gmail.com", color: "hover:text-purple-600 dark:hover:text-purple-400" },
                  { icon: <FaInstagram />, href: "https://instagram.com/kavidu_ravishan_hasaranga", color: "hover:text-pink-600 dark:hover:text-pink-400" },
                  { icon: <FaTwitter />, href: "https://x.com/KaviduHasaranga", color: "hover:text-blue-400 dark:hover:text-blue-300" }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center text-xl text-gray-400 transition-all duration-300 ${social.color} hover:bg-gray-100 dark:hover:bg-white/10 hover:scale-110`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Download Resume */}
            <a 
              href="/resume.pdf" 
              className="w-full glass-card p-6 flex items-center justify-center gap-3 text-lg font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300 border border-gray-100 dark:border-white/10 hover:border-purple-500/30 shadow-xl shadow-purple-500/5"
            >
              <FaDownload className="text-blue-600 dark:text-blue-400" />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
