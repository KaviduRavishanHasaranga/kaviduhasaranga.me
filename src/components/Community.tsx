import React from 'react'

export default function Community() {
  return (
    <section className="py-20 px-8 section-gradient" id="community">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          <span className="gradient-text">Right Community</span>
        </h2>
        <div className="glass-card p-12 max-w-3xl mx-auto">
          <div className="text-6xl mb-6">🌟</div>
          <p className="text-xl text-gray-300 mb-8">
            I believe in the power of community and collaboration. Let&apos;s connect and build amazing things together!
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">💬</div>
              <p className="text-sm text-gray-400">Active Discussions</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">👥</div>
              <p className="text-sm text-gray-400">Networking</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📚</div>
              <p className="text-sm text-gray-400">Knowledge Sharing</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <p className="text-sm text-gray-400">Goal Oriented</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
