import React from 'react'
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'

export default function Contact() {
  return (
    <section className="py-20 px-8" id="contact">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 mt-8">
          Let&apos;s <span className="gradient-text">Connect</span>
        </h2>
        <p className="text-center text-gray-400 mb-12">
          Have a project in mind or just want to chat? Feel free to reach out!
        </p>

        <div className="glass-card p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <a href="mailto:kavidu@example.com" className="glass-card p-6 text-center hover:bg-white/10 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 group">
              <div className="text-5xl mb-3 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 flex justify-center">
                <HiMail className="text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Email</h3>
              <p className="text-gray-400 text-sm">kavidu@example.com</p>
            </a>

            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="glass-card p-6 text-center hover:bg-white/10 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 group">
              <div className="text-5xl mb-3 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 flex justify-center">
                <FaLinkedin className="text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">LinkedIn</h3>
              <p className="text-gray-400 text-sm">Connect with me</p>
            </a>

            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="glass-card p-6 text-center hover:bg-white/10 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 group">
              <div className="text-5xl mb-3 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 flex justify-center">
                <FaTwitter className="text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Twitter</h3>
              <p className="text-gray-400 text-sm">Follow me</p>
            </a>

            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="glass-card p-6 text-center hover:bg-white/10 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 group">
              <div className="text-5xl mb-3 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 flex justify-center">
                <FaInstagram className="text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Instergram</h3>
              <p className="text-gray-400 text-sm">Follow me</p>
            </a>
          </div>

          <div className="text-center">
            <p className="text-gray-300 mb-6">Available for freelance work and collaborations</p>
            <button className="bg-linear-to-r from-pink-500 to-purple-600 px-8 py-3 rounded-full font-semibold hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300">
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
