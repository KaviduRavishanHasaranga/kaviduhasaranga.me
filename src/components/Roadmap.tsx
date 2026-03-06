import React from 'react'

export default function Roadmap() {
  const goals = [
    {
      period: "Q1 2026",
      title: "Master Advanced React Patterns",
      items: [
        "Deep dive into React Server Components",
        "Advanced state management with Zustand",
        "Performance optimization techniques"
      ]
    },
    {
      period: "Q2 2026",
      title: "Expand Backend Expertise",
      items: [
        "Microservices architecture",
        "GraphQL advanced patterns",
        "Cloud infrastructure (AWS/Azure)"
      ]
    },
    {
      period: "Q3 2026",
      title: "Launch Personal SaaS Product",
      items: [
        "Ideation and market research",
        "MVP development",
        "Beta testing and launch"
      ]
    },
    {
      period: "Q4 2026",
      title: "Contribute to Open Source",
      items: [
        "Maintain 2+ open source projects",
        "Contribute to major frameworks",
        "Build developer tools"
      ]
    }
  ]

  return (
    <section className="py-20 px-8 section-gradient" id="roadmap">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 mt-8">
          Future Goals & <span className="gradient-text">Roadmap</span>
        </h2>
        <p className="text-center text-gray-400 mb-16">My journey ahead</p>
        
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-linear-to-b from-pink-500 via-purple-600 to-blue-500 rounded-full"></div>
          
          <div className="space-y-12">
            {goals.map((goal, index) => (
              <div key={index} className={`relative flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start gap-8`}>
                {/* Timeline marker */}
                <div className="absolute left-8 md:left-1/2 w-6 h-6 bg-purple-500 rounded-full -ml-3 ring-4 ring-purple-900 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} pl-20 md:pl-0`}>
                  <div className="glass-card p-6 hover:bg-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 cursor-default">
                    <span className="inline-block bg-linear-to-r from-pink-500 to-purple-600 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                      {goal.period}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-4">{goal.title}</h3>
                    <ul className="space-y-2">
                      {goal.items.map((item, idx) => (
                        <li key={idx} className="text-gray-300 flex items-start gap-2">
                          <span className="text-purple-400 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="hidden md:block w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
