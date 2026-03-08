'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { blogPosts, categories } from '@/data/blogs'

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [toastId, setToastId] = useState<string | null>(null)

  const filtered = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory)

  const featured = blogPosts.filter(p => p.featured)

  const getCategoryColor = (cat: string) => {
    const map: Record<string, string> = {
      Backend:    'from-purple-500/20 to-purple-600/10 text-purple-600 dark:text-purple-300 border-purple-400/50 dark:border-purple-500/30',
      Blockchain: 'from-blue-500/20 to-blue-600/10 text-blue-600 dark:text-blue-300 border-blue-400/50 dark:border-blue-500/30',
      'AI & ML':  'from-pink-500/20 to-pink-600/10 text-pink-600 dark:text-pink-300 border-pink-400/50 dark:border-pink-500/30',
      Mobile:     'from-cyan-500/20 to-cyan-600/10 text-cyan-600 dark:text-cyan-300 border-cyan-400/50 dark:border-cyan-500/30',
      DevOps:     'from-green-500/20 to-green-600/10 text-green-600 dark:text-green-300 border-green-400/50 dark:border-green-500/30',
      Security:   'from-orange-500/20 to-orange-600/10 text-orange-600 dark:text-orange-300 border-orange-400/50 dark:border-orange-500/30',
    }
    return map[cat] ?? 'from-gray-500/20 to-gray-600/10 text-gray-600 dark:text-gray-300 border-gray-400/50 dark:border-gray-500/30'
  }

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    })

  // A post is readable if it has internal content OR an external link
  const hasContent = (post: typeof blogPosts[0]) =>
    (post.content && post.content.length > 0) || (post.link && post.link !== '#')

  const getLink = (post: typeof blogPosts[0]) => {
    if (post.content && post.content.length > 0) return `/blog/${post.id}`
    if (post.link && post.link !== '#') return post.link
    return null
  }

  const handleClick = (e: React.MouseEvent, postId: string, post: typeof blogPosts[0]) => {
    if (!hasContent(post)) {
      e.preventDefault()
      setToastId(postId)
      setTimeout(() => setToastId(null), 2000)
    }
  }

  const ReadMoreButton = ({ post, toastKey, className }: {
    post: typeof blogPosts[0]
    toastKey: string
    className: string
  }) => {
    const link = getLink(post)
    const isExternal = link && !link.startsWith('/')
    const isComingSoon = toastId === toastKey

    if (link) {
      return (
        <Link
          href={link}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className={className}
        >
          {isComingSoon ? '✨ Coming Soon' : 'Read more →'}
        </Link>
      )
    }

    return (
      <button
        onClick={(e) => handleClick(e, toastKey, post)}
        className={className}
      >
        {isComingSoon ? '✨ Coming Soon' : 'Read more →'}
      </button>
    )
  }

  const readMoreClass = (post: typeof blogPosts[0]) =>
    `flex items-center gap-1 font-semibold text-xs px-3 py-1.5 rounded-full transition-all duration-200 ${
      hasContent(post)
        ? 'bg-purple-600 dark:bg-purple-600/30 text-white dark:text-purple-300 hover:bg-purple-700 dark:hover:bg-purple-600/60 hover:shadow-lg hover:shadow-purple-500/30 cursor-pointer border border-purple-600 dark:border-purple-500/40'
        : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-500 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/10 hover:text-gray-700 dark:hover:text-gray-300 border border-gray-200 dark:border-white/10'
    }`

  const readMoreClassWide = (post: typeof blogPosts[0]) =>
    `w-full text-center text-xs font-semibold py-2 rounded-lg transition-all duration-200 ${
      hasContent(post)
        ? 'bg-purple-600 dark:bg-purple-600/20 text-white dark:text-purple-300 hover:bg-purple-700 dark:hover:bg-purple-600/40 hover:shadow-lg hover:shadow-purple-500/30 cursor-pointer border border-purple-600 dark:border-purple-500/30'
        : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-500 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/10 hover:text-gray-700 dark:hover:text-gray-300 border border-gray-200 dark:border-white/10'
    }`

  return (
    <section className="py-20 px-8 section-gradient" id="blog">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 mt-8">
          My <span className="gradient-text">Blog</span>
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-16">
          Thoughts, tutorials, and deep-dives on the tech I love
        </p>

        {/* Featured Posts */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl">⭐</span>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Posts</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {featured.map(post => (
              <div
                key={post.id}
                className="relative glass-card bg-white/70 dark:bg-white/5 p-6 group hover:bg-white dark:hover:bg-white/10 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 border border-gray-200/50 dark:border-transparent hover:border-purple-400 dark:hover:border-purple-500/40 transition-all duration-300 flex flex-col gap-4 overflow-hidden backdrop-blur-sm"
              >
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="flex items-start justify-between gap-4">
                  <span className="text-4xl">{post.emoji}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border bg-linear-to-r ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors duration-200 mb-2 leading-snug">
                    {post.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 rounded text-xs border border-gray-200 dark:border-white/10">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 mt-auto pt-2 border-t border-gray-200 dark:border-white/5">
                  <span>📅 {formatDate(post.date)}</span>
                  <span>⏱ {post.readTime}</span>
                  <ReadMoreButton
                    post={post}
                    toastKey={post.id}
                    className={readMoreClass(post)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-linear-to-r from-pink-500 to-purple-600 text-white border-transparent shadow-lg shadow-purple-500/30 scale-105'
                  : 'glass-card bg-white/60 dark:bg-white/5 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-transparent hover:bg-purple-50 dark:hover:bg-white/10 hover:text-purple-600 dark:hover:text-purple-300 hover:border-purple-400 dark:hover:border-purple-500/40 hover:scale-105'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* All Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(post => (
            <div
              key={post.id}
              className="glass-card bg-white/70 dark:bg-white/5 p-5 group hover:bg-white dark:hover:bg-white/10 hover:scale-[1.03] hover:shadow-xl hover:shadow-purple-500/20 border border-gray-200/50 dark:border-transparent hover:border-purple-400 dark:hover:border-purple-500/30 transition-all duration-300 flex flex-col gap-3 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{post.emoji}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-linear-to-r ${getCategoryColor(post.category)}`}>
                  {post.category}
                </span>
              </div>

              <h4 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors duration-200 leading-snug">
                {post.title}
              </h4>

              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 flex-1">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-500 rounded text-xs border border-gray-200 dark:border-white/5">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 pt-2 border-t border-gray-200 dark:border-white/5">
                <span>{formatDate(post.date)}</span>
                <span>{post.readTime}</span>
              </div>

              <ReadMoreButton
                post={post}
                toastKey={'g-' + post.id}
                className={readMoreClassWide(post)}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="https://dev.to"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 glass-card bg-white/70 dark:bg-white/5 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 dark:hover:bg-white/10 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 text-gray-900 dark:text-white border border-gray-200 dark:border-transparent hover:border-purple-400 dark:hover:border-purple-500/30"
          >
            <span>View All Posts</span>
            <span className="text-purple-600 dark:text-purple-400">→</span>
          </a>
        </div>

      </div>
    </section>
  )
}