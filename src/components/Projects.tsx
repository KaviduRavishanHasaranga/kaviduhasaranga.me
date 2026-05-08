'use client'

import React from 'react'
import Link from 'next/link'
import { projects } from '@/data/projects'
import ScrollAnimation from './ScrollAnimation'

export default function Projects() {
  return (
    <section className="py-12 md:py-20 px-4 md:px-8 section-gradient" id="projects">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimation>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 mt-8">
            Projects &amp; <span className="gradient-text">Showcase</span>
          </h2>
          <p className="text-center text-gray-400 mb-16">Some of my recent work</p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <ScrollAnimation
              key={index}
              delay={index * 0.15}
              direction={index % 2 === 0 ? 'left' : 'right'}
            >
              <div className="bg-white/5 border border-white/10 hover:border-white/20 hover:shadow-xl hover:shadow-black/30 transition-all duration-300 group h-full flex flex-col rounded-2xl overflow-hidden">

                {/* ── Screenshot area ── */}
                <div
                  className="mx-3 mt-3 md:mx-4 md:mt-4 rounded-xl overflow-hidden bg-gray-900 border border-white/10 shrink-0"
                  style={{ height: 'clamp(140px, 35vw, 185px)' }}
                >
                  <Link
                  id={`project-details-${project.slug}`}
                  href={`/projects/${project.slug}`}
                  className="text-sm font-semibold text-white hover:text-purple-300 transition-colors duration-200 whitespace-nowrap"
                  >
                  {project.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-5xl opacity-20">🗂️</span>
                    </div>
                  )}
                  </Link>
                </div>

                {/* ── Card body ── */}
                <div className="flex flex-col flex-1 px-3 pt-3 pb-4 md:px-5 md:pt-4 md:pb-5">
                  {/* Title */}
                  <Link
                  id={`project-details-${project.slug}`}
                  href={`/projects/${project.slug}`}
                  className="text-sm font-semibold text-white hover:text-purple-300 transition-colors duration-200 whitespace-nowrap"
                  >
                  <h3 className="text-[17px] font-bold text-white leading-snug mb-2">
                    {project.title}
                  </h3>
                  </Link>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* ── Tech tags ── */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-full text-xs border border-white/15 text-gray-300 bg-transparent"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* ── Footer links ── */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/8 flex-wrap">
                    <Link
                      id={`project-details-${project.slug}`}
                      href={`/projects/${project.slug}`}
                      className="text-sm font-semibold text-white hover:text-purple-300 transition-colors duration-200 whitespace-nowrap"
                    >
                      View project →
                    </Link>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
                    >
                      GitHub
                    </a>
                    {project.github2 && (
                      <a
                        href={project.github2}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
                      >
                        GitHub 2
                      </a>
                    )}
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
                      >
                        Live demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation delay={0.4}>
          <div className="text-center mt-12">
            <a
              href="https://github.com/KaviduRavishanHasaranga"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card px-8 py-3 rounded-full font-semibold hover:bg-white/10 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 inline-block"
            >
              View All Projects →
            </a>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
