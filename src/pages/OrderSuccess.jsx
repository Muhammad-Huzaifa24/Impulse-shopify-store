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

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-5 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-olive/15 text-olive">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>

      <h1 className="mt-6 font-display text-3xl text-charcoal">Order placed</h1>
      <p className="mt-2 text-sm text-stone">
        Thanks{order?.customer?.fullName ? `, ${order.customer.fullName}` : ''} — your order is confirmed.
      </p>

      {order && (
        <div className="mt-8 w-full border border-stone-light/60 p-6 text-left">
          <div className="flex justify-between text-sm">
            <span className="text-stone">Order number</span>
            <span className="font-medium text-charcoal">{order.id}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-stone">Items</span>
            <span className="font-medium text-charcoal">{order.items.reduce((n, i) => n + i.quantity, 0)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-stone">Total</span>
            <span className="font-medium text-charcoal">${order.total.toFixed(2)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-stone">Shipping to</span>
            <span className="text-right font-medium text-charcoal">
              {order.customer.address}, {order.customer.city}
            </span>
          </div>

          <button
            onClick={() => printInvoice(order)}
            className="mt-5 flex w-full items-center justify-center gap-2 border border-stone-light py-2.5 text-sm font-medium text-charcoal-soft transition-colors hover:border-charcoal hover:text-charcoal"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6v-8Z" />
            </svg>
            Download / Print invoice
          </button>
        </div>
      )}

      <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
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

      {showOrders && <OrdersModal orders={getOrders()} onClose={() => setShowOrders(false)} />}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
