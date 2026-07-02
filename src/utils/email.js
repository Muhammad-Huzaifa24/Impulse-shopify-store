import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY


function buildItemsHtml(items) {
  return items
    .map((item) => {
      const price = item.discount ? item.price * (1 - item.discount / 100) : item.price
      return `
        <tr>
          <td style="padding:10px 4px;border-bottom:1px solid #EAE2D3;color:#23241F;">${item.name}</td>
          <td style="padding:10px 4px;border-bottom:1px solid #EAE2D3;color:#23241F;text-align:center;">${item.quantity}</td>
          <td style="padding:10px 4px;border-bottom:1px solid #EAE2D3;color:#23241F;text-align:right;">$${price.toFixed(2)}</td>
          <td style="padding:10px 4px;border-bottom:1px solid #EAE2D3;color:#23241F;text-align:right;">$${(price * item.quantity).toFixed(2)}</td>
        </tr>`
    })
    .join('')
}

/**
 * Sends an order confirmation email via EmailJS.
 * Returns { ok: boolean, error?: string }
 */
export async function sendOrderConfirmationEmail(order) {
  console.log('order', order)
  console.log('SERVICE_ID', SERVICE_ID)
  console.log('TEMPLATE_ID', TEMPLATE_ID)
  console.log('PUBLIC_KEY', PUBLIC_KEY)
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn('EmailJS is not configured — skipping email send.')
    return { ok: false, error: 'EmailJS not configured' }
  }

  const date = new Date(order.date).toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  const templateParams = {
    order_id: order.id,
    order_date: date,
    to_name: order.customer.fullName,
    to_email: order.customer.email,
    customer_phone: order.customer.phone,
    shipping_address: `${order.customer.address}, ${order.customer.city}, ${order.customer.postalCode}`,
    items_count: order.items.reduce((n, i) => n + i.quantity, 0),
    items_html: buildItemsHtml(order.items),
    order_total: `$${order.total.toFixed(2)}`,
  }
  console.log('templateParams', templateParams)

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, { publicKey: PUBLIC_KEY })
    return { ok: true }
  } catch (err) {
    console.error('EmailJS send failed:', err)
    return { ok: false, error: err?.text || 'Failed to send email' }
  }
}
