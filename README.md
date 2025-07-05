

# 🛍️ Multimart – Gumroad-Inspired Multi-Tenant Platform

Multimart is a **Gumroad-style digital product platform** built with a **multi-tenant architecture**, offering creators their own stores with customizable dashboards and full control over product listings, payments, and analytics.


![image](https://github.com/user-attachments/assets/07ff7073-721c-403c-96a7-51917a9d24eb)

Built with:

* **Payload CMS** for a powerful, headless CMS backend.
* **tRPC** for end-to-end type safety.
* **Next.js 15 App Router** for modern frontend architecture.
* **Tailwind CSS v4** with Radix UI for rich, accessible UI components.

---

## 🔧 Tech Stack

| Layer               | Stack                                                            |
| ------------------- | ---------------------------------------------------------------- |
| **Frontend**        | Next.js 15, React 19, Tailwind CSS v4, ShadCN, Radix UI, Zustand |
| **Backend**         | Payload CMS (MongoDB), tRPC, Zod, Stripe                         |
| **Fullstack Utils** | SuperJSON, TanStack React Query v5                               |
| **Dev Tools**       | Bun / PNPM, ESLint, TypeScript 5, Tailwind plugins               |

---

## 📁 Folder Structure

```bash
.
├── src/
│   ├── app/                         # App router entrypoint (Next.js 15)
│   │   ├── (auth|home|dashboard)/  # Routes grouped by layout
│   │   ├── api/                    # Route handlers (e.g. Stripe, webhook)
│   │   ├── products/               # Product pages
│   │   └── layout.tsx             # Root layout
│
│   ├── components/                # Reusable UI components
│   │   ├── ui/                    # ShadCN UI + custom primitives
│   │   └── shared/                # Domain-specific shared components
│
│   ├── lib/                       # Utilities
│   │   ├── auth/                  # Auth helpers (getUser, protectRoute)
│   │   ├── server/                # Server-only utils
│   │   └── utils.ts               # General utility functions
│
│   ├── modules/                   # Modular feature folders
│   │   ├── auth/                  # Auth flow logic
│   │   ├── products/              # Product views, handlers, types
│   │   ├── tenants/               # Multi-tenant handling
│   │   └── users/                 # User profile, avatar, etc
│
│   ├── trpc/                      # tRPC setup (router, clients)
│   ├── payload/                   # Payload CMS config
│   │   ├── collections/           # Payload collections
│   │   └── globals/               # Payload global config
│
│   ├── types.ts                   # Shared type definitions
│   └── seed.ts                    # DB seeding logic
│
├── public/                        # Static assets
├── tailwind.config.ts            # Tailwind CSS config
├── payload.config.ts             # Payload CMS entrypoint
└── ...
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/satyam-code45/multimart.git
cd multimart
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Environment Setup

Create a `.env` file with the following:

```env
# Database
DATABASE_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/multimart
PAYLOAD_SECRET=your_payload_secret

# App config
NEXT_PUBLIC_APP_URL="http://localhost:3000/"
NEXT_PUBLIC_ROOT_DOMAIN="localhost:3000"
NEXT_PUBLIC_ENABLE_SUBDOMAIN_ROUTING="false"

# Stripe
STRIPE_SECRET_KEY=sk_test_************************
STRIPE_WEBHOOK_SECRET=whsec_************************

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_************************
```

### 4. Run the App

```bash
bun run db:fresh       # Drop & recreate DB schema (dev only)
bun run db:seed        # Seed DB with test tenants/products
bun run dev            # Launch development server
```

---

## 🌟 Features

* 🔑 **Multi-Tenant Auth** with Role-based Access
* 🛒 **Digital Storefronts** with Custom Branding
* 💳 **Stripe Checkout** Integration
* 📦 **Payload CMS** for Admin Dashboard
* ⚡ **End-to-End Type Safety** via tRPC + Zod
* 🎯 **Clean DX**: Modular codebase, typed API responses, and easy testing

---

## 🧑‍💻 Author

Made with ❤️ by [**Satyam Kumar**](https://github.com/satyam-code45)

---

## 📄 License

MIT — use freely, build better.
