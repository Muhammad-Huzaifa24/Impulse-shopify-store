export function printInvoice(order) {
  const win = window.open('', '_blank', 'width=800,height=900')
  if (!win) return

  const rows = order.items
    .map((item) => {
      const price = item.discount ? item.price * (1 - item.discount / 100) : item.price
      return `
        <tr>
          <td>${item.name}</td>
          <td style="text-align:center;">${item.quantity}</td>
          <td style="text-align:right;">$${price.toFixed(2)}</td>
          <td style="text-align:right;">$${(price * item.quantity).toFixed(2)}</td>
        </tr>`
    })
    .join('')

  const date = new Date(order.date).toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  win.document.write(`
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8" />
      <title>Invoice ${order.id}</title>
      <style>
        * { box-sizing: border-box; }
        body {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          color: #23241F;
          padding: 48px;
          max-width: 720px;
          margin: 0 auto;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 2px solid #23241F;
          padding-bottom: 24px;
          margin-bottom: 32px;
        }
        .logo {
          font-family: Georgia, serif;
          font-size: 28px;
          font-weight: bold;
          letter-spacing: -0.5px;
        }
        .logo-sub {
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #8C8577;
          margin-top: 2px;
        }
        .invoice-title {
          text-align: right;
          font-size: 22px;
          font-weight: 600;
        }
        .invoice-meta {
          text-align: right;
          font-size: 12px;
          color: #8C8577;
          margin-top: 4px;
        }
        .section {
          display: flex;
          justify-content: space-between;
          margin-bottom: 32px;
          font-size: 13px;
        }
        .section h4 {
          margin: 0 0 6px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #8C8577;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        th {
          text-align: left;
          border-bottom: 1px solid #23241F;
          padding: 8px 4px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #8C8577;
        }
        td {
          padding: 10px 4px;
          border-bottom: 1px solid #EAE2D3;
        }
        .totals {
          margin-top: 16px;
          margin-left: auto;
          width: 240px;
        }
        .totals div {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          padding: 4px 0;
        }
        .totals .grand {
          border-top: 1px solid #23241F;
          margin-top: 6px;
          padding-top: 8px;
          font-weight: 700;
          font-size: 15px;
        }
        .footer {
          margin-top: 48px;
          padding-top: 16px;
          border-top: 1px solid #EAE2D3;
          font-size: 11px;
          color: #8C8577;
          text-align: center;
        }
        @media print {
          body { padding: 24px; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="logo">Impulse</div>
          <div class="logo-sub">Studio</div>
        </div>
        <div>
          <div class="invoice-title">Invoice</div>
          <div class="invoice-meta">${order.id}</div>
          <div class="invoice-meta">${date}</div>
        </div>
      </div>

      <div class="section">
        <div>
          <h4>Billed to</h4>
          <div>${order.customer.fullName}</div>
          <div>${order.customer.address}</div>
          <div>${order.customer.city}, ${order.customer.postalCode}</div>
          <div>${order.customer.email}</div>
          <div>${order.customer.phone}</div>
        </div>
        <div style="text-align:right;">
          <h4>From</h4>
          <div>Impulse Studio</div>
          <div>hello@impulse-studio.com</div>
          <div>impulse-studio.com</div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th style="text-align:center;">Qty</th>
            <th style="text-align:right;">Price</th>
            <th style="text-align:right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>

      <div class="totals">
        <div><span>Subtotal</span><span>$${order.total.toFixed(2)}</span></div>
        <div><span>Shipping</span><span>Free</span></div>
        <div class="grand"><span>Total</span><span>$${order.total.toFixed(2)}</span></div>
      </div>

      <div class="footer">
        Thank you for shopping with Impulse Studio.<br />
        This is a computer-generated invoice and does not require a signature.
      </div>
    </body>
    </html>
  `)

  win.document.close()
  win.focus()
  setTimeout(() => win.print(), 300)
}
