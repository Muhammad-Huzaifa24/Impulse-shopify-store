import { Link } from 'react-router-dom'

export default function EmptyState({ title, message, ctaLabel = 'Continue shopping', ctaTo = '/' }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-5 py-24 text-center">
      <h2 className="font-display text-2xl text-charcoal">{title}</h2>
      <p className="mt-2 text-sm text-stone">{message}</p>
      <Link
        to={ctaTo}
        className="mt-6 bg-charcoal px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-rust"
      >
        {ctaLabel}
      </Link>
    </div>
  )
}
