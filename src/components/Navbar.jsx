import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const LINKS = [
  { label: 'Shop', to: '/' },
  { label: 'Shirts', to: '/?category=Shirts' },
  { label: 'Outerwear', to: '/?category=Outerwear' },
  { label: 'Footwear', to: '/?category=Footwear' },
]

export default function Navbar() {
  const { itemCount } = useCart()
  const { wishlist } = useWishlist()
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  function handleSearch(e) {
    e.preventDefault()
    navigate(query ? `/?search=${encodeURIComponent(query)}` : '/')
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-stone-light/60 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
        <Link to="/" className="font-display text-2xl tracking-tight text-charcoal">
          Impulse
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm font-medium tracking-wide text-charcoal-soft transition-colors hover:text-rust"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="hidden items-center sm:flex">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-40 border-b border-stone-light bg-transparent py-1 text-sm text-charcoal placeholder:text-stone focus:border-rust focus:outline-none lg:w-56"
            />
          </form>

          <Link
            to="/?wishlist=1"
            className="relative text-sm font-medium text-charcoal-soft transition-colors hover:text-rust"
            aria-label="Wishlist"
          >
            <HeartIcon />
            {wishlist.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-rust text-[10px] text-cream">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="relative text-sm font-medium text-charcoal-soft transition-colors hover:text-rust"
            aria-label="Cart"
          >
            <BagIcon />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-rust text-[10px] text-cream">
                {itemCount}
              </span>
            )}
          </Link>

          <button
            className="text-charcoal md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-stone-light/60 bg-cream px-5 pb-4 md:hidden">
          <form onSubmit={handleSearch} className="mt-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full border-b border-stone-light bg-transparent py-2 text-sm text-charcoal placeholder:text-stone focus:border-rust focus:outline-none"
            />
          </form>
          <nav className="mt-3 flex flex-col gap-3">
            {LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-charcoal-soft hover:text-rust"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 20s-7-4.35-9.5-8.5C.8 8.2 2.3 4.5 6 4.5c2.1 0 3.5 1.3 4.5 2.6C11.5 5.8 12.9 4.5 15 4.5c3.7 0 5.2 3.7 3.5 7C18 15.65 12 20 12 20Z" />
    </svg>
  )
}
function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  )
}
function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}
