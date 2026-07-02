import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { printInvoice } from '../utils/invoice'
import { getOrders } from '../utils/orders'
import OrdersModal from '../components/OrdersModal'
import Toast from '../components/Toast'

export default function OrderSuccess() {
  const location = useLocation()
  const [order, setOrder] = useState(null)
  const [showOrders, setShowOrders] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const raw = sessionStorage.getItem('impulse_last_order')
    if (raw) setOrder(JSON.parse(raw))

    if (location.state?.emailSent === true) {
      setToast({ type: 'success', message: 'Confirmation email sent — check your inbox.' })
    } else if (location.state?.emailSent === false) {
      setToast({ type: 'error', message: "Order placed, but we couldn't send the confirmation email." })
    }
  }, [location.state])

  const heroImage = order?.items?.[0]?.image

  return (
    <div className="grid lg:grid-cols-2">
      {/* Image side */}
      <div className="relative order-1 hidden overflow-hidden bg-cream-dark lg:sticky lg:top-0 lg:block lg:h-screen">
        {heroImage && (
          <img src={heroImage} alt="" className="h-full w-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/0 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10 text-cream">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/80">Impulse Studio</p>
          <p className="mt-2 font-display text-2xl leading-snug">
            Thanks for shopping with us — your order is on its way to being packed.
          </p>
        </div>
      </div>

      {/* Details side */}
      <div className="order-2 flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-olive/15 text-olive mx-auto my-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>

          <h1 className="mt-6 font-display text-3xl text-charcoal sm:text-4xl text-center">Order placed</h1>
          <p className="mt-2 text-sm text-stone text-center">
            Thanks{order?.customer?.fullName ? `, ${order.customer.fullName}` : ''} — your order is confirmed.
          </p>

          {order && (
            <>
              <div className="mt-10 divide-y divide-stone-light/60 border-y border-stone-light/60">
                <div className="flex justify-between py-3 text-sm">
                  <span className="text-stone">Order number</span>
                  <span className="font-medium text-charcoal">{order.id}</span>
                </div>
                <div className="flex justify-between py-3 text-sm">
                  <span className="text-stone">Items</span>
                  <span className="font-medium text-charcoal">{order.items.reduce((n, i) => n + i.quantity, 0)}</span>
                </div>
                <div className="flex justify-between py-3 text-sm">
                  <span className="text-stone">Total</span>
                  <span className="font-medium text-charcoal">${order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between gap-6 py-3 text-sm">
                  <span className="shrink-0 text-stone">Shipping to</span>
                  <span className="text-right font-medium text-charcoal">
                    {order.customer.address}, {order.customer.city}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="h-14 w-12 shrink-0 overflow-hidden bg-cream-dark">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-charcoal">{item.name}</p>
                      <p className="text-xs text-stone">Qty {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => printInvoice(order)}
                className="mt-8 flex w-full items-center justify-center gap-2 border border-stone-light py-3 text-sm font-medium text-charcoal-soft transition-colors hover:border-charcoal hover:text-charcoal"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6v-8Z" />
                </svg>
                Download / Print invoice
              </button>
            </>
          )}

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/"
              className="flex-1 bg-charcoal px-6 py-3.5 text-center text-sm font-medium tracking-wide text-cream transition-colors hover:bg-rust"
            >
              Continue shopping
            </Link>
            <button
              onClick={() => setShowOrders(true)}
              className="flex-1 border border-stone-light px-6 py-3.5 text-sm font-medium tracking-wide text-charcoal-soft transition-colors hover:border-charcoal"
            >
              View orders
            </button>
          </div>
        </div>
      </div>

      {showOrders && <OrdersModal orders={getOrders()} onClose={() => setShowOrders(false)} />}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
