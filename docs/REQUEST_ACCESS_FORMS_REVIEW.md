# Request Access forms — CEO review (Notion-ready)

**Purpose:** The Pi Sandbox uses a **Request Access** modal on four product pages. The form is **currently hard-coded** with the same fields for every product. Use this document to **approve, change, or add** questions before we update the app.

**How to use:** Review each table. In the **CEO / leadership notes** column, write *Keep*, *Change to: …*, or *Remove*. For new fields, add a row in the “Proposed additions” section at the bottom.

---

## Summary (today’s implementation)

| Item | Value |
|------|--------|
| **Where it appears** | Pi Symphony, Pi Shield, Pi Recon, Pi Deepsearch (top-right **Request Access** on each page) |
| **Modal title pattern** | `Request Access — {Product name}` |
| **Product** | Auto-filled from the page (user does not pick a product in the form) |
| **After submit** | Message: *“Thank you. Your request has been recorded and will be reviewed.”* |
| **Backend** | Not wired yet — submissions will go to admin console / API later |

---

## Shared form fields (all four products use the same fields today)

These are the **exact** labels and types in code (`RequestAccessForm.tsx`).

| # | Field ID (code) | Label shown to user | Input type | Required | Rows / limits | CEO / leadership notes |
|---|-----------------|---------------------|------------|----------|---------------|------------------------|
| 1 | `name` | Name | Single-line text | Yes | — | |
| 2 | `email` | Email | Email | Yes | — | |
| 3 | `reason` | Why do you need access? | Multi-line text | Yes | 3 rows, no max in UI | |

| Button / action | Label |
|-----------------|--------|
| Primary | Submit Request |
| Secondary | Cancel |
| Close | × (top-right of modal) |

---

## Product-by-product detail (same form; context differs)

Each row is one **product module**. The form fields are **identical** today; only the **page** and **modal title** change.

### Pi Symphony

| Attribute | Value |
|-----------|--------|
| **Route** | `/pi-symphony` |
| **Product slug (sent on submit)** | `symphony` |
| **Modal title** | Request Access — Pi Symphony |
| **One-line product context** | AI-powered orchestration — routing, rules, contracts across payment flows. |

| # | Field | Same as shared form? | Product-specific label or help text (optional — not in app yet) | CEO / leadership notes |
|---|--------|----------------------|------------------------------------------------------------------|------------------------|
| 1 | Name | Yes | — | |
| 2 | Email | Yes | — | |
| 3 | Why do you need access? | Yes | *Optional future tweak:* e.g. “How do you plan to use Symphony (routing, rules, contracts)?” | |

---

### Pi Shield

| Attribute | Value |
|-----------|--------|
| **Route** | `/pi-shield` |
| **Product slug (sent on submit)** | `shield` |
| **Modal title** | Request Access — Pi Shield |
| **One-line product context** | Fraud protection — thresholds, order review, security controls. |

| # | Field | Same as shared form? | Product-specific label or help text (optional — not in app yet) | CEO / leadership notes |
|---|--------|----------------------|------------------------------------------------------------------|------------------------|
| 1 | Name | Yes | — | |
| 2 | Email | Yes | — | |
| 3 | Why do you need access? | Yes | *Optional future tweak:* e.g. “What fraud or risk use cases do you want to address?” | |

---

### Pi Recon

| Attribute | Value |
|-----------|--------|
| **Route** | `/pi-recon` |
| **Product slug (sent on submit)** | `recon` |
| **Modal title** | Request Access — Pi Recon |
| **One-line product context** | AI-powered reconciliation — matching transactions across systems. |

| # | Field | Same as shared form? | Product-specific label or help text (optional — not in app yet) | CEO / leadership notes |
|---|--------|----------------------|------------------------------------------------------------------|------------------------|
| 1 | Name | Yes | — | |
| 2 | Email | Yes | — | |
| 3 | Why do you need access? | Yes | *Optional future tweak:* e.g. “Which systems or data sources do you need to reconcile?” | |

---

### Pi Deepsearch

| Attribute | Value |
|-----------|--------|
| **Route** | `/pi-deepsearch` |
| **Product slug (sent on submit)** | `deepsearch` |
| **Modal title** | Request Access — Pi Deepsearch |
| **One-line product context** | Conversational analytics — natural-language questions on payment and business data. |

| # | Field | Same as shared form? | Product-specific label or help text (optional — not in app yet) | CEO / leadership notes |
|---|--------|----------------------|------------------------------------------------------------------|------------------------|
| 1 | Name | Yes | — | |
| 2 | Email | Yes | — | |
| 3 | Why do you need access? | Yes | *Optional future tweak:* e.g. “What kinds of insights or reports are you looking for?” | |

---

## Cross-product comparison (at a glance)

| Product | Slug | Modal title | Fields (same as today) |
|---------|------|-------------|-------------------------|
| Pi Symphony | `symphony` | Request Access — Pi Symphony | Name, Email, Why do you need access? |
| Pi Shield | `shield` | Request Access — Pi Shield | Name, Email, Why do you need access? |
| Pi Recon | `recon` | Request Access — Pi Recon | Name, Email, Why do you need access? |
| Pi Deepsearch | `deepsearch` | Request Access — Pi Deepsearch | Name, Email, Why do you need access? |

---

## Decisions for leadership (optional checkboxes in Notion)

| # | Question | Options / notes |
|---|----------|----------------|
| **A** | Keep one shared form for all four products, or **different fields per product**? | Same form = simpler; different = more work but more tailored. |
| **B** | Should we **rename** “Why do you need access?” to something clearer? | e.g. “Business justification”, “Use case”, “What you want to achieve”. |
| **C** | Add **Company / organization**? | Yes / No — if yes, required? |
| **D** | Add **Role** (dropdown)? | e.g. Engineering, Finance, Ops, Other — list options. |
| **E** | Add **Phone** or **Country**? | For compliance or sales follow-up. |
| **F** | **Success message** after submit — keep text or change? | Current: *Thank you. Your request has been recorded and will be reviewed.* |
| **G** | **SLA expectation** in the message? | e.g. “We’ll respond within X business days.” |

---

## Proposed new fields (add rows; dev will implement after approval)

| # | Field label | Type | Required? | Applies to | CEO / leadership notes |
|---|-------------|------|-----------|------------|------------------------|
| | | | | All / Symphony / Shield / Recon / Deepsearch | |
| | | | | | |
| | | | | | |

---

## Payload sent to backend (when wired)

| Key | Description |
|-----|-------------|
| `productName` | Display name, e.g. `"Pi Symphony"` |
| `productSlug` | `symphony` \| `shield` \| `recon` \| `deepsearch` |
| `name` | From Name field |
| `email` | From Email field |
| `reason` | From “Why do you need access?” |

---

*Document: Request Access forms — CEO review. Aligns with `pi-sandbox` as of last update.*
