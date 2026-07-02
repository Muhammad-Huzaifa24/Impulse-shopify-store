import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="border-t border-stone-light/60 bg-charcoal text-cream">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="font-display text-2xl">Impulse</h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone-light">
              Considered clothing for everyday wear. Small batches, honest materials, made to last past the season.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-stone-light">Stay in the loop</h4>
            <p className="mt-2 text-sm text-stone-light">Get early access to new drops and restocks.</p>
            {subscribed ? (
              <p className="mt-4 text-sm text-rust">You're subscribed — thanks for joining.</p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 flex max-w-sm gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full border border-charcoal-soft bg-transparent px-3 py-2 text-sm text-cream placeholder:text-stone focus:border-rust focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 bg-rust px-4 py-2 text-sm font-medium text-cream transition-colors hover:bg-rust-dark"
                >
                  Join
                </button>
              </form>
            )}
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-stone-light">Follow along</h4>
            <div className="mt-4 flex gap-4">
              {['Instagram', 'Pinterest', 'TikTok'].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="text-sm text-stone-light transition-colors hover:text-rust"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-charcoal-soft pt-6 text-xs text-stone md:flex-row">
          <p>© {new Date().getFullYear()} Impulse Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-rust">Privacy</a>
            <a href="#" className="hover:text-rust">Terms</a>
            <a href="#" className="hover:text-rust">Shipping</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
