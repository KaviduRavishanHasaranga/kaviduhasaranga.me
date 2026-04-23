'use client'

import React, { useState } from 'react'
import { certifications, achievements } from '@/data/certifications'
import ScrollAnimation from './ScrollAnimation'

export default function Certifications() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <section className="py-20 px-8" id="certifications">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <ScrollAnimation>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 mt-8">
            Certifications &amp; <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-center text-gray-400 mb-16">
            Milestones that define my learning journey
          </p>
        </ScrollAnimation>

        {/* Certifications */}
        <ScrollAnimation>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
            <span className="text-3xl">🎓</span> Certifications
          </h3>
        </ScrollAnimation>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {certifications.map((cert, index) => (
            <ScrollAnimation key={index} delay={index * 0.1} direction={index % 2 === 0 ? 'left' : 'right'}>
              <div className="glass-card overflow-hidden hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group h-full flex flex-col">

                {/* Certificate top accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500" />

                <div className="p-6 flex flex-col gap-4 flex-1">
                  {/* Issuer*/}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">
                      {cert.issuer}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">
                    {cert.title}
                  </h4>

                  {/* Divider */}
                  <div className="border-t border-dashed border-gray-300 dark:border-gray-700" />

                  {/* Meta info */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <span>📅</span> {cert.date}
                    </span>
                    {cert.verificationCode && (
                      <button
                        onClick={() => copyToClipboard(cert.verificationCode!)}
                        title="Click to copy verification code"
                        className="flex items-center gap-1.5 group/copy cursor-copy"
                      >
                        <span>🔑</span>
                        <span className="font-mono text-xs bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded text-gray-700 dark:text-gray-300 group-hover/copy:bg-purple-500/20 group-hover/copy:text-purple-300 transition-colors duration-200">
                          {copiedCode === cert.verificationCode ? '✅ Copied!' : cert.verificationCode}
                        </span>
                        <span className="text-gray-400 dark:text-gray-600 group-hover/copy:text-purple-400 transition-colors duration-200 text-xs">
                          {copiedCode === cert.verificationCode ? '' : '⧉'}
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Credential link */}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors group/link"
                    >
                      <span>Verify Credential</span>
                      <span className="group-hover/link:translate-x-1 transition-transform duration-200">→</span>
                    </a>
                  )}
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Achievements */}
        <ScrollAnimation>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
            <span className="text-3xl">🏆</span> Achievements
          </h3>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((ach, index) => (
            <ScrollAnimation key={index} delay={index * 0.1} direction={index % 2 === 0 ? 'left' : 'right'}>
              <div className="glass-card overflow-hidden hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 group h-full flex flex-col">

                {/* Achievement top accent */}
                <div className="h-1 w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500" />

                <div className="p-6 flex flex-col gap-3 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-base font-bold text-gray-900 dark:text-white leading-snug">
                      {ach.title}
                    </h4>
                    {ach.badge && (
                      <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                        {ach.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1">
                    {ach.description}
                  </p>

                  <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-auto pt-2 border-t border-dashed border-gray-300 dark:border-gray-700">
                    <span>📅</span> {ach.date}
                  </span>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

      </div>
    </section>
  )
}
