import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'

export default function ProductCard({ product }) {
  const { isWishlisted, toggleWishlist } = useWishlist()
  const wishlisted = isWishlisted(product.id)
  const finalPrice = product.discount
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : product.price.toFixed(2)

  return (
    <div className="group relative">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-cream-dark">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          {product.discount > 0 && (
            <span className="absolute left-3 top-3 bg-rust px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-cream">
              -{product.discount}%
            </span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault()
              toggleWishlist(product)
            }}
            aria-label="Toggle wishlist"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-cream/90 text-charcoal transition-colors hover:bg-cream"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={wishlisted ? '#A8562F' : 'none'}
              stroke={wishlisted ? '#A8562F' : 'currentColor'}
              strokeWidth="1.8"
            >
              <path d="M12 20s-7-4.35-9.5-8.5C.8 8.2 2.3 4.5 6 4.5c2.1 0 3.5 1.3 4.5 2.6C11.5 5.8 12.9 4.5 15 4.5c3.7 0 5.2 3.7 3.5 7C18 15.65 12 20 12 20Z" />
            </svg>
          </button>
        </div>

        <div className="mt-3 space-y-1">
          <p className="text-xs uppercase tracking-wide text-stone">{product.category}</p>
          <h3 className="text-sm font-medium text-charcoal group-hover:text-rust">{product.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-charcoal">${finalPrice}</span>
            {product.discount > 0 && (
              <span className="text-xs text-stone line-through">${product.price.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
