# Optimax Opticle — Billing System

A full-stack billing and invoice management system built specifically for optical shops. Handles sales, inventory, customer records, and professional PDF invoice generation.

**Live Demo:** [optimaxbill.app/login](https://optimaxbill.app/login) · **GitHub:** [optical-shop-bill-system](https://github.com/KaviduRavishanHasaranga/optical-shop-bill-system.git)

---

## Overview

Optical shops deal with complex billing — frame prices, lens prices, prescription details, coatings, and insurance. Most generic billing software doesn't handle this well. Optimax was built from scratch to fit this exact domain.

The system manages the full sales workflow: customer walk-in → prescription record → item selection → invoice generation → payment tracking.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router, Tailwind CSS |
| Backend | Node.js, Express |
| Database | PostgreSQL |
| ORM | Prisma |
| PDF Generation | PDFKit |
| Auth | JWT (access + refresh tokens) |
| Deployment | VPS (Ubuntu), Nginx, PM2 |

---

## Key Features

### 📋 Invoice Management
- Create detailed invoices with multiple line items
- Support for frame + lens + coating combinations
- Custom discount fields per line item and per invoice
- Automatic tax calculation
- PDF export with branded letterhead

### 👤 Customer Records
- Store prescription history (SPH, CYL, AXIS, ADD for each eye)
- Track purchase history per customer
- Search and filter customers by name, phone, or NIC

### 📦 Inventory Tracking
- Frame and lens catalog with stock counts
- Low-stock alerts
- Price management with effective dates

### 💰 Payment Tracking
- Record partial payments and outstanding balances
- Mark invoices as paid / partially paid / unpaid
- Daily/weekly/monthly sales summary reports

### 🔐 Role-Based Access
- **Admin**: Full access including settings and user management
- **Cashier**: Create and view invoices only
- **Owner**: Read-only dashboard and reports

---

## Architecture

```
Client (React SPA)
      │
      │  HTTP/JSON
      ▼
  Express API
  ├── /auth        JWT auth middleware
  ├── /customers   CRUD + prescription records
  ├── /products    Frame + lens catalog
  ├── /invoices    Invoice CRUD + PDF export
  └── /reports     Aggregated sales data
      │
      │  Prisma ORM
      ▼
  PostgreSQL
```

---

## Database Schema (Key Tables)

```sql
-- Customers with prescription
CREATE TABLE customers (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  nic TEXT UNIQUE,
  r_sph DECIMAL, r_cyl DECIMAL, r_axis INT, r_add DECIMAL,
  l_sph DECIMAL, l_cyl DECIMAL, l_axis INT, l_add DECIMAL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Invoices
CREATE TABLE invoices (
  id UUID PRIMARY KEY,
  invoice_number TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES customers(id),
  subtotal DECIMAL NOT NULL,
  discount DECIMAL DEFAULT 0,
  tax DECIMAL DEFAULT 0,
  total DECIMAL NOT NULL,
  paid_amount DECIMAL DEFAULT 0,
  status TEXT DEFAULT 'unpaid',  -- unpaid | partial | paid
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Line items
CREATE TABLE invoice_items (
  id UUID PRIMARY KEY,
  invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL NOT NULL,
  discount DECIMAL DEFAULT 0,
  line_total DECIMAL NOT NULL
);
```

---

## API Endpoints

```http
POST   /auth/login
POST   /auth/refresh

GET    /customers
POST   /customers
GET    /customers/:id
PUT    /customers/:id

GET    /invoices?page=1&limit=20&status=unpaid
POST   /invoices
GET    /invoices/:id
PUT    /invoices/:id
DELETE /invoices/:id
GET    /invoices/:id/pdf          # streams PDF

GET    /reports/daily?date=2025-02-01
GET    /reports/summary?from=2025-01-01&to=2025-01-31
```

---

## PDF Invoice Generation

```typescript
// Simplified PDF generation with PDFKit
import PDFDocument from 'pdfkit';

export function generateInvoicePDF(invoice: Invoice): Buffer {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  const chunks: Buffer[] = [];

  doc.on('data', chunk => chunks.push(chunk));

  // Header
  doc.fontSize(20).text('OPTIMAX OPTICLE', { align: 'center' });
  doc.fontSize(10).text(`Invoice #${invoice.invoiceNumber}`, { align: 'right' });

  // Line items table
  invoice.items.forEach(item => {
    doc.text(`${item.productName}  x${item.quantity}  Rs. ${item.lineTotal}`);
  });

  // Totals
  doc.text(`Total: Rs. ${invoice.total}`, { align: 'right' });

  doc.end();
  return Buffer.concat(chunks);
}
```

---

## Challenges & Solutions

### Challenge: Complex Lens Pricing
Lens prices depend on power range, coating type, and material. A lookup table with ~200 combinations was needed.

**Solution**: Built a `lens_pricing` table with range-based lookups. The frontend pre-fetches the pricing matrix and calculates the price client-side as the optician fills in the prescription.

### Challenge: PDF Alignment
Generating a professional-looking PDF with dynamic line items was tricky.

**Solution**: Used PDFKit's `x/y` coordinate system with a custom table renderer function that tracks the current Y position and handles page breaks automatically.

---

## Deployment

```bash
# Server: Ubuntu VPS
# Process manager: PM2
# Reverse proxy: Nginx
# SSL: Let's Encrypt (Certbot)

pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## What I Learned

- Designing domain-specific data models (optical prescriptions aren't just numbers — the sign and combination matter medically)
- PDF generation at scale — streaming vs buffering for large reports
- Multi-role auth in a small business context where security vs. usability is a real trade-off
- Handling partial payments and reconciliation logic without double-counting
