'use client'

import { motion, AnimatePresence, useMotionValue, useTransform, animate, useMotionValueEvent } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Props {
  isLoading: boolean
}

export default function PageLoader({ isLoading }: Props) {
  const progress = useMotionValue(0)
  const [percent, setPercent] = useState(0)
  const progressWidth = useTransform(progress, (value) => `${value}%`)

  useMotionValueEvent(progress, "change", (latest) => {
    setPercent(Math.round(latest))
  })

  useEffect(() => {
    if (isLoading) {
      const controls = animate(progress, 100, {
        duration: 1.5,
        ease: "easeInOut",
      })
      return controls.stop
    }
  }, [isLoading, progress])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-linear-to-br from-gray-50 via-white to-gray-50 dark:from-[#0a0a1f] dark:via-[#1a0a2e] dark:to-[#0a0a1f]"
        >
          <div className="flex flex-col items-center gap-6">
            {/* Animated Logo/Initial */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative flex flex-col items-center gap-3"
            >
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="w-20 h-20 rounded-full border-4 border-transparent border-t-purple-600 border-r-pink-500"
              />
              
              {/* Name */}
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white"
              >
                Kavidu <span className="gradient-text">Hasaranga</span>
              </motion.h1>
            </motion.div>

            {/* Loading Text with Percentage */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <span className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                Loading
              </span>
              <motion.span className="text-purple-600 dark:text-purple-400 font-bold text-lg min-w-12 text-center">
                {percent}%
              </motion.span>
            </motion.div>

            {/* Progress Bar */}
            <div className="h-2 w-full bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
              <motion.div
                style={{ width: progressWidth }}
                className="h-full bg-linear-to-r from-pink-500 via-purple-600 to-purple-600"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
