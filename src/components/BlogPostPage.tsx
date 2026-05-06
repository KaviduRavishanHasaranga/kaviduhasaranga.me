'use client'

import React from 'react'
import Link from 'next/link'
import { BlogPost } from '@/data/blogs'
import { useTheme } from '@/context/ThemeContext'
import { motion } from 'framer-motion'
import MarkdownRenderer from './MarkdownRenderer'

interface Props {
  post: BlogPost
  markdownContent: string
}

export default function BlogPostPage({ post, markdownContent }: Props) {
  const { theme, toggleTheme } = useTheme()

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    })

  const getCategoryColor = (cat: string) => {
    const map: Record<string, string> = {
      Backend:    'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-500/30',
      Blockchain: 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-500/30',
      'AI & ML':  'bg-pink-100 dark:bg-pink-500/20 text-pink-700 dark:text-pink-300 border-pink-300 dark:border-pink-500/30',
      Mobile:     'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-300 dark:border-cyan-500/30',
      DevOps:     'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300 border-green-300 dark:border-green-500/30',
      Security:   'bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-500/30',
    }
    return map[cat] ?? 'bg-gray-100 dark:bg-gray-500/20 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-500/30'
  }

  const bgClass = theme === 'dark'
    ? 'bg-gradient-to-b from-[#0a0a1f] via-[#1a0a2e] to-[#0a0a1f]'
    : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'

  return (
    <main className={`min-h-screen ${bgClass}`}>

      {/* Top nav bar */}
      <div className="fixed top-0 left-0 right-0 z-50 mx-2 sm:mx-4 mt-2 sm:mt-4">
        <div className="glass-card bg-white/90 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-6 py-3 flex items-center justify-between max-w-6xl mx-auto backdrop-blur-xl">
          <Link href="/" className="text-xl font-bold gradient-text">KR</Link>
          <div className="flex items-center gap-4">
            <Link
              href="/#blog"
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors duration-200"
            >
              <span>←</span>
              <span>Back to Blog</span>
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

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-24">

        {/* Hero */}
        <div className="mb-12 text-center">
          <div className="text-7xl mb-6">{post.emoji}</div>

          <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(post.category)}`}>
              {post.category}
            </span>
            <span className="text-gray-400 dark:text-gray-500 text-xs">·</span>
            <span className="text-gray-600 dark:text-gray-400 text-xs">{formatDate(post.date)}</span>
            <span className="text-gray-400 dark:text-gray-500 text-xs">·</span>
            <span className="text-gray-600 dark:text-gray-400 text-xs">⏱ {post.readTime}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed max-w-3xl mx-auto">
            {post.excerpt}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-400 dark:via-purple-500/40 to-transparent mb-12" />

        {/* Article content — rendered from Markdown */}
        <article>
          <MarkdownRenderer content={markdownContent} />
        </article>

        {/* Tags */}
        <div className="mt-16 pt-8 border-t border-gray-300 dark:border-white/5">
          <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-4">Tags</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 rounded-lg text-sm border border-gray-200 dark:border-white/10 hover:bg-purple-50 hover:border-purple-400 hover:text-purple-600 dark:hover:border-purple-500/40 dark:hover:text-purple-300 transition-colors duration-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author card */}
        <div className="mt-10 glass-card bg-white/80 dark:bg-white/5 p-6 flex items-center gap-5 border border-gray-200 dark:border-white/10 backdrop-blur-sm">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shrink-0">
            K
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Kavidu Hasaranga</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
              Full Stack Developer · AI & ML Enthusiast · Blockchain Developer
            </p>
          </div>
          <Link
            href="/#contact"
            className="ml-auto px-4 py-2 rounded-full text-sm font-medium bg-purple-50 dark:bg-purple-500/10 hover:bg-purple-100 dark:hover:bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-400 dark:border-purple-500/30 hover:scale-105 transition-all duration-200 whitespace-nowrap"
          >
            Get in Touch
          </Link>
        </div>

        {/* Back link */}
        <div className="mt-12 text-center">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors duration-200 text-sm"
          >
            <span>←</span>
            <span>Back to all posts</span>
          </Link>
        </div>

      </div>
    </main>
  )
}
