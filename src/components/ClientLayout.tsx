'use client'

import { ThemeProvider } from "@/context/ThemeContext"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Suspense } from "react"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </ThemeProvider>
    </Suspense>
  )
}
