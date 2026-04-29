# 🧶 Stitchery — Feature Specification

**Tech Stack:** React.js · Next.js · Express.js · MySQL  
**Scope:** Client-facing storefront + Admin dashboard

---

## Table of Contents

1. [Client Side Features](#client-side-features)
   - [Authentication & User Accounts](#1-authentication--user-accounts)
   - [Homepage & Navigation](#2-homepage--navigation)
   - [Product Browsing & Discovery](#3-product-browsing--discovery)
   - [Product Detail Page](#4-product-detail-page)
   - [Shopping Cart](#5-shopping-cart)
   - [Checkout & Payments](#6-checkout--payments)
   - [Order Management](#7-order-management)
   - [Wishlist & Saved Items](#8-wishlist--saved-items)
   - [Reviews & Ratings](#9-reviews--ratings)
   - [Custom Order Requests](#10-custom-order-requests)
   - [User Profile & Settings](#11-user-profile--settings)
   - [Notifications](#12-notifications)
2. [Admin Side Features](#admin-side-features)
   - [Admin Authentication & Access Control](#1-admin-authentication--access-control)
   - [Dashboard Overview](#2-dashboard-overview)
   - [Product Management](#3-product-management)
   - [Category & Tag Management](#4-category--tag-management)
   - [Inventory Management](#5-inventory-management)
   - [Order Management](#6-order-management)
   - [Customer Management](#7-customer-management)
   - [Custom Order Handling](#8-custom-order-handling)
   - [Promotions & Discounts](#9-promotions--discounts)
   - [Content Management](#10-content-management)
   - [Analytics & Reports](#11-analytics--reports)
   - [Notifications & Communications](#12-notifications--communications)
   - [Settings & Configuration](#13-settings--configuration)
3. [Shared / Cross-Cutting Features](#shared--cross-cutting-features)
4. [Database Schema Overview](#database-schema-overview)
5. [Design System & Branding](#design-system--branding)
   - [Color Palette](#color-palette)
   - [Typography](#typography)
   - [Color Application Guide](#color-application-guide)

---

## Client Side Features

### 1. Authentication & User Accounts

- **Registration** — sign up with name, email, and password
- **Login / Logout** — JWT-based session management
- **OAuth Login** — Google / Facebook sign-in (optional phase 2)
- **Email Verification** — verify account after registration
- **Forgot / Reset Password** — token-based secure reset flow
- **Remember Me** — persistent login with refresh tokens
- **Guest Checkout** — purchase without creating an account; prompt to save account after order

---

### 2. Homepage & Navigation

- **Hero Banner / Carousel** — featured products, seasonal promotions, new arrivals
- **Category Quick Links** — visual tiles for Flowers, Key Rings, Clothes, Yarn & Threads, Accessories
- **Featured / Best-Seller Products** — curated product rows
- **New Arrivals Section** — latest listings
- **Sale / Deals Section** — discounted items
- **Announcement Bar** — free shipping threshold, ongoing offers
- **Sticky Header** — logo, search bar, cart icon (with item count badge), user avatar/login
- **Footer** — links to About, Contact, FAQs, Policies, Social Media

---

### 3. Product Browsing & Discovery

- **Category Pages** — browse by: Crochet Flowers, Key Rings, Clothes, Yarn, Threads, Accessories
- **Search Bar** — full-text search across product names, descriptions, and tags
- **Filters Panel**
  - Price range slider
  - Color picker
  - Material (Cotton, Wool, Acrylic, etc.)
  - Availability (In Stock / Pre-order)
  - Rating (4★ and above, etc.)
  - Product type (Finished product vs. Raw material)
- **Sort Options** — Newest, Price Low–High, Price High–Low, Most Popular, Best Rated
- **Pagination & Infinite Scroll** — configurable per page
- **Product Cards** — thumbnail, name, price, rating summary, quick-add-to-cart button, wishlist toggle
- **Tags / Labels** — "Handmade", "Limited Edition", "New", "Sale", "Pre-order"
- **Breadcrumb Navigation**

---

### 4. Product Detail Page

- **Image Gallery** — multiple photos with zoom-on-hover and lightbox
- **Product Name, SKU, and Short Description**
- **Price Display** — original price, sale price, discount percentage
- **Variant Selector** — color, size (for clothes), yarn weight/ply (for raw materials), quantity
- **Stock Indicator** — In Stock / Only X left / Out of Stock / Pre-order
- **Add to Cart** and **Buy Now** buttons
- **Add to Wishlist** toggle
- **Product Tabs**
  - Full Description
  - Materials & Care Instructions
  - Shipping & Delivery Info
  - Size Guide (for clothes)
- **Related Products** — "You may also like" row
- **Yarn Pairing Suggestions** — for finished crochet items, suggest matching threads/yarn
- **Customer Reviews & Ratings** section (see section 9)
- **Share Buttons** — share to social media or copy link

---

### 5. Shopping Cart

- **Persistent Cart** — saved to database for logged-in users; localStorage for guests
- **Cart Drawer / Side Panel** — quick view without leaving the page
- **Full Cart Page** — itemized list with product image, name, variant, price, quantity adjuster, remove button
- **Subtotal Calculation** — auto-updates on quantity change
- **Coupon / Promo Code Field** — apply and validate discount codes
- **Estimated Shipping Cost** — based on entered pin code/city
- **Cart Summary** — subtotal, discount, shipping, estimated total
- **Continue Shopping** and **Proceed to Checkout** buttons
- **Save for Later** — move items from cart to wishlist

---

### 6. Checkout & Payments

- **Multi-Step Checkout Flow**
  1. Address — add/select delivery address
  2. Shipping Method — standard, express, pickup (if applicable)
  3. Payment — select method and enter details
  4. Review & Confirm — order summary before placing
- **Address Management** — add new, select saved, edit/delete addresses
- **Payment Methods**
  - Cash on Delivery (COD)
  - Online Payment Gateway (eSewa, Khalti for Nepal; Stripe/PayPal for international — phase 2)
- **Order Confirmation Page** — order ID, summary, estimated delivery date
- **Confirmation Email** — auto-sent after successful order

---

### 7. Order Management

- **My Orders Page** — list of all past and active orders with status badges
- **Order Detail Page** — itemized breakdown, shipping address, payment method, status timeline
- **Order Status Tracking** — Placed → Processing → Shipped → Out for Delivery → Delivered
- **Cancel Order** — allowed before processing begins
- **Return / Exchange Request** — submit request with reason and photos (configurable window, e.g., 7 days)
- **Download Invoice** — PDF invoice for completed orders
- **Reorder** — add all items from a past order back to cart

---

### 8. Wishlist & Saved Items

- **Add / Remove from Wishlist** — available from product cards and detail pages
- **Wishlist Page** — all saved items with current price and availability
- **Move to Cart** — one-click transfer from wishlist to cart
- **Share Wishlist** — shareable link for gifting hints
- **Out-of-Stock Alert** — notify when a wishlisted item is back in stock

---

### 9. Reviews & Ratings

- **Star Rating** (1–5) — submit after a verified purchase
- **Written Review** — title and body text
- **Photo Upload** — attach images to a review (max 3)
- **Helpful Votes** — mark reviews as helpful
- **Review Summary** — aggregate rating, rating distribution bar chart
- **Sorting** — Most Recent, Most Helpful, Highest Rated, Lowest Rated
- **Report Review** — flag inappropriate content

---

### 10. User Profile & Settings

- **Profile Page** — name, email, profile picture, bio
- **Edit Profile** — update personal details
- **Manage Addresses** — add, edit, set default, delete delivery addresses
- **Change Password**
- **Notification Preferences** — email and/or in-app notifications toggles
- **Account Deletion Request**

---

### 11. Notifications

- **In-App Notification Bell** — order updates, wishlist restocks, quote responses
- **Email Notifications** — order confirmation, shipping update, delivery confirmation, password reset
- **Toast / Snackbar Alerts** — immediate feedback for cart actions, form submissions

---

---

## Admin Side Features

### 1. Admin Authentication & Access Control

- **Admin Login** — separate secure login (not shared with customer portal)
- **Role-Based Access Control (RBAC)**
  - Super Admin — full access
  - Manager — products, orders, customers
  - Staff — orders and inventory only
- **Session Management** — auto-logout on inactivity
- **Activity Log** — track which admin performed which action and when

---

### 2. Dashboard Overview

- **KPI Cards** — Total Revenue, Orders Today, New Customers, Pending Orders, Low Stock Alerts
- **Sales Chart** — revenue over time (daily / weekly / monthly / yearly toggle)
- **Recent Orders Table** — latest 10 orders with quick status update
- **Top Selling Products** — ranked list with thumbnails
- **Low Stock Alerts** — items below threshold
- **Recent Custom Order Requests** — pending quotes

---

### 3. Product Management

- **Product List** — searchable, sortable, filterable table of all products
- **Add New Product Form**
  - Name, slug, description (rich text editor)
  - Category and tags
  - Multiple image uploads (drag-and-drop, reorder)
  - Pricing (original, sale price, cost price)
  - Variants (color, size, yarn weight) with individual SKU and stock per variant
  - Material details and care instructions
  - SEO fields (meta title, meta description)
  - Status toggle (Draft / Active / Archived)
- **Edit Product** — update any product detail
- **Duplicate Product** — clone an existing product as a starting point
- **Delete / Archive Product** — soft delete to retain order history
- **Bulk Actions** — activate, deactivate, or delete multiple products at once
- **Product Import / Export** — CSV upload/download for bulk updates

---

### 4. Category & Tag Management

- **Category CRUD** — create, edit, delete categories and subcategories
- **Category Image & Description** — for visual category pages
- **Nested Categories** — e.g., Clothes → Women / Men / Children
- **Tag CRUD** — manage tags like "Handmade", "Summer Collection", etc.

---

### 5. Inventory Management

- **Stock Overview Table** — all SKUs with current stock, sold count, reserved count
- **Update Stock** — manually adjust stock levels with a reason note
- **Low Stock Threshold** — set per-product or global threshold for alerts
- **Stock History Log** — track all additions and deductions with timestamps
- **Pre-order Management** — mark products as pre-order and set expected restock date

---

### 6. Order Management

- **Orders List** — filterable by status, date range, payment method, customer
- **Order Detail View** — full breakdown: items, customer info, shipping address, payment, timeline
- **Update Order Status** — move through: Placed → Processing → Shipped → Delivered; add tracking number
- **Cancel Order** — with reason; triggers stock restoration and notification
- **Process Returns/Exchanges** — approve or reject return requests; update stock
- **Manual Order Creation** — place an order on behalf of a customer (e.g., phone orders)
- **Print / Export Invoice** — PDF generation per order
- **Bulk Status Update** — mark multiple orders as shipped at once

---

### 7. Customer Management

- **Customer List** — searchable table with name, email, join date, total orders, total spend
- **Customer Detail Page** — profile info, address book, full order history, reviews written
- **Edit Customer Info** — update details if needed
- **Ban / Deactivate Account** — disable a customer account with reason
- **Notes on Customer** — internal admin notes (not visible to customer)

---

### 8. Promotions & Discounts

- **Coupon Code Manager**
  - Create codes: percentage off, fixed amount off, free shipping
  - Set validity dates, usage limits (per code and per user), minimum order value
  - Enable / Disable codes
  - View usage stats per code
- **Sale Pricing** — set sale prices on individual products or bulk by category
- **Banner Promotions** — create and schedule homepage banners/announcements

---

### 9. Content Management

- **Homepage Sections** — manage hero banners, featured product selection, announcement text
- **Static Pages** — edit About Us, FAQs, Shipping Policy, Return Policy, Terms & Conditions via a simple editor
- **Blog / Tips Section** _(optional phase 2)_ — post crochet tutorials or yarn guides to drive organic traffic

---

### 10. Analytics & Reports

- **Sales Report** — revenue, orders, average order value over a date range; exportable to CSV
- **Product Performance** — views, add-to-cart rate, conversion rate, units sold per product
- **Inventory Report** — stock levels, turnover rate, dead stock
- **Customer Report** — new vs. returning customers, top spenders, churn overview
- **Coupon Usage Report** — which codes are used most, discount amounts given
- **Custom Order Report** — volume, acceptance rate, average quote value

---

### 11. Notifications & Communications

- **Email Template Manager** — edit transactional email templates (order confirmation, shipping, etc.)
- **Send Broadcast Email** _(optional)_ — email all customers or a segment with a newsletter
- **In-App Notification Triggers** — configure which events send notifications to customers

---

### 12. Settings & Configuration

- **Store Settings** — store name, logo, contact email, address, currency, timezone
- **Shipping Settings** — define shipping zones, flat rates, free shipping thresholds
- **Tax Configuration** — set tax rates per region (if applicable)
- **Payment Gateway Settings** — toggle and configure payment methods (COD, eSewa, Khalti, etc.)
- **Admin User Management** — add/remove admin accounts, assign roles
- **SEO Settings** — default meta tags, sitemap generation toggle
- **Maintenance Mode** — take the storefront offline with a custom message

---

---

## Shared / Cross-Cutting Features

| Feature                  | Notes                                                       |
| ------------------------ | ----------------------------------------------------------- |
| **Responsive Design**    | Mobile-first; works on phones, tablets, desktops            |
| **SEO Optimization**     | Next.js SSR/SSG for product and category pages              |
| **Image Optimization**   | Next.js `<Image>` component, lazy loading, WebP conversion  |
| **Error Handling**       | Friendly error pages (404, 500), form validation messages   |
| **Loading States**       | Skeleton screens and spinners for async data                |
| **Accessibility (a11y)** | ARIA labels, keyboard navigation, sufficient color contrast |
| **Security**             | JWT auth, input sanitization, HTTPS, rate limiting on API   |
| **Environment Config**   | `.env` files for DB, API keys, JWT secret                   |

---

## Database Schema Overview

> High-level entities to model in MySQL:

- **users** — id, name, email, password_hash, role, is_verified, created_at
- **addresses** — id, user_id, label, street, city, state, zip, is_default
- **categories** — id, name, slug, parent_id, image_url, description
- **products** — id, name, slug, description, category_id, base_price, sale_price, status, created_at
- **product_images** — id, product_id, url, sort_order
- **product_variants** — id, product_id, color, size, material, sku, stock, price_modifier
- **tags** and **product_tags** — many-to-many
- **orders** — id, user_id, status, total, shipping_address_id, payment_method, created_at
- **order_items** — id, order_id, product_variant_id, quantity, unit_price
- **cart_items** — id, user_id (nullable), session_id, product_variant_id, quantity
- **wishlists** — id, user_id, product_id
- **reviews** — id, user_id, product_id, rating, title, body, is_approved
- **coupons** — id, code, type, value, min_order, max_uses, used_count, expires_at
- **custom_orders** — id, user_id, description, reference_images, status, quoted_price
- **notifications** — id, user_id, type, message, is_read, created_at
- **admin_logs** — id, admin_id, action, entity_type, entity_id, created_at

---

---

## Design System & Branding

> Visual identity guidelines for both the client storefront and admin dashboard. Grounded in 2025–2026 ecommerce color research and the handmade/artisanal nature of the product catalog.

### Color Palette

**Theme Name: "Warm Loom"**

A warm neutral base with dusty rose accents and earthy greens — evoking yarn, craft, and handwork. Chosen to feel native alongside product photography and to signal authenticity, warmth, and quality to craft-conscious shoppers.

| Role | Name | Hex | Usage |
| ---- | ---- | --- | ----- |
| **Primary Background** | Cream White | `#FAF7F2` | Page backgrounds, cards |
| **Surface / Cards** | Warm Linen | `#F2EBE0` | Product cards, panels, modals |
| **Brand Primary** | Mocha Brown | `#8B5E52` | Logo, navbar, primary brand elements |
| **Brand Secondary** | Dusty Rose | `#D4927A` | Hover states, badges, highlights |
| **Accent / Action** | Terracotta | `#C1644F` | "Add to Cart", "Buy Now", CTA buttons |
| **Supporting Green** | Sage Mist | `#A3B89A` | "In Stock" tags, category chips, success states |
| **Text Primary** | Espresso | `#2C1A1A` | Headings, body text |
| **Text Secondary** | Warm Gray | `#7A6A63` | Subtitles, metadata, placeholder text |
| **Border / Divider** | Soft Sand | `#E0D5C8` | Card borders, input outlines, dividers |

#### Colors to Avoid
- **Pure white `#FFFFFF`** — feels clinical; clashes with the warm craft aesthetic
- **Generic blues** — corporate/tech associations that conflict with handmade warmth
- **Black-dominant schemes** — luxury signal misaligned with approachable, artisanal branding
- **High-saturation neons or pastels** — trendy but fleeting; the product catalog has a timeless feel

---

### Typography

| Role | Typeface | Weight | Notes |
| ---- | -------- | ------ | ----- |
| **Display / Hero Headings** | Playfair Display | 700 | Elegant, editorial warmth for banners and hero sections |
| **Section Headings (H2–H3)** | Cormorant Garamond | 600 | Pairs with Playfair; softer for mid-level headings |
| **Body Text** | DM Sans | 400 / 500 | Clean and readable across all devices |
| **UI Labels / Buttons** | Nunito | 600 | Friendly, rounded feel for interactive elements |
| **Monospace / SKUs** | JetBrains Mono | 400 | Product SKUs, order IDs, code references |

All fonts available via Google Fonts. Ensure all body and UI text meets **WCAG 2.1 AA** contrast standards against their respective backgrounds.

---

### Color Application Guide

Maps palette tokens to specific UI features defined in this spec:

| UI Feature | Color Token |
| ---------- | ----------- |
| Page & layout backgrounds | Cream White `#FAF7F2` |
| Product cards, cart drawer, modals | Warm Linen `#F2EBE0` |
| Navbar, logo, primary headings | Mocha Brown `#8B5E52` |
| "Add to Cart" / "Buy Now" buttons | Terracotta `#C1644F` |
| Hover states, wishlist toggles | Dusty Rose `#D4927A` |
| "In Stock" badge | Sage Mist `#A3B89A` |
| "Out of Stock" / disabled states | Warm Gray `#7A6A63` |
| "Sale" / discount badge | Terracotta `#C1644F` |
| "New" / "Handmade" / "Limited" tags | Dusty Rose `#D4927A` |
| "Pre-order" tag | Mocha Brown `#8B5E52` |
| Star ratings | Warm amber — `#D4A447` |
| Form inputs (border) | Soft Sand `#E0D5C8` |
| Admin dashboard KPI card surfaces | Warm Linen `#F2EBE0` |
| Admin sidebar / nav | Espresso `#2C1A1A` |
| Success / confirmation states | Sage Mist `#A3B89A` |
| Error / alert states | Terracotta `#C1644F` (with white text) |

---

_This document serves as the feature baseline for prototyping and development planning. Features marked "phase 2" or "optional" can be deferred to later sprints._
