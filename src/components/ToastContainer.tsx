import type { ToastContainerProps } from '../types'

function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="toasts">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          <span>{t.message}</span>
          <button onClick={() => onClose(t.id)} aria-label="Close">
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

export default ToastContainer
