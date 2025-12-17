import React from 'react'
import Toast from './Toast'

const ToastContainer = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          style={{
            top: `${index * 80}px`,
          }}
        >
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => onRemove(toast.id)}
            duration={toast.duration}
          />
        </div>
      ))}
    </div>
  )
}

export default ToastContainer

