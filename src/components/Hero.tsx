'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Parallax from './Parallax'

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number]
      }
    }
  }

  const statsItem = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    show: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number]
      }
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-8 py-20 pt-32 relative overflow-hidden" id="home">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Parallax speed={-0.3}>
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </Parallax>
        <Parallax speed={0.5}>
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </Parallax>
      </div>

      <motion.div 
        className="max-w-6xl w-full text-center relative z-10"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h1 
          className="text-6xl md:text-8xl font-bold mb-6"
          variants={item}
        >
          Kavidu <span className="gradient-text">Hasaranga</span>
        </motion.h1>
        
        <motion.div 
          className="h-16 mb-8 flex items-center justify-center"
          variants={item}
        >
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
            I&apos;m a <span className="gradient-text font-semibold">{text}</span>
            <span className="animate-pulse text-purple-400">|</span>
          </p>
        </motion.div>
        
        <motion.div 
          className="flex gap-4 justify-center mb-12 flex-wrap"
          variants={container}
        >
          <motion.div 
            className="glass-card px-6 py-3 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 cursor-default"
            variants={statsItem}
            whileHover={{ y: -5 }}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">Projects</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">10+</p>
          </motion.div>
          <motion.div 
            className="glass-card px-6 py-3 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 cursor-default"
            variants={statsItem}
            whileHover={{ y: -5 }}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">Experience</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">2+ Years</p>
          </motion.div>
          <motion.div 
            className="glass-card px-6 py-3 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/30 transition-all duration-300 cursor-default"
            variants={statsItem}
            whileHover={{ y: -5 }}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">Technologies</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">15+</p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="flex gap-4 justify-center flex-wrap"
          variants={item}
        >
          <motion.a
            href="#projects"
            className="bg-linear-to-r from-pink-500 to-purple-600 px-8 py-3 rounded-full font-semibold hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
          </motion.a>
          <motion.a
            href="#contact"
            className="glass-card px-8 py-3 rounded-full font-semibold hover:bg-white/10 hover:scale-105 hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Me
          </motion.a>
          <motion.a
            href="/cv.pdf"
            download="Kavidu_Hasaranga_CV.pdf"
            className="relative overflow-hidden px-8 py-3 rounded-full font-semibold inline-flex items-center gap-2 border border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 hover:border-purple-400/60 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download CV
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-r from-purple-500/10 to-pink-500/10" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}
