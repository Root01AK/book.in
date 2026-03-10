# Monakin Studio — Booking Platform (Next.js + Pure CSS)

A complete full-stack booking platform built with Next.js 14 App Router and **plain CSS** (zero Tailwind, zero UI libraries). PostgreSQL via Prisma ORM, file uploads to local disk, and email via Nodemailer.

---

## Tech Stack

| Layer       | Tech                          |
|-------------|-------------------------------|
| Framework   | Next.js 14 (App Router)       |
| Language    | TypeScript                    |
| Styling     | **Pure CSS** (globals.css)    |
| Database    | PostgreSQL + Prisma ORM       |
| File Upload | Native Next.js FormData API   |
| Email       | Nodemailer (SMTP/Gmail)       |
| Validation  | Zod                           |

---

## Quick Start

### 1. Install
```bash
npm install
```

### 2. Environment
```bash
cp .env.example .env.local
# Edit .env.local — set DATABASE_URL and optionally SMTP settings
```

### 3. Database
```bash
npm run db:push         # Push schema to DB (dev)
# OR
npm run db:migrate      # Create migration files
```

### 4. Run
```bash
npm run dev
# Open http://localhost:3000
```

---

## Database Setup (Free Options)

**Supabase** (recommended)
1. [supabase.com](https://supabase.com) → New project → Settings → Database → Connection string
2. Use the "URI" format for `DATABASE_URL`

**Neon** (serverless, great for Vercel)
1. [neon.tech](https://neon.tech) → New project → Copy connection string

**Railway**
1. [railway.app](https://railway.app) → New project → Add PostgreSQL → Copy `DATABASE_URL`

---

## Email Setup (Gmail)

1. Enable 2FA on your Google account
2. [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) → Create App Password
3. Set in `.env.local`:
```
SMTP_USER="hello@monakin.studio"
SMTP_PASS="xxxx xxxx xxxx xxxx"
STUDIO_EMAIL="team@monakin.studio"
```
Email is optional — bookings save to DB regardless.

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── bookings/route.ts   POST (create) + GET (list)
│   │   └── upload/route.ts     POST multipart file upload
│   ├── layout.tsx
│   └── page.tsx                Full landing page
├── components/
│   ├── BookingFlow.tsx          6-step booking form
│   ├── FileUpload.tsx           Drag-and-drop uploader
│   ├── Navbar.tsx
│   └── StepIndicator.tsx
├── lib/
│   ├── types.ts                 All types + service constants
│   ├── prisma.ts                Prisma client singleton
│   ├── upload.ts                File utilities
│   └── email.ts                 Email templates (Nodemailer)
└── styles/
    └── globals.css              Complete CSS design system (no Tailwind)

prisma/schema.prisma             DB models
public/uploads/                  Uploaded files (auto-created)
```

---

## Booking Flow (6 Steps)

| Step | Content |
|------|---------|
| 1 | Select services from list (with prices) + SaaS toggle |
| 2 | SaaS product type, user scale, feature checklist |
| 3 | Project name, description, budget, timeline, priority |
| 4 | Drag-and-drop file upload (images, PDFs, docs, ZIPs) |
| 5 | Contact info (name, email, phone, company, source) |
| 6 | Full review summary → confirm → DB + emails |

---

## API Reference

### POST `/api/bookings`
```json
{
  "services": ["uiux", "web"],
  "isSaasProject": false,
  "projectName": "My Project",
  "description": "At least 20 chars...",
  "budget": "₹75K – ₹2L",
  "timeline": "1–3 Months",
  "firstName": "Arjun",
  "lastName": "Sharma",
  "email": "arjun@co.com",
  "phone": "+91 9876543210",
  "uploadedFileIds": ["id1", "id2"]
}
```
Returns: `{ success: true, refCode: "MNK-XXXXXX", bookingId: "..." }`

### POST `/api/upload`
Multipart form-data, field name `files`.  
Returns: `{ success: true, files: [{ id, filename, size, mimeType, url }] }`

### GET `/api/bookings`
Query params: `status`, `limit`, `page`

---

## Customisation

**Services & prices** → Edit `STUDIO_SERVICES` in `src/lib/types.ts`

**Color palette** → Edit CSS variables in `src/styles/globals.css` → `:root`

**Add a service** → Add to `STUDIO_SERVICES` array with same shape

**Production file storage** → Replace `writeFile` in `/api/upload/route.ts` with S3 / Cloudflare R2

---

## Deploy to Vercel

```bash
npx vercel
# Add env vars in Vercel dashboard
```

> ⚠️ Note: Local disk uploads (`public/uploads/`) don't persist on Vercel's serverless environment. For production, use S3 or Cloudflare R2. Everything else works perfectly on Vercel.
