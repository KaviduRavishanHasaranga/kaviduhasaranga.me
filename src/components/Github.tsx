'use client'

import React, { useState, useEffect } from 'react'

interface GitHubStats {
  repos: number
  stars: number
  followers: number
  loading: boolean
}

export default function Github() {
  const [stats, setStats] = useState<GitHubStats>({
    repos: 0,
    stars: 0,
    followers: 0,
    loading: true
  })

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const username = 'KaviduRavishanHasaranga'
        
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`)
        const userData = await userResponse.json()
        
        // Fetch repositories to calculate total stars
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
        const reposData = await reposResponse.json()
        
        const totalStars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0)
        
        setStats({
          repos: userData.public_repos || 0,
          stars: totalStars,
          followers: userData.followers || 0,
          loading: false
        })
      } catch (error) {
        console.error('Error fetching GitHub stats:', error)
        // Fallback to default values on error
        setStats({
          repos: 25,
          stars: 50,
          followers: 100,
          loading: false
        })
      }
    }

    fetchGitHubStats()
  }, [])

  return (
    <section className="py-20 px-8" id="github">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 mt-8">
          Github & <span className="gradient-text">Open Source</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-card p-8 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-4">📊 GitHub Activity</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Repositories</span>
                <span className="text-2xl font-bold text-purple-400">
                  {stats.loading ? '...' : stats.repos}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Followers</span>
                <span className="text-2xl font-bold text-purple-400">
                  {stats.loading ? '...' : stats.followers}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Stars Received</span>
                <span className="text-2xl font-bold text-purple-400">
                  {stats.loading ? '...' : stats.stars}
                </span>
              </div>
            </div>
            <a href="https://github.com/KaviduRavishanHasaranga" className="mt-6 inline-block bg-linear-to-r from-pink-500 to-purple-600 px-6 py-2 rounded-full text-white font-semibold hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300">
              Visit GitHub Profile
            </a>
          </div>
          
          <div className="glass-card p-8 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-4">🤝 Open Source</h3>
            <p className="text-gray-300 mb-4">
              I actively contribute to open source projects and believe in the power of community-driven development.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-purple-400">✓</span>
                <span>Contributor to various React libraries</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">✓</span>
                <span>Maintainer of personal open source tools</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">✓</span>
                <span>Active in developer communities</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
