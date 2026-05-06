'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import type { Components } from 'react-markdown'

interface Props {
  content: string
}

export default function MarkdownRenderer({ content }: Props) {
  const components: Components = {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4 flex items-center gap-3">
        <span className="w-1 h-7 rounded-full bg-gradient-to-b from-pink-500 to-purple-600 shrink-0 inline-block" />
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mt-8 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-2">
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5 text-[15px]">
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 underline underline-offset-2 transition-colors duration-200"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-gray-700 dark:text-gray-300">{children}</em>
    ),
    ul: ({ children }) => (
      <ul className="my-5 space-y-2 pl-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="my-5 space-y-2 pl-5 list-decimal">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-[15px] leading-relaxed">
        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-500 dark:bg-purple-400 shrink-0 inline-block" />
        <span>{children}</span>
      </li>
    ),
    blockquote: ({ children }) => (
      <div className="my-6 rounded-xl border border-blue-400/40 bg-blue-50 dark:bg-blue-500/10 p-5 flex gap-3">
        <span className="text-xl shrink-0 mt-0.5">💡</span>
        <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed [&>p]:mb-0">
          {children}
        </div>
      </div>
    ),
    hr: () => (
      <hr className="my-10 border-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 dark:via-purple-500/40 to-transparent" />
    ),
    table: ({ children }) => (
      <div className="my-6 overflow-x-auto rounded-xl border border-gray-200 dark:border-white/10">
        <table className="w-full text-sm text-left">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wider">
        {children}
      </thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-gray-200 dark:divide-white/5">{children}</tbody>
    ),
    tr: ({ children }) => (
      <tr className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">{children}</tr>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 font-semibold">{children}</th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{children}</td>
    ),
    code: ({ className, children, ...props }) => {
      // Inline code (no className means no language specified by rehype-highlight)
      const isInline = !className
      if (isInline) {
        return (
          <code
            className="px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 font-mono text-[13px]"
            {...props}
          >
            {children}
          </code>
        )
      }
      // Block code — styled by rehype-highlight + our CSS
      return (
        <code className={`${className ?? ''} font-mono text-sm`} {...props}>
          {children}
        </code>
      )
    },
    pre: ({ children, ...props }) => {
      // Extract language from child code element
      const codeEl = React.Children.toArray(children).find(
        (c): c is React.ReactElement => React.isValidElement(c) && c.type === 'code',
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const className = (codeEl?.props as any)?.className ?? ''
      const lang = (className.match(/language-(\w+)/) ?? [])[1] ?? ''

      return (
        <div className="my-6 rounded-xl overflow-hidden border border-gray-200/30 dark:border-white/10">
          {lang && (
            <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-white/5 border-b border-gray-200/30 dark:border-white/10">
              <span className="text-xs font-mono text-purple-600 dark:text-purple-300">{lang}</span>
              <span className="w-2 h-2 rounded-full bg-purple-500 dark:bg-purple-400/60" />
            </div>
          )}
          <pre
            className="overflow-x-auto p-5 bg-gray-50 dark:bg-black/40 text-sm leading-relaxed"
            {...props}
          >
            {children}
          </pre>
        </div>
      )
    },
    // Renders images embedded in markdown inline — with rounded corners, shadow, and caption.
    // Supports optional size via title: ![alt](src "400x300") or ![alt](src "400x") or ![alt](src "x300")
    img: ({ src, alt, title }) => {
      const sizeMatch = title?.match(/^(\d*)x(\d*)$/)
      const imgWidth  = sizeMatch?.[1] ? Number(sizeMatch[1]) : undefined
      const imgHeight = sizeMatch?.[2] ? Number(sizeMatch[2]) : undefined
      // Don't show the raw "WxH" string as a caption
      const caption = sizeMatch ? alt : (title ?? alt)

      return (
        <figure className="my-8" style={{ maxWidth: imgWidth ? `${imgWidth}px` : undefined }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt ?? ''}
            width={imgWidth}
            height={imgHeight}
            className={`rounded-xl border border-gray-200 dark:border-white/10 shadow-lg shadow-purple-500/10 object-cover${imgWidth ? '' : ' w-full'}`}
            loading="lazy"
          />
          {caption && (
            <figcaption className="mt-2 text-center text-xs text-gray-500 dark:text-gray-500 italic">
              {caption}
            </figcaption>
          )}
        </figure>
      )
    },
  }

  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
