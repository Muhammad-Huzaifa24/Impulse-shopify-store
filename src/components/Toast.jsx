import { useEffect } from 'react'

export default function Toast({ message, type = 'success', onClose, duration = 4000 }) {
  useEffect(() => {
    const t = setTimeout(onClose, duration)
    return () => clearTimeout(t)
  }, [onClose, duration])

  const styles = {
    success: 'border-olive/40 bg-cream text-charcoal',
    error: 'border-rust/40 bg-cream text-charcoal',
  }

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 px-4">
      <div
        className={`flex items-center gap-3 border px-4 py-3 shadow-lg ${styles[type]}`}
        role="status"
      >
        {type === 'success' ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7156" strokeWidth="2" className="shrink-0">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A8562F" strokeWidth="2" className="shrink-0">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5M12 16h.01" />
          </svg>
        )}
        <span className="text-sm">{message}</span>
        <button onClick={onClose} className="ml-2 text-stone hover:text-charcoal" aria-label="Dismiss">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>
  )
}
