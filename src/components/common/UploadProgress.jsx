import React from 'react'

const UploadProgress = ({ progress, fileName }) => {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold text-white truncate">{fileName}</p>
        <span className="text-xs text-cyan-300 font-semibold">{progress}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 transition-all duration-300 shadow-[0_0_12px_-4px] shadow-cyan-400"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

export default UploadProgress

