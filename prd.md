# Frontend Product Requirement Document (PRD)

## 📌 Project Overview

This system is a **web-based accounting interface** for managing:

* Residents (as debtor accounts)
* Recurring monthly charges
* Payment tracking
* Open balances (OPOS system)
* Reminders (without invoices)

⚠️ Important:

* No invoice generation
* Ledger-based system (single source of truth)

---

## 🎯 Goals

* Simple UI for non-technical staff (3 users)
* Fast data entry & tracking
* Clear visibility of outstanding balances
* Minimal training required

---

## 👥 Target Users

| Role  | Description                                   |
| ----- | --------------------------------------------- |
| Admin | Full access (settings, reports, integrations) |
| Staff | Manage residents, payments, reminders         |

---

## 🧩 Core Modules (Frontend Scope)

### 1. Dashboard

Displays:

* Total Outstanding Balance
* Monthly Payments Received
* Overdue Residents Count
* Recent Activities

Actions:

* Add Resident
* Add Payment

---

### 2. Resident Management

#### Resident List

* Table view
* Search & filters (House, Status)

Columns:

* Name
* House
* Monthly Charge
* Outstanding Balance
* Status

#### Resident Detail (Critical Screen)

Sections:

* Profile Info
* Summary (Charged / Paid / Balance)
* Ledger (OPOS entries)

Actions:

* Add Payment
* Send Reminder

---

### 3. Ledger (OPOS UI)

Each entry shows:

* Date
* Type (Charge / Payment)
* Amount
* Paid Amount
* Remaining Balance
* Status

Rules:

* Charges = positive
* Payments = negative
* Oldest items first allocation

---

### 4. Payment Module

#### Add Payment

Fields:

* Resident (dropdown)
* Amount
* Date
* Method

#### Allocation UI

* Show open items
* Allow:

  * Auto allocation
  * Manual allocation

---

### 5. Bank Transactions

Features:

* CSV Upload
* Transaction list
* Match status

Actions:

* Auto match suggestion
* Manual assignment

---

### 6. Reminder System

Features:

* Filter overdue residents
* Select multiple users
* Email template editor

Actions:

* Send email
* Export reminder

---

### 7. Reports

Displays:

* Monthly totals
* Outstanding balances

Exports:

* CSV
* Excel
* DATEV

---

### 8. Settings

Includes:

* User roles
* Houses (locations)
* Email configuration
* Integrations

---

## 🎨 UI/UX Requirements

### Design Principles

* Clean & minimal (SaaS style)
* Data-first UI
* Clear typography
* No clutter

### Important UI Rules

* Always highlight **Outstanding Balance**
* Use color codes:

  * Green = Paid
  * Yellow = Partial
  * Red = Overdue

---

## 📱 Responsiveness

* Desktop-first
* Tablet support
* Mobile optional (view-only)

---

## ⚡ Performance Requirements

* Page load < 2 sec
* Table pagination required
* Lazy loading for ledger

---

## 🔐 Security (Frontend)

* Role-based UI rendering
* Secure API handling
* Input validation

---

## 🔌 API Integration (Frontend Expectations)

Endpoints needed:

* GET /residents
* GET /resident/:id
* POST /payment
* GET /ledger
* POST /reminder
* GET /reports
* POST /bank-import

---

## 🚀 MVP Scope (Phase 1)

Include:

* Dashboard
* Resident management
* Ledger view
* Manual payments
* Basic reports

Exclude:

* Bank integration
* Email automation
* DATEV export

---

## 📊 Success Metrics

* Time to add payment < 10 sec
* Error rate < 2%
* Staff usability without training

---

## 💡 Key Constraint

System must follow:
👉 OPOS (Open Item Accounting)
👉 No invoice-based flow

---
