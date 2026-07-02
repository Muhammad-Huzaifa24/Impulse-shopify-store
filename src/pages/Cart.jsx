import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import QuantitySelector from '../components/QuantitySelector'
import EmptyState from '../components/EmptyState'

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, subtotal } = useCart()

  if (cart.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        message="Looks like you haven't added anything yet. Go find something you'll love."
      />
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
      <h1 className="font-display text-3xl text-charcoal">Your cart</h1>

      <div className="mt-8 divide-y divide-stone-light/60 border-y border-stone-light/60">
        {cart.map((item) => {
          const price = item.discount ? item.price * (1 - item.discount / 100) : item.price
          return (
            <div key={item.id} className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center">
              <Link to={`/product/${item.id}`} className="h-24 w-20 shrink-0 overflow-hidden bg-cream-dark">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              </Link>

              <div className="flex-1">
                <Link to={`/product/${item.id}`} className="font-medium text-charcoal hover:text-rust">
                  {item.name}
                </Link>
                <p className="mt-1 text-xs uppercase tracking-wide text-stone">{item.category}</p>
                <p className="mt-1 text-sm text-charcoal-soft">${price.toFixed(2)}</p>
              </div>

              <QuantitySelector
                quantity={item.quantity}
                onChange={(q) => updateQuantity(item.id, q)}
                size="sm"
              />

              <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end sm:gap-2">
                <p className="font-semibold text-charcoal">${(price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-xs text-stone underline-offset-2 hover:text-rust hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-8 flex flex-col items-end gap-2">
        <div className="flex w-full max-w-xs justify-between text-sm text-charcoal-soft sm:w-64">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex w-full max-w-xs justify-between text-sm text-charcoal-soft sm:w-64">
          <span>Shipping</span>
          <span>Calculated at checkout</span>
        </div>
        <div className="flex w-full max-w-xs justify-between border-t border-stone-light pt-2 text-base font-semibold text-charcoal sm:w-64">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <Link
          to="/checkout"
          className="mt-4 w-full max-w-xs bg-charcoal px-6 py-3.5 text-center text-sm font-medium tracking-wide text-cream transition-colors hover:bg-rust sm:w-64"
        >
          Proceed to checkout
        </Link>
      </div>
    </div>
  )
}
