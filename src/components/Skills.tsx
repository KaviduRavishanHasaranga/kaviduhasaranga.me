import React from 'react'
import { skills } from '@/data/skills'
import ScrollAnimation from './ScrollAnimation'

export default function Skills() {
  return (
    <section className="py-20 px-8" id="skills">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimation>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 mt-8">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-center text-gray-400 mb-16">Technologies I work with</p>
        </ScrollAnimation>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skillGroup, index) => (
            <ScrollAnimation 
              key={index} 
              delay={index * 0.1}
              direction={index % 2 === 0 ? 'left' : 'right'}
            >
              <div className="glass-card p-6 hover:bg-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 group cursor-default h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">{skillGroup.icon}</span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{skillGroup.category}</h3>
                </div>
                <div className="space-y-3">
                  {skillGroup.items.map((skill, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">{skill.name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        skill.level === 'Advanced' ? 'bg-green-500/20 text-green-400' :
                        skill.level === 'Intermediate' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
