'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Project } from '@/data/projects'
import { useTheme } from '@/context/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'
import MarkdownRenderer from './MarkdownRenderer'

interface Props {
  project: Project
  markdownContent: string
}

export default function ProjectDetailPage({ project, markdownContent }: Props) {
  const { theme, toggleTheme } = useTheme()
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const screenshots = project.screenshots?.filter(Boolean) ?? []

  // Keyboard navigation for lightbox
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i! + 1) % screenshots.length)
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i! - 1 + screenshots.length) % screenshots.length)
    },
    [lightboxIndex, screenshots.length],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  // Prevent body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  const bgClass =
    theme === 'dark'
      ? 'bg-gradient-to-b from-[#0a0a1f] via-[#1a0a2e] to-[#0a0a1f]'
      : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'

  return (
    <main className={`min-h-screen ${bgClass}`}>

      {/* ── Top nav bar ── */}
      <div className="fixed top-0 left-0 right-0 z-50 mx-2 sm:mx-4 mt-2 sm:mt-4">
        <div className="glass-card bg-white/90 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-6 py-3 flex items-center justify-between max-w-6xl mx-auto backdrop-blur-xl">
          <Link href="/" className="text-xl font-bold gradient-text">KR</Link>
          <div className="flex items-center gap-4">
            <Link
              href="/#projects"
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors duration-200"
            >
              <span>←</span>
              <span>Back to Projects</span>
            </Link>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition border border-gray-200 dark:border-white/10"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── Cover image hero ── */}
      {project.coverImage && (
        <div className="w-full pt-23">
          <div className="relative w-full max-w-6xl mx-auto h-64 md:h-96 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.coverImage}
              alt={`${project.title} cover`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a1f] opacity-80" />
          </div>
        </div>
      )}

      <div className={`max-w-4xl mx-auto px-6 pb-24 ${project.coverImage ? 'pt-8' : 'pt-32'}`}>

        {/* ── Markdown content ── */}
        <article>
          <MarkdownRenderer content={markdownContent} />
        </article>

        {/* ── Screenshots grid ── */}
        {screenshots.length > 0 && (
          <div className="mb-14">
            {/* Section label */}
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1 h-5 rounded-full bg-gradient-to-b from-pink-500 to-purple-600 shrink-0 inline-block" />
              <h2 className="text-xl font-bold tracking-widest text-gray-500 dark:text-gray-400">
                Screenshots
              </h2>
              <span className="ml-auto text-xs text-gray-500 dark:text-gray-600">
                Click to expand · ← → to navigate
              </span>
            </div>

            {/* Grid */}
            <div className={`grid gap-3 ${
              screenshots.length === 1 ? 'grid-cols-1' :
              screenshots.length === 2 ? 'grid-cols-2' :
              'grid-cols-2 md:grid-cols-3'
            }`}>
              {screenshots.map((src, i) => (
                <button
                  key={i}
                  id={`screenshot-${project.slug}-${i}`}
                  onClick={() => setLightboxIndex(i)}
                  className={`group relative overflow-hidden rounded-xl border border-gray-200 dark:border-white/10
                              hover:border-purple-400 dark:hover:border-purple-500
                              shadow hover:shadow-xl hover:shadow-purple-500/20
                              transition-all duration-300 hover:scale-[1.02] focus:outline-none
                              bg-gray-100 dark:bg-white/5
                              ${screenshots.length === 1 ? 'h-72 md:h-96' :
                                screenshots.length === 2 ? 'h-52 md:h-64' :
                                'h-48 md:h-56'}`}
                  aria-label={`View screenshot ${i + 1}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 text-white text-3xl drop-shadow-lg">
                      
                    </span>
                  </div>
                  {/* Index badge */}
                  <span className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {i + 1} / {screenshots.length}
                  </span>
                </button>
              ))}
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-purple-400/40 dark:via-purple-500/30 to-transparent mt-12" />
          </div>
        )}

        {/* ── Author card ── */}
        <div className="mt-16 glass-card bg-white/80 dark:bg-white/5 p-6 flex items-center gap-5 border border-gray-200 dark:border-white/10 backdrop-blur-sm">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shrink-0">
            K
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Kavidu Hasaranga</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
              Full Stack Developer · AI &amp; ML Enthusiast · Blockchain Developer
            </p>
          </div>
          <Link
            href="/#contact"
            className="ml-auto px-4 py-2 rounded-full text-sm font-medium bg-purple-50 dark:bg-purple-500/10 hover:bg-purple-100 dark:hover:bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-400 dark:border-purple-500/30 hover:scale-105 transition-all duration-200 whitespace-nowrap"
          >
            Get in Touch
          </Link>
        </div>

        {/* ── Back link ── */}
        <div className="mt-12 text-center">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors duration-200 text-sm"
          >
            <span>←</span>
            <span>Back to all projects</span>
          </Link>
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="relative max-w-5xl w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={screenshots[lightboxIndex]}
                alt={`Screenshot ${lightboxIndex + 1}`}
                className="max-h-[85vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl shadow-purple-500/20"
              />

              {/* Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                {lightboxIndex + 1} / {screenshots.length}
              </div>
            </motion.div>

            {/* Prev button */}
            {screenshots.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setLightboxIndex((i) => (i! - 1 + screenshots.length) % screenshots.length)
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all duration-200 hover:scale-110 text-lg"
                aria-label="Previous screenshot"
              >
                ‹
              </button>
            )}

            {/* Next button */}
            {screenshots.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setLightboxIndex((i) => (i! + 1) % screenshots.length)
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all duration-200 hover:scale-110 text-lg"
                aria-label="Next screenshot"
              >
                ›
              </button>
            )}

            {/* Close button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all duration-200 hover:scale-110"
              aria-label="Close lightbox"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
