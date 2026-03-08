'use client'

import { ThemeProvider } from "@/context/ThemeContext"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import PageLoader from "@/components/PageLoader"
import { Suspense, useState, useEffect } from "react"
import { usePathname } from 'next/navigation'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isBlogPost = pathname?.startsWith('/blog/')
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Wait for initial content to load
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500) // Show loader for 1.5 seconds

    return () => clearTimeout(timer)
  }, [])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider>
        <PageLoader isLoading={isLoading} />
        {!isBlogPost && <Navbar />}
        <main className="min-h-screen">{children}</main>
        {!isBlogPost && <Footer />}
      </ThemeProvider>
    </Suspense>
  )
}
