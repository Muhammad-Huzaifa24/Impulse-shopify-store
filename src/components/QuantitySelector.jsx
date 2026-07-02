export default function QuantitySelector({ quantity, onChange, size = 'md' }) {
  const dims = size === 'sm' ? 'h-8 w-8 text-sm' : 'h-10 w-10 text-base'

  return (
    <div className="inline-flex items-center border border-stone-light">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, quantity - 1))}
        className={`${dims} flex items-center justify-center text-charcoal transition-colors hover:bg-cream-dark`}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className={`${dims} flex items-center justify-center border-x border-stone-light text-charcoal`}>
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(quantity + 1)}
        className={`${dims} flex items-center justify-center text-charcoal transition-colors hover:bg-cream-dark`}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  )
}
