import React, { useEffect } from 'react'

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const typeStyles = {
    success: 'bg-emerald-500/20 border-emerald-400/50 text-emerald-100',
    error: 'bg-rose-500/20 border-rose-400/50 text-rose-100',
    warning: 'bg-amber-500/20 border-amber-400/50 text-amber-100',
    info: 'bg-cyan-500/20 border-cyan-400/50 text-cyan-100',
  }

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  }

  return (
    <div
      className={`relative flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur transition-all duration-300 ${typeStyles[type]}`}
      role="alert"
      style={{
        animation: 'slideInRight 0.3s ease-out',
      }}
    >
      <span className="text-lg font-bold">{icons[type]}</span>
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="ml-2 text-current opacity-70 hover:opacity-100 transition"
        aria-label="Yopish"
      >
        ×
      </button>
    </div>
  )
}

export default Toast

