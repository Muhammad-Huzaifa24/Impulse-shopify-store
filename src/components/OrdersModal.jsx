import { printInvoice } from '../utils/invoice'

export default function OrdersModal({ orders, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/60 px-4"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto bg-cream p-6 shadow-xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-stone-light pb-4">
          <h2 className="font-display text-2xl text-charcoal">Your orders</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-stone hover:text-rust"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {orders.length === 0 ? (
          <p className="py-12 text-center text-sm text-stone">No orders yet.</p>
        ) : (
          <div className="mt-4 divide-y divide-stone-light/60">
            {orders.map((order) => (
              <div key={order.id} className="py-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{order.id}</p>
                    <p className="text-xs text-stone">
                      {new Date(order.date).toLocaleDateString(undefined, {
                        year: 'numeric', month: 'long', day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-charcoal">${order.total.toFixed(2)}</span>
                    <button
                      onClick={() => printInvoice(order)}
                      className="border border-stone-light px-3 py-1.5 text-xs font-medium text-charcoal-soft hover:border-charcoal"
                    >
                      Invoice
                    </button>
                  </div>
                </div>

                <ul className="mt-3 space-y-1">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex justify-between text-xs text-charcoal-soft">
                      <span>{item.name} × {item.quantity}</span>
                      <span>
                        ${((item.discount ? item.price * (1 - item.discount / 100) : item.price) * item.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-2 text-xs text-stone">
                  Shipping to {order.customer.address}, {order.customer.city}, {order.customer.postalCode}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
