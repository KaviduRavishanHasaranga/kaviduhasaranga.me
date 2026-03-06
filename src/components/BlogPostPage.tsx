'use client'

import React from 'react'
import Link from 'next/link'
import { BlogPost, ContentSection } from '@/data/blogs'

interface Props {
  post: BlogPost
}

function CodeBlock({ text, language }: { text: string; language?: string }) {
  return (
    <div className="my-6 rounded-xl overflow-hidden border border-white/10">
      {language && (
        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
          <span className="text-xs font-mono text-purple-300">{language}</span>
          <span className="w-2 h-2 rounded-full bg-purple-400/60" />
        </div>
      )}
      <pre className="overflow-x-auto p-5 bg-black/40 text-sm leading-relaxed">
        <code className="font-mono text-gray-200 whitespace-pre">{text}</code>
      </pre>
    </div>
  )
}

function Callout({ text, variant = 'info' }: { text: string; variant?: ContentSection['variant'] }) {
  const styles = {
    info:    { border: 'border-blue-500/40',   bg: 'bg-blue-500/10',   icon: 'ℹ️',  label: 'Note',    text: 'text-blue-300' },
    tip:     { border: 'border-green-500/40',  bg: 'bg-green-500/10',  icon: '💡', label: 'Tip',     text: 'text-green-300' },
    warning: { border: 'border-yellow-500/40', bg: 'bg-yellow-500/10', icon: '⚠️', label: 'Warning', text: 'text-yellow-300' },
  }
  const s = styles[variant ?? 'info']
  return (
    <div className={`my-6 rounded-xl border ${s.border} ${s.bg} p-5 flex gap-3`}>
      <span className="text-xl shrink-0 mt-0.5">{s.icon}</span>
      <div>
        <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${s.text}`}>{s.label}</p>
        <p className="text-gray-300 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  )
}

function renderSection(section: ContentSection, index: number) {
  switch (section.type) {
    case 'intro':
      return (
        <p key={index} className="text-lg text-gray-300 leading-relaxed mb-8 border-l-4 border-purple-500/50 pl-5 italic">
          {section.text}
        </p>
      )
    case 'heading':
      return (
        <h2 key={index} className="text-2xl font-bold text-white mt-12 mb-4 flex items-center gap-3">
          <span className="w-1 h-7 rounded-full bg-gradient-to-b from-pink-500 to-purple-600 shrink-0" />
          {section.text}
        </h2>
      )
    case 'subheading':
      return (
        <h3 key={index} className="text-xl font-semibold text-purple-200 mt-8 mb-3">
          {section.text}
        </h3>
      )
    case 'paragraph':
      return (
        <p key={index} className="text-gray-300 leading-relaxed mb-5">
          {section.text}
        </p>
      )
    case 'code':
      return <CodeBlock key={index} text={section.text ?? ''} language={section.language} />
    case 'list':
      return (
        <ul key={index} className="my-5 space-y-2 pl-1">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      )
    case 'callout':
      return <Callout key={index} text={section.text ?? ''} variant={section.variant} />
    default:
      return null
  }
}

export default function BlogPostPage({ post }: Props) {
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    })

  const getCategoryColor = (cat: string) => {
    const map: Record<string, string> = {
      Backend:    'bg-purple-500/20 text-purple-300 border-purple-500/30',
      Blockchain: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'AI & ML':  'bg-pink-500/20 text-pink-300 border-pink-500/30',
      Mobile:     'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      DevOps:     'bg-green-500/20 text-green-300 border-green-500/30',
      Security:   'bg-orange-500/20 text-orange-300 border-orange-500/30',
    }
    return map[cat] ?? 'bg-gray-500/20 text-gray-300 border-gray-500/30'
  }

  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0a0a1f 0%, #1a0a2e 50%, #0a0a1f 100%)' }}>

      {/* Top nav bar */}
      <div className="fixed top-0 left-0 right-0 z-50 mx-2 sm:mx-4 mt-2 sm:mt-4">
        <div className="glass-card border border-white/10 rounded-2xl px-6 py-3 flex items-center justify-between max-w-4xl mx-auto">
          <Link href="/" className="text-xl font-bold gradient-text">KR</Link>
          <Link
            href="/#blog"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-purple-300 transition-colors duration-200"
          >
            <span>←</span>
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">

        {/* Hero */}
        <div className="mb-12 text-center">
          <div className="text-7xl mb-6">{post.emoji}</div>

          <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(post.category)}`}>
              {post.category}
            </span>
            <span className="text-gray-500 text-xs">·</span>
            <span className="text-gray-400 text-xs">{formatDate(post.date)}</span>
            <span className="text-gray-500 text-xs">·</span>
            <span className="text-gray-400 text-xs">⏱ {post.readTime}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-gray-400 text-base leading-relaxed max-w-2xl mx-auto">
            {post.excerpt}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent mb-12" />

        {/* Article content */}
        <article className="prose-invert">
          {post.content?.map((section, index) => renderSection(section, index))}
        </article>

        {/* Tags */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">Tags</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-white/5 text-gray-400 rounded-lg text-sm border border-white/10 hover:border-purple-500/40 hover:text-purple-300 transition-colors duration-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author card */}
        <div className="mt-10 glass-card p-6 flex items-center gap-5 border border-white/10">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shrink-0">
            K
          </div>
          <div>
            <p className="font-semibold text-white">Kavidu Hasaranga</p>
            <p className="text-sm text-gray-400 mt-0.5">
              Full Stack Developer · AI & ML Enthusiast · Blockchain Developer
            </p>
          </div>
          <Link
            href="/#contact"
            className="ml-auto px-4 py-2 rounded-full text-sm font-medium glass-card hover:bg-white/10 text-purple-300 border border-purple-500/30 hover:scale-105 transition-all duration-200 whitespace-nowrap"
          >
            Get in Touch
          </Link>
        </div>

        {/* Back link */}
        <div className="mt-12 text-center">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-300 transition-colors duration-200 text-sm"
          >
            <span>←</span>
            <span>Back to all posts</span>
          </Link>
        </div>

      </div>
    </main>
  )
}
