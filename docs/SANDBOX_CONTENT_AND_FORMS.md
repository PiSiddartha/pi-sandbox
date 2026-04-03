# Pi Sandbox — Content & Form Input (for leadership)

Use this doc to define the **on-screen descriptions** for each sandbox page and the **questions/fields** for the Request Access form. Once filled in, the dev team can plug these into the app.

---

## How the sandbox works

- **Audience:** New users who get sandbox access first (before full Pi Repository).
- **Each page:** Two short paragraphs of description (left) + a tutorial video placeholder (right). Product pages also show a **Request Access** button.
- **Request Access form:** Shown when a user clicks "Request Access" on Pi Symphony, Pi Shield, Pi Recon, or Pi Deepsearch. Submissions will be reviewed in the admin console.

---

## 1. Page descriptions

For each page, provide **two short paragraphs** (2–4 sentences each). Keep tone benefit-focused and POC-friendly. Current placeholder text is in italics below—replace with final copy.

---

### Dashboard

**Paragraph 1**  
*[What the Dashboard is and what it shows—KPIs, trends, etc.]*

**Paragraph 2**  
*[Why it matters—e.g. charts that make it easier to spot issues, share with team, etc.]*

---

### Analytics 360

**Paragraph 1**  
*[What Analytics 360 covers—risk, fraud, financials, demographics, etc.]*

**Paragraph 2**  
*[How it helps—e.g. turn data into decisions, see where to optimize, etc.]*

---

### Checkout Designs

**Paragraph 1**  
*[What Checkout Designs does—templates, themes, branding, preview.]*

**Paragraph 2**  
*[Why it matters—e.g. on-brand checkout, conversion, trust.]*

---

### Reports

**Paragraph 1**  
*[What Reports offers—transaction history, custom reports, exports, filters.]*

**Paragraph 2**  
*[Why it helps—e.g. find what you need, export for finance/compliance.]*

---

### Integrations

**Paragraph 1**  
*[What Integrations covers—providers, acquirers, billing descriptors, SCA.]*

**Paragraph 2**  
*[Why one place helps—e.g. fewer errors, easier to add/change providers.]*

---

### Pi Symphony

**Paragraph 1**  
*[What Pi Symphony is—orchestration, routing, rules, contracts.]*

**Paragraph 2**  
*[Why it helps—e.g. smarter routing, lower costs, better approval rates.]*

---

### Pi Shield

**Paragraph 1**  
*[What Pi Shield does—fraud protection, thresholds, order review.]*

**Paragraph 2**  
*[Why it helps—e.g. fewer chargebacks, more confidence in approvals.]*

---

### Pi Recon

**Paragraph 1**  
*[What Pi Recon is—reconciliation, matching, exception handling.]*

**Paragraph 2**  
*[Why it helps—e.g. less manual work, faster close.]*

---

### Pi Deepsearch

**Paragraph 1**  
*[What Pi Deepsearch is—conversational analytics, natural language.]*

**Paragraph 2**  
*[Why it helps—e.g. get insights without building reports.]*

---

### Help & Support

**Paragraph 1**  
*[What Help & Support is—docs, FAQs, tickets, P1.]*

**Paragraph 2**  
*[Why it helps—e.g. right docs and clear path to support.]*

---

### Settings

**Paragraph 1**  
*[What Settings covers—preferences, notifications, config.]*

**Paragraph 2**  
*[Why it helps—e.g. one place to control access and behavior.]*

---

## 2. Request Access form (product modules)

This form appears when a user clicks **Request Access** on **Pi Symphony**, **Pi Shield**, **Pi Recon**, or **Pi Deepsearch**. Submissions are for leadership/admin review.

**Current (static) fields:**

| Field            | Type   | Required | Notes                    |
|------------------|--------|----------|--------------------------|
| Name             | Text   | Yes      | Full name                 |
| Email            | Email  | Yes      | Contact email             |
| Why do you need access? | Textarea | Yes | Free text, 3 rows        |

**Product name** (e.g. Pi Symphony) is auto-set based on the page; no need to ask.

---

### What should the form ask? (for leadership)

Use the table below to define the **final** set of fields. Add rows, remove rows, or change labels/requirements as needed. Dev will implement to match.

| # | Field label (as shown to user) | Type (text / email / dropdown / textarea / etc.) | Required? (Y/N) | Notes / options |
|---|--------------------------------|---------------------------------------------------|----------------|------------------|
| 1 | Name                           | Text                                              | Y              |                  |
| 2 | Email                          | Email                                             | Y              |                  |
| 3 | Why do you need access?        | Textarea                                          | Y              |                  |
| 4 | *[Add more if needed]*         | *e.g. Role, Company, Use case, etc.*               |                |                  |

**Other decisions to capture:**

- **Success message** after submit: *[e.g. "Thanks. We’ll review your request and get back within 2 business days."]*
- **Any dropdown options?** (e.g. "Primary use case: Integration / Reporting / Fraud review / Other")
- **Should we ask which product they want,** or is it always the page they’re on? *(Currently: auto from page.)*
- **Where do submissions go?** (e.g. admin console, email, CRM—for dev to wire later)

---

## 3. Quick reference — where this goes in the app

| Item                    | Used in / file |
|-------------------------|----------------|
| Page descriptions       | `app/**/page.tsx` → `SandboxPage` `description={[...]}` |
| Form field list         | `components/RequestAccessForm.tsx` (and any API that receives submissions) |
| Form success message    | `RequestAccessForm.tsx` (post-submit text) |

---

*Doc version: 1.0 — Pi Sandbox POC. Update this file as leadership provides final copy and form design.*
