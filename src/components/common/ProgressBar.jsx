import React, { useState, useEffect } from 'react'

const ProgressBar = ({ value, max, showLabel = false, animated = true }) => {
  const [displayPercent, setDisplayPercent] = useState(0)
  const percent = Math.min(Math.round((value / max) * 100), 100)

  useEffect(() => {
    if (animated) {
      // Smooth animation to target percent
      const duration = 1000 // 1 second
      const steps = 60
      const increment = percent / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= percent) {
          setDisplayPercent(percent)
          clearInterval(timer)
        } else {
          setDisplayPercent(Math.round(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    } else {
      setDisplayPercent(percent)
    }
  }, [percent, animated])

  return (
    <div className="w-full">
      {showLabel && (
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-slate-300">Progress</span>
          <span className="font-semibold text-cyan-300">{displayPercent}%</span>
        </div>
      )}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10 shadow-inner">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 shadow-[0_0_18px_-6px] shadow-cyan-400 transition-all duration-1000 ease-out relative overflow-hidden"
          style={{ 
            width: `${displayPercent}%`,
            animation: animated ? 'progress 1s ease-out' : 'none'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  )
}

export default ProgressBar

