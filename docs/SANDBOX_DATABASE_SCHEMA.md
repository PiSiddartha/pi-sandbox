# Pi Sandbox — database schema (vs `DataDump`)

Pi Sandbox **Request Access** objects live in the **`public`** schema (same database as the main PayIntelli dump: `uuid-ossp`, `public.modules`, `public.clients`, `public.admin_users`). There is **no separate `sandbox` schema** in the current DDL.

---

## DDL files

| File | Purpose |
|------|---------|
| `db/sandbox_schema.sql` | **Apply on the same DB** that already has `public` tables from the main dump (so FKs resolve). Creates enums + tables in **`public`**. |
| `db/sandbox_schema_rollback.sql` | **Only if you previously applied** `CREATE SCHEMA sandbox` / old DDL: drops the entire `sandbox` schema (`DROP SCHEMA CASCADE`). **Back up data first** if anything important lived there. |

### Run-now SQL (already-applied DB)

If your DB is already created/applied, run this standalone SQL to add video S3 storage metadata:

```sql
CREATE TABLE IF NOT EXISTS public.sandbox_video_asset (
    sandbox_video_asset_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    module_slug public.pi_sandbox_module_slug_enum,
    title character varying(255) NOT NULL,
    description text,
    s3_bucket character varying(255) NOT NULL,
    s3_key text NOT NULL,
    s3_uri text NOT NULL,
    mime_type character varying(100),
    duration_seconds integer,
    file_size_bytes bigint,
    is_active boolean DEFAULT true NOT NULL,
    created_by character varying(100),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT sandbox_video_asset_pkey PRIMARY KEY (sandbox_video_asset_id),
    CONSTRAINT sandbox_video_asset_bucket_key_unique UNIQUE (s3_bucket, s3_key)
);

ALTER TABLE public.sandbox_video_asset OWNER TO piadmin;

COMMENT ON TABLE public.sandbox_video_asset IS 'Metadata registry for Pi Sandbox videos; stores S3 location and display metadata.';
COMMENT ON COLUMN public.sandbox_video_asset.s3_uri IS 'Canonical S3 URI format: s3://<bucket>/<key>.';
COMMENT ON COLUMN public.sandbox_video_asset.updated_at IS 'Set by application/Lambda on INSERT/UPDATE; not maintained by DB triggers.';
```

**Order if migrating from old `sandbox` schema**

1. Export/migrate any data you need from `sandbox.*` tables (if applicable).
2. Run `sandbox_schema_rollback.sql` to remove the `sandbox` schema.
3. Run `sandbox_schema.sql` to create tables in `public`.

**Prerequisites**

- `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";` (already in dump)
- Tables: `public.modules`, `public.clients`, `public.admin_users`

If you apply on an **empty** database, either:

1. Load the core `DataDump` first, then run `sandbox_schema.sql`, or  
2. Remove / comment the `FOREIGN KEY` constraints to `public.*` and add them later.

---

## Types (`public`)

Enum names use a **`pi_sandbox_` prefix** to avoid collisions with existing `public.*` types from the main dump.

| Type | Values |
|------|--------|
| `public.pi_sandbox_module_slug_enum` | `symphony`, `shield`, `recon`, `deepsearch` (matches `RequestAccessForm` `productSlug`) |
| `public.pi_sandbox_module_access_request_status_enum` | `PENDING`, `UNDER_REVIEW`, `APPROVED`, `REJECTED`, `CANCELLED` |

---

## Tables (`public`)

### `public.module_access_request`

Stores each **Request Access** submission from the sandbox UI.

| Column | Type | Notes |
|--------|------|--------|
| `module_access_request_id` | `uuid` PK | Default `uuid_generate_v4()` |
| `module_slug` | `pi_sandbox_module_slug_enum` | Which product page |
| `product_name_display` | `varchar(100)` | e.g. `Pi Symphony` (snapshot for history) |
| `requester_name` | `varchar(255)` | Form: Name |
| `requester_email` | `varchar(255)` | Form: Email |
| `justification` | `text` | Form: “Why do you need access?” |
| `status` | enum | Default `PENDING` |
| `module_id` | `integer` FK → `public.modules(module_id)` | Optional when slug maps to row |
| `client_id` | `integer` FK → `public.clients(id)` | Optional after admin links merchant |
| `reviewed_at` | `timestamptz` | When decision made |
| `reviewed_by_admin_id` | `varchar(100)` FK → `public.admin_users(id)` | Who reviewed |
| `review_notes` | `text` | Internal notes |
| `source` | `varchar(50)` | Default `PI_SANDBOX` |
| `user_agent` / `ip_address` | optional | Abuse / support |
| `created_at` / `updated_at` | `timestamptz` | `updated_at` set by **Lambda/app** on INSERT/UPDATE (no DB trigger) |

---

### Indexes (v1)

**No secondary (non-PK) indexes** are defined in `sandbox_schema.sql`. The DDL only creates **primary keys**, **foreign key constraints** (PostgreSQL does not auto-index FK columns—add indexes if you filter/join heavily on those columns), and **`public.sandbox_user.email` UNIQUE**.

Add secondary indexes when real query patterns and volume justify them (e.g. admin list by `status` + `created_at`, filter by `module_slug`, lookup by `lower(requester_email)`). Optional **trigram** on `justification` remains a commented example in the DDL (`pg_trgm`).

---

### `public.module_access_request_audit`

Mirror of **audit** style in the dump (`client_modules_audit`, etc.). **Rows are inserted by Lambdas** on INSERT/UPDATE/DELETE of the parent row (not DB triggers).

| Column | Notes |
|--------|--------|
| `module_access_request_audit_id` | `bigint` identity PK |
| `module_access_request_id` | FK → request row |
| `action` | e.g. `INSERT`, `UPDATE`, `DELETE` |
| `old_*` / `new_*` | Status, `module_id`, `client_id`, `reviewed_at`, `reviewed_by_admin_id`, `review_notes`, `requester_name`, `requester_email`, `justification` |
| `changed_at`, `changed_by` | |

---

### `public.sandbox_user` (optional / future)

Placeholder for **sandbox-only identity** (e.g. cognitive auth). Not required for v1 Request Access.

| Column | Notes |
|--------|--------|
| `sandbox_user_id` | `uuid` PK |
| `email` | unique |
| `display_name`, `status`, `notes` | |
| `updated_at` | Set by **Lambda/app** (no DB trigger) |

---

### `public.sandbox_user_audit`

Audit trail for `sandbox_user`. **Rows inserted by Lambdas** on INSERT/UPDATE/DELETE.

| Column | Notes |
|--------|--------|
| `sandbox_user_audit_id` | `bigint` identity PK |
| `sandbox_user_id` | FK → `sandbox_user` |
| `action` | e.g. `INSERT`, `UPDATE`, `DELETE` |
| `old_*` / `new_*` | `email`, `display_name`, `status`, `notes` |
| `changed_at`, `changed_by` | |

---

### `public.sandbox_video_asset`

Stores S3 locations and metadata for videos shown in Pi Sandbox.

| Column | Notes |
|--------|--------|
| `sandbox_video_asset_id` | `uuid` PK |
| `module_slug` | Optional module grouping (`symphony`, `shield`, `recon`, `deepsearch`) |
| `title`, `description` | Display metadata for UI |
| `s3_bucket`, `s3_key`, `s3_uri` | Canonical S3 location fields |
| `mime_type`, `duration_seconds`, `file_size_bytes` | Optional media metadata |
| `is_active` | Soft toggle to hide/deprecate videos without delete |
| `created_by`, `created_at`, `updated_at` | Audit-friendly ownership and timestamps |
| `UNIQUE (s3_bucket, s3_key)` | Prevents duplicate registration of the same object |

---

## App ↔ database mapping

| UI / API field | DB column |
|----------------|-----------|
| `productSlug` | `module_slug` |
| `productName` | `product_name_display` |
| `name` | `requester_name` |
| `email` | `requester_email` |
| `reason` | `justification` |

---

## Next steps (engineering)

1. Lambda/API: `POST` body → insert into `public.module_access_request`, set `updated_at`, append `module_access_request_audit` (`action = INSERT`).
2. Admin console: list/filter by `status`, `module_slug`; on update, set `updated_at` in Lambda, append audit rows with old/new columns.
3. Optional: Lambda or EventBridge on new request to notify Slack/email (same patterns as other flows in `pi-lambda`).

---

*Generated for Pi Sandbox; conventions referenced from repository `DataDump` (PostgreSQL 16 / `piadmin`).*
