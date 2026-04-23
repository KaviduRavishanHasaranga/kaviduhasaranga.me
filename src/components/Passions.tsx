import React from 'react'

export default function Passions() {
  const passions = [
    {
      icon: "💻",
      title: "Web Development",
      description: "Building scalable and performant web applications"
    },
    {
      icon: "🎨",
      title: "UI/UX Design",
      description: "Creating beautiful and intuitive user interfaces"
    },
    {
      icon: "🚀",
      title: "Innovation",
      description: "Exploring new technologies and methodologies"
    },
    {
      icon: "📚",
      title: "Continuous Learning",
      description: "Always expanding my knowledge and skills"
    }
  ]

  return (
    <section className="py-20 px-8 section-gradient" id="passions">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Passions & <span className="gradient-text">Experiences</span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {passions.map((passion, index) => (
            <div key={index} className="glass-card p-6 text-center hover:bg-white/10 transition group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition">{passion.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{passion.title}</h3>
              <p className="text-gray-400 text-sm">{passion.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
