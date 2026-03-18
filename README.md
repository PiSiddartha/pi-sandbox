# Pi Sandbox

A sandbox mirror of the Pi Repository frontend for onboarding. New users get access to this environment first (e.g. via credentials from the admin console) to learn the platform before being granted access to the full Pi Repository (client.payintelli.com).

## What’s in this app

- **Same sidebar** as the Pi Repository: Main (Dashboard, Analytics 360, Checkout Designs, Reports, Integrations), Products (Pi Symphony, Pi Shield, Pi Recon, Pi Deepsearch), and Management (Help & Support, Documentation, Settings).
- **No real APIs or data**: each page shows a short description on the left and a placeholder for a **tutorial video** on the right.
- **Product pages** (Symphony, Shield, Recon, Deepsearch) include a **Request Access** button (top right). Clicking it opens a simple form (name, email, reason). Submission is a bare-bones pipeline for now; it can later be wired to the admin console so you can review and approve access per product.
- **Design** matches the Pi Repository (fonts, colors, sidebar layout) so the experience feels consistent.
- **Authentication** is not implemented yet. Cognitive-based auth for the Sandbox can be added later.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use the sidebar to move between pages.

## Later integration

- **Admin console**: When a user submits “Request Access”, send the payload to your admin/onboarding API so you can review and approve. Form fields can be extended as needed.
- **Videos**: Replace the video placeholders with real tutorial URLs or files (e.g. `videoSrc` in each page or a shared config).
- **Auth**: Add cognitive-based (or other) authentication for the Sandbox and protect routes as required.
