const KEY = 'impulse_orders'

export function getOrders() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveOrder(order) {
  const orders = getOrders()
  orders.unshift(order)
  localStorage.setItem(KEY, JSON.stringify(orders))
}
