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

## Environment variables

This project uses Vite environment variables for runtime configuration. The file `.env.example` provides sample keys for EmailJS. Copy it to a real `.env` in the project root and restart the dev server:

For Windows PowerShell:

	copy .env.example .env

For macOS / Linux / Git Bash:

	cp .env.example .env

Vite only loads files named `.env`, `.env.local`, or other env files (not `.env.example`) — so make sure your secrets live in `.env` or your deployment environment.
