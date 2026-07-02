import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import products from '../data/products.json'
import ProductCard from '../components/ProductCard'
import { useWishlist } from '../context/WishlistContext'

const CATEGORIES = ['All', ...new Set(products.map((p) => p.category))]
const MAX_PRICE = Math.max(...products.map((p) => p.price))

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { wishlist } = useWishlist()

  const showWishlistOnly = searchParams.get('wishlist') === '1'
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [category, setCategory] = useState(searchParams.get('category') || 'All')
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    setSearch(searchParams.get('search') || '')
    setCategory(searchParams.get('category') || 'All')
  }, [searchParams])

  const filtered = useMemo(() => {
    const base = showWishlistOnly ? wishlist : products
    return base.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'All' || p.category === category
      const matchesPrice = p.price <= maxPrice
      return matchesSearch && matchesCategory && matchesPrice
    })
  }, [search, category, maxPrice, showWishlistOnly, wishlist])

  function clearWishlistFilter() {
    searchParams.delete('wishlist')
    setSearchParams(searchParams)
  }

  return (
    <div>
      {!showWishlistOnly && (
        <section className="relative overflow-hidden border-b border-stone-light/60 bg-cream-dark">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rust">New arrivals</p>
              <h1 className="mt-4 font-display text-4xl leading-tight text-charcoal sm:text-5xl lg:text-6xl">
                Wear the season, not the trend.
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-charcoal-soft">
                Honest fabrics, considered cuts, and pieces built to earn their place in your rotation. Explore the current collection.
              </p>
              <a
                href="#collection"
                className="mt-8 inline-block bg-charcoal px-7 py-3 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-rust"
              >
                Shop the collection
              </a>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden lg:aspect-square">
              <img
                src="https://picsum.photos/seed/impulse-hero/1000/1000"
                alt="Impulse collection"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      <section id="collection" className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        {showWishlistOnly ? (
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-2xl text-charcoal">Your wishlist</h2>
            <button onClick={clearWishlistFilter} className="text-sm text-rust hover:underline">
              View all products
            </button>
          </div>
        ) : (
          <h2 className="mb-8 font-display text-2xl text-charcoal">Full collection</h2>
        )}

        <div className="flex flex-col gap-4 border-y border-stone-light/60 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors ${
                  category === c
                    ? 'bg-charcoal text-cream'
                    : 'bg-transparent text-charcoal-soft hover:bg-cream-dark'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search…"
              className="w-40 border-b border-stone-light bg-transparent py-1 text-sm focus:border-rust focus:outline-none"
            />
            <label className="flex items-center gap-2 text-xs text-stone">
              Up to ${maxPrice}
              <input
                type="range"
                min="20"
                max={MAX_PRICE}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="accent-rust"
              />
            </label>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 py-10 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] bg-cream-dark" />
                <div className="mt-3 h-3 w-2/3 bg-cream-dark" />
                <div className="mt-2 h-3 w-1/3 bg-cream-dark" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-display text-xl text-charcoal">No products match your filters</p>
            <p className="mt-2 text-sm text-stone">Try adjusting your search or price range.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 py-10 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
