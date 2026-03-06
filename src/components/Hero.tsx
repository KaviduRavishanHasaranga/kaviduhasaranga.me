'use client'

import React, { useState, useEffect } from 'react'

const roles = [
  "AI & ML Enthusiast",
  "Full Stack Developer",
  "Blockchain Developer",
  "Problem Solver"
]

export default function Hero() {
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % roles.length
      const fullText = roles[i]

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      )

      setTypingSpeed(isDeleting ? 50 : 150)

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && text === '') {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      }
    }

    const timer = setTimeout(handleType, typingSpeed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum, typingSpeed])

  return (
    <section className="min-h-screen flex items-center justify-center px-8 py-20 pt-32" id="home">
      <div className="max-w-6xl w-full text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-6">
          Kavidu <span className="gradient-text">Hasaranga</span>
        </h1>
        <div className="h-16 mb-8 flex items-center justify-center">
          <p className="text-xl md:text-2xl text-gray-300">
            I&apos;m a <span className="gradient-text font-semibold">{text}</span>
            <span className="animate-pulse text-purple-400">|</span>
          </p>
        </div>
        <div className="flex gap-4 justify-center mb-12">
          <div className="glass-card px-6 py-3 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 cursor-default">
            <p className="text-sm text-gray-400">Projects</p>
            <p className="text-2xl font-bold text-white">10+</p>
          </div>
          <div className="glass-card px-6 py-3 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 cursor-default">
            <p className="text-sm text-gray-400">Experience</p>
            <p className="text-2xl font-bold text-white">2+ Years</p>
          </div>
          <div className="glass-card px-6 py-3 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/30 transition-all duration-300 cursor-default">
            <p className="text-sm text-gray-400">Technologies</p>
            <p className="text-2xl font-bold text-white">15+</p>
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          <button className="bg-linear-to-r from-pink-500 to-purple-600 px-8 py-3 rounded-full font-semibold hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300">
            View Projects
          </button>
          <button className="glass-card px-8 py-3 rounded-full font-semibold hover:bg-white/10 hover:scale-105 hover:shadow-xl transition-all duration-300">
            Contact Me
          </button>
        </div>
      </div>
    </section>
  )
}
