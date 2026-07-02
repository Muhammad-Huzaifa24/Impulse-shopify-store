import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import EmptyState from '../components/EmptyState'
import { saveOrder } from '../utils/orders'

const FIELDS = [
  { name: 'fullName', label: 'Full name', type: 'text', span: 2 },
  { name: 'email', label: 'Email', type: 'email', span: 2 },
  { name: 'phone', label: 'Phone number', type: 'tel', span: 2 },
  { name: 'address', label: 'Address', type: 'text', span: 2 },
  { name: 'city', label: 'City', type: 'text', span: 1 },
  { name: 'postalCode', label: 'Postal code', type: 'text', span: 1 },
]

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', address: '', city: '', postalCode: '',
  })
  const [errors, setErrors] = useState({})

  if (cart.length === 0) {
    return (
      <EmptyState
        title="Nothing to check out"
        message="Your cart is empty, so there's nothing to order yet."
      />
    )
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function validate() {
    const next = {}
    FIELDS.forEach((f) => {
      if (!form[f.name].trim()) next[f.name] = 'Required'
    })
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    const order = {
      id: `ORD-${Date.now().toString().slice(-8)}`,
      items: cart,
      total: subtotal,
      customer: form,
      date: new Date().toISOString(),
    }
    sessionStorage.setItem('impulse_last_order', JSON.stringify(order))
    saveOrder(order)
    clearCart()
    navigate('/order-success')
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
      <h1 className="font-display text-3xl text-charcoal">Checkout</h1>

      <div className="mt-8 grid gap-12 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="lg:col-span-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-stone">Shipping details</h2>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {FIELDS.map((f) => (
              <div key={f.name} className={f.span === 2 ? 'sm:col-span-2' : ''}>
                <label className="text-xs font-medium text-charcoal-soft">{f.label}</label>
                <input
                  type={f.type}
                  name={f.name}
                  value={form[f.name]}
                  onChange={handleChange}
                  className={`mt-1 w-full border bg-transparent px-3 py-2.5 text-sm text-charcoal focus:outline-none ${
                    errors[f.name] ? 'border-rust' : 'border-stone-light focus:border-charcoal'
                  }`}
                />
                {errors[f.name] && <p className="mt-1 text-xs text-rust">{errors[f.name]}</p>}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-charcoal px-6 py-3.5 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-rust sm:w-auto sm:px-10"
          >
            Place order
          </button>
        </form>

        <aside className="border border-stone-light/60 p-6 h-fit">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-stone">Order summary</h2>
          <div className="mt-4 space-y-4">
            {cart.map((item) => {
              const price = item.discount ? item.price * (1 - item.discount / 100) : item.price
              return (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="h-14 w-12 shrink-0 overflow-hidden bg-cream-dark">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-charcoal">{item.name}</p>
                    <p className="text-xs text-stone">Qty {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-charcoal">${(price * item.quantity).toFixed(2)}</p>
                </div>
              )
            })}
          </div>
          <div className="mt-6 flex justify-between border-t border-stone-light pt-4 text-base font-semibold text-charcoal">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  )
}
