# Impulse — Shopify-Inspired E-Commerce Frontend

React + Vite + Tailwind CSS v4 (no PostCSS config needed — uses `@tailwindcss/vite`).

## Setup

npm install
npm run dev

Build for production:

npm run build

## Structure

- src/data/products.json — hardcoded product catalog
- src/context/CartContext.jsx, WishlistContext.jsx — state + localStorage persistence
- src/components/ — Navbar, Footer, ProductCard, QuantitySelector, EmptyState
- src/pages/ — Home, ProductDetail, Cart, Checkout, OrderSuccess

## Theme

Colors and fonts are defined as CSS variables in src/index.css under @theme:
cream, cream-dark, charcoal, charcoal-soft, olive, rust, rust-dark, stone, stone-light.
Fonts: Fraunces (display) + Inter (body), loaded via Google Fonts in index.html.
