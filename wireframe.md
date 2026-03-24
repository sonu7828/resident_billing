# Wireframe Documentation (Frontend)

## 📌 Overview

This document defines the low-fidelity structural wireframes for the system.
The UI is designed as a **minimal SaaS dashboard** focused on:

* Ledger-based accounting (OPOS)
* Fast data entry
* Clear outstanding balance visibility

⚠️ No invoice-based UI anywhere in the system.

---

# 🧭 Global Layout

```
--------------------------------------------------
| Sidebar        | Topbar                        |
|----------------|------------------------------|
| Dashboard      | Page Title        | User Menu|
| Residents      |--------------------------------
| Payments       | Main Content Area            |
| Bank           |                              |
| Reminders      |                              |
| Reports        |                              |
| Settings       |                              |
--------------------------------------------------
```

---

# 🏠 Dashboard

```
--------------------------------------------------
| Dashboard                                      |
--------------------------------------------------

[Card] Total Outstanding
[Card] Monthly Received
[Card] Overdue Residents

--------------------------------------------------

[Chart: Outstanding Trend]

--------------------------------------------------

[Recent Activity Table]
- Resident A paid €500
- Resident B charged €1200

--------------------------------------------------

[Quick Actions]
[+ Add Resident]   [+ Add Payment]
```

---

# 👤 Residents List

```
--------------------------------------------------
| Residents                          [+ Add]      |
--------------------------------------------------

[Search 🔍]   [Filter: House ▼]   [Status ▼]

--------------------------------------------------
| Name | House | Monthly | Balance | Status | ⋮ |
--------------------------------------------------
|      |       |         |         |        |   |
--------------------------------------------------

[Pagination]
```

---

# 📄 Resident Detail (Core Screen)

```
--------------------------------------------------
| ← Back | Resident Name                         |
--------------------------------------------------

[Profile Section]
Name | House | Monthly Charge | Status

--------------------------------------------------

[Summary]
Total Charged | Total Paid | Outstanding

--------------------------------------------------

[Tabs]
[Ledger] [Payments] [Notes]

--------------------------------------------------

[Ledger Table - OPOS]

| Date | Type | Amount | Paid | Balance | Status |
--------------------------------------------------
|      |      |        |      |         |        |

--------------------------------------------------

[Sticky Actions]
[+ Add Payment]   [Send Reminder]
```

---

# 💳 Add Payment

```
--------------------------------------------------
| Add Payment                                   |
--------------------------------------------------

Resident: [Dropdown]
Amount:   [Input]
Date:     [Date Picker]
Method:   [Dropdown]

--------------------------------------------------

[Allocation Section]

| Select | Item | Due Amount | Allocate |
----------------------------------------
| ☑      | Jan  | 1200       | 1200     |
| ☑      | Feb  | 1200       | 300      |

----------------------------------------
Remaining: €0

--------------------------------------------------

[Cancel]                     [Save Payment]
```

---

# 🏦 Bank Transactions

```
--------------------------------------------------
| Bank Transactions                             |
--------------------------------------------------

[Upload CSV]   [Connect Bank]

--------------------------------------------------
| Date | Description | Amount | Status |
--------------------------------------------------
|      |             |        |        |

--------------------------------------------------

[Match Panel]

Transaction Details
Suggested Resident

[Confirm Match]   [Manual Assign]
```

---

# 🔔 Reminders

```
--------------------------------------------------
| Reminders                                     |
--------------------------------------------------

[Filters]
Overdue | House | Amount

--------------------------------------------------
| Select | Name | Balance | Email |
--------------------------------------------------
|        |      |         |       |

--------------------------------------------------

[Message Template]
"Dear {Name}, your outstanding balance is..."

--------------------------------------------------

[Send Email]   [Export PDF]
```

---

# 📊 Reports

```
--------------------------------------------------
| Reports                                       |
--------------------------------------------------

[Select Month ▼]

--------------------------------------------------

[Summary Cards]
Total Charged | Total Received | Outstanding

--------------------------------------------------

[Chart]
Income vs Outstanding

--------------------------------------------------

[Export]
[CSV] [Excel] [DATEV]
```

---

# ⚙️ Settings

```
--------------------------------------------------
| Settings                                      |
--------------------------------------------------

[Tabs]

- Users & Roles
- Houses
- Email Config
- Integrations

--------------------------------------------------

[Content Area]
Forms / Lists based on selected tab
```

---

# 🧠 UX Rules

* Always show **Outstanding Balance prominently**
* Ledger = single source of truth
* No invoice-related UI
* Keep actions within 1–2 clicks
* Use status indicators:

  * Paid
  * Partial
  * Overdue

---

# 🔁 Core UX Flow

```
Dashboard
   ↓
Residents List
   ↓
Resident Detail (Ledger)
   ↓
Add Payment
   ↓
Balance Update
   ↓
Reminder / Report
```

---

# 🚀 MVP Scope (Wireframe Coverage)

Included:

* Dashboard
* Residents
* Resident Detail (Ledger)
* Add Payment
* Reports (basic)

Excluded:

* Bank automation (Phase 2)
* Email automation (Phase 2)

---

# ✅ Summary

This wireframe supports:

* OPOS accounting model
* Recurring charge system
* Payment allocation flow
* Balance tracking without invoices

---
