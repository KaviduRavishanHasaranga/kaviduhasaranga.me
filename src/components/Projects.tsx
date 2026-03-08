import React from 'react'
import { projects } from '@/data/projects'
import ScrollAnimation from './ScrollAnimation'

export default function Projects() {
  return (
    <section className="py-20 px-8 section-gradient" id="projects">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimation>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 mt-8">
            Projects & <span className="gradient-text">Showcase</span>
          </h2>
          <p className="text-center text-gray-400 mb-16">Some of my recent work</p>
        </ScrollAnimation>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ScrollAnimation 
              key={index} 
              delay={index * 0.15}
              direction={index % 2 === 0 ? 'left' : 'right'}
            >
              <div className="glass-card p-6 hover:bg-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 hover:border-purple-500/50 border border-transparent transition-all duration-300 group h-full">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm hover:bg-purple-500/30 hover:scale-110 transition-all duration-200">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <a href={project.github} className="text-purple-400 hover:text-purple-300 hover:underline hover:scale-110 transition-all duration-200 flex items-center gap-2">
                    <span className="group-hover:scale-125 transition-transform duration-200">🔗</span>
                    <span>GitHub</span>
                  </a>
                  <button className="text-blue-400 hover:text-blue-300 hover:underline hover:scale-110 transition-all duration-200 flex items-center gap-2">
                    <span>🚀</span>
                    <span>Live Demo</span>
                  </button>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
        
        <ScrollAnimation delay={0.4}>
          <div className="text-center mt-12">
            <button className="glass-card px-8 py-3 rounded-full font-semibold hover:bg-white/10 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300">
              View All Projects →
            </button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
