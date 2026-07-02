import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import products from '../data/products.json'
import QuantitySelector from '../components/QuantitySelector'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find((p) => p.id === id)
  const { addToCart } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()

  const [quantity, setQuantity] = useState(1)
  const [color, setColor] = useState(product?.colors?.[0])
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="mx-auto max-w-md px-5 py-24 text-center">
        <h2 className="font-display text-2xl text-charcoal">Product not found</h2>
        <Link to="/" className="mt-6 inline-block bg-charcoal px-6 py-3 text-sm text-cream hover:bg-rust">
          Back to shop
        </Link>
      </div>
    )
  }

  const finalPrice = product.discount
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : product.price.toFixed(2)

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  function handleAddToCart() {
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <button onClick={() => navigate(-1)} className="mb-6 text-sm text-stone hover:text-rust">
        ← Back
      </button>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="aspect-[4/5] overflow-hidden bg-cream-dark">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-stone">{product.category}</p>
          <h1 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">{product.name}</h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-xl font-semibold text-charcoal">${finalPrice}</span>
            {product.discount > 0 && (
              <>
                <span className="text-sm text-stone line-through">${product.price.toFixed(2)}</span>
                <span className="bg-rust px-2 py-0.5 text-xs font-semibold text-cream">-{product.discount}%</span>
              </>
            )}
          </div>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-charcoal-soft">{product.description}</p>

          {product.colors?.length > 0 && (
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-stone">Color</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`border px-3 py-1.5 text-xs transition-colors ${
                      color === c ? 'border-charcoal bg-charcoal text-cream' : 'border-stone-light text-charcoal-soft hover:border-charcoal'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-stone">Quantity</p>
            <div className="mt-2">
              <QuantitySelector quantity={quantity} onChange={setQuantity} />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-charcoal px-6 py-3.5 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-rust sm:flex-none sm:px-10"
            >
              {added ? 'Added ✓' : 'Add to cart'}
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`border px-6 py-3.5 text-sm font-medium tracking-wide transition-colors ${
                isWishlisted(product.id)
                  ? 'border-rust bg-rust/10 text-rust'
                  : 'border-stone-light text-charcoal-soft hover:border-charcoal'
              }`}
            >
              {isWishlisted(product.id) ? 'Wishlisted ✓' : 'Add to wishlist'}
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-8 font-display text-2xl text-charcoal">You might also like</h2>
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
