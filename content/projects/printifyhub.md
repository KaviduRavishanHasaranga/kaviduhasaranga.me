# Printify Hub - Printing Shop Billing System

A full-stack billing and invoice management system built for printing and graphic design businesses. Handles quotations, job orders, final invoices, and tracks payments across multiple job types.

**GitHub:** [Printify-Hub-billing](https://github.com/KaviduRavishanHasaranga/Printify-Hub-billing.git)

---

## Overview

Print shops deal with diverse, custom-priced jobs — business cards, banners, brochures, t-shirt prints, signage. Each job has different materials, sizes, quantities, and finishes. Standard billing software either doesn't support custom job types or is overly complex for a small print shop owner.

Lanka Print Studio's billing system was built to be **simple, fast, and tailored** to the printing industry.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router |
| Backend | Node.js, Express |
| Database | PostgreSQL |
| ORM | Prisma |
| PDF Generation | PDFKit |
| Auth | JWT |
| Styling | Tailwind CSS |

---

## Key Features

### 🖨️ Job Order Management
- Create job orders with custom job types (business cards, banners, flyers, etc.)
- Specify dimensions, quantity, material, finish, and unit price
- Track job status: **Pending → In Progress → Completed → Delivered**

### 💼 Quotation System
- Generate quotations before confirming an order
- Convert approved quotation → invoice with one click
- Email-ready PDF quotation export

### 🧾 Invoice & Payment
- Auto-generate invoice number (LPS-2025-0001 format)
- Record advance payments and balance due
- Mark invoices as fully paid
- Print-ready A4 invoice PDF

### 📊 Business Reports
- Daily job completion summary
- Monthly revenue by job type
- Outstanding balance report

### 👥 Customer Management
- Customer profiles with purchase history
- Track outstanding balances per customer
- Search by name, phone, or business name

---

## Architecture

```
React SPA (Frontend)
│
│  REST API (JSON)
▼
Express.js API Server
├── /auth           Authentication
├── /customers      Customer CRUD
├── /jobs           Job order management
├── /quotations     Quotation flow
├── /invoices       Invoice + PDF export
└── /reports        Business analytics
│
│  Prisma ORM
▼
PostgreSQL Database
```

---

## Prisma Schema (Key Models)

```prisma
model Customer {
  id          String     @id @default(uuid())
  name        String
  phone       String?
  email       String?
  business    String?
  jobs        Job[]
  invoices    Invoice[]
  createdAt   DateTime   @default(now())
}

model Job {
  id          String     @id @default(uuid())
  customer    Customer   @relation(fields: [customerId], references: [id])
  customerId  String
  jobType     String     // business_card | banner | flyer | tshirt | other
  description String
  width       Float?
  height      Float?
  unit        String?    // cm | inch | m
  quantity    Int
  material    String?
  finish      String?    // gloss | matte | laminated
  unitPrice   Decimal
  totalPrice  Decimal
  status      JobStatus  @default(PENDING)
  invoice     Invoice?   @relation(fields: [invoiceId], references: [id])
  invoiceId   String?
  createdAt   DateTime   @default(now())
}

model Invoice {
  id            String      @id @default(uuid())
  invoiceNumber String      @unique
  customer      Customer    @relation(fields: [customerId], references: [id])
  customerId    String
  jobs          Job[]
  subtotal      Decimal
  discount      Decimal     @default(0)
  total         Decimal
  paidAmount    Decimal     @default(0)
  status        PayStatus   @default(UNPAID)
  createdAt     DateTime    @default(now())
}

enum JobStatus  { PENDING IN_PROGRESS COMPLETED DELIVERED }
enum PayStatus  { UNPAID PARTIAL PAID }
```

---

## API Design

```http
# Auth
POST   /auth/login
POST   /auth/refresh

# Customers
GET    /customers?search=lakshmi
POST   /customers
GET    /customers/:id
PUT    /customers/:id

# Jobs
GET    /jobs?status=PENDING&customerId=abc
POST   /jobs
PUT    /jobs/:id
PATCH  /jobs/:id/status    body: { status: "IN_PROGRESS" }

# Invoices
GET    /invoices?status=UNPAID
POST   /invoices            body: { customerId, jobIds[], discount }
GET    /invoices/:id
GET    /invoices/:id/pdf    streams PDF
PATCH  /invoices/:id/payment  body: { amount }

# Reports
GET    /reports/daily?date=2025-03-01
GET    /reports/revenue?from=2025-01-01&to=2025-03-31&groupBy=jobType
GET    /reports/outstanding
```

---

## PDF Invoice Layout

The PDF invoice includes:
- Shop header with logo placeholder, address, and contact
- Customer details and invoice number
- Job order table with columns: Job Type, Description, Qty, Unit Price, Total
- Subtotal, discount, and grand total
- Payment status badge
- Footer with bank details and "Thank You" message

```typescript
// Simplified invoice PDF generation
function drawJobTable(doc: PDFKit.PDFDocument, jobs: Job[]) {
  const columns = [
    { label: 'Job Type', width: 120 },
    { label: 'Description', width: 180 },
    { label: 'Qty', width: 50 },
    { label: 'Unit Price', width: 80 },
    { label: 'Total', width: 80 },
  ];

  let y = doc.y;
  columns.forEach((col, i) => {
    const x = 50 + columns.slice(0, i).reduce((s, c) => s + c.width, 0);
    doc.text(col.label, x, y, { width: col.width, align: 'left' });
  });

  jobs.forEach(job => {
    y += 20;
    // Draw each row...
  });
}
```

---

## Challenges & Solutions

### Challenge: Flexible Job Types
Every print shop has different job categories. Hardcoding job types would make the system unusable for different shops.

**Solution**: Job type is a free-text field on the `Job` model. The frontend suggests common types from previous entries (via an autocomplete that queries the DB). New types are added organically as the shop creates them.

### Challenge: Quotation → Invoice Conversion
Converting a quotation to an invoice without duplicating data or causing inconsistencies.

**Solution**: Quotations and invoices share the same `Invoice` model. A `isQuotation: boolean` flag distinguishes them. On conversion, the flag is flipped and `invoiceNumber` is assigned — no data migration needed.

---

## What I Learned

- Prisma's type-safe query builder dramatically reduces bugs at the data layer
- PostgreSQL's `DECIMAL` type is essential for financial data — never use `FLOAT` for money
- Building for small business owners requires extreme simplicity: fewer clicks, fewer fields, fewer decisions
- PDF generation with dynamic tables (page breaks, row overflow) is harder than it looks — good abstraction in the table renderer pays off
