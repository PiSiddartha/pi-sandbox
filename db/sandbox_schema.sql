--
-- Pi Sandbox — PostgreSQL objects in **public** (aligned with PayIntelli DataDump conventions)
-- Extensions: uuid-ossp (same as dump). Optional: pg_trgm for search on justification.
--
-- Apply on a database that already has public.modules, public.clients, public.admin_users
-- (from main dump). If sandbox-only DB, comment out FKs marked OPTIONAL.
--
-- No DB triggers for updates: Lambdas set updated_at and append audit rows.
--
-- Types use a pi_sandbox_* prefix to reduce collisions with existing public.* types from the dump.
--

-- ---------------------------------------------------------------------------
-- Types (public schema)
-- ---------------------------------------------------------------------------

CREATE TYPE public.pi_sandbox_module_slug_enum AS ENUM (
    'symphony',
    'shield',
    'recon',
    'deepsearch'
);

COMMENT ON TYPE public.pi_sandbox_module_slug_enum IS 'Product modules that expose Request Access in Pi Sandbox (matches app productSlug).';

CREATE TYPE public.pi_sandbox_module_access_request_status_enum AS ENUM (
    'PENDING',
    'UNDER_REVIEW',
    'APPROVED',
    'REJECTED',
    'CANCELLED'
);

COMMENT ON TYPE public.pi_sandbox_module_access_request_status_enum IS 'Lifecycle of a module access request from sandbox UI until admin decision.';

-- ---------------------------------------------------------------------------
-- Core: Request Access form submissions (Pi Symphony, Shield, Recon, Deepsearch)
-- ---------------------------------------------------------------------------

CREATE TABLE public.module_access_request (
    module_access_request_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    module_slug public.pi_sandbox_module_slug_enum NOT NULL,
    product_name_display character varying(100) NOT NULL,
    requester_name character varying(255) NOT NULL,
    requester_email character varying(255) NOT NULL,
    justification text NOT NULL,
    status public.pi_sandbox_module_access_request_status_enum DEFAULT 'PENDING'::public.pi_sandbox_module_access_request_status_enum NOT NULL,
    -- Optional link to master data when known (nullable for anonymous sandbox POC)
    module_id integer,
    client_id integer,
    reviewed_at timestamp with time zone,
    reviewed_by_admin_id character varying(100),
    review_notes text,
    source character varying(50) DEFAULT 'PI_SANDBOX'::character varying,
    user_agent character varying(500),
    ip_address inet,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT module_access_request_pkey PRIMARY KEY (module_access_request_id),
    CONSTRAINT fk_module_access_request_module FOREIGN KEY (module_id) REFERENCES public.modules(module_id) ON DELETE SET NULL,
    CONSTRAINT fk_module_access_request_client FOREIGN KEY (client_id) REFERENCES public.clients(id) ON DELETE SET NULL,
    CONSTRAINT fk_module_access_request_reviewer FOREIGN KEY (reviewed_by_admin_id) REFERENCES public.admin_users(id) ON DELETE SET NULL
);

ALTER TABLE public.module_access_request OWNER TO piadmin;

COMMENT ON TABLE public.module_access_request IS 'Request Access submissions from Pi Sandbox (per-product modal: name, email, justification).';
COMMENT ON COLUMN public.module_access_request.updated_at IS 'Set by application/Lambda on INSERT/UPDATE; not maintained by DB triggers.';

COMMENT ON COLUMN public.module_access_request.module_slug IS 'Which product page the user requested (symphony|shield|recon|deepsearch).';
COMMENT ON COLUMN public.module_access_request.product_name_display IS 'UI label at submit time e.g. Pi Symphony (denormalized for history).';
COMMENT ON COLUMN public.module_access_request.justification IS 'Maps to form field “Why do you need access?”';
COMMENT ON COLUMN public.module_access_request.source IS 'Origin system e.g. PI_SANDBOX for future multi-channel.';
COMMENT ON COLUMN public.module_access_request.module_id IS 'Optional FK to public.modules when slug maps to module_id.';
COMMENT ON COLUMN public.module_access_request.client_id IS 'Optional: link to client once identified in admin flow.';

-- Trigram search on justification (optional; requires pg_trgm on DB)
-- CREATE INDEX idx_module_access_request_justification_trgm ON public.module_access_request USING gin (justification public.gin_trgm_ops);


-- ---------------------------------------------------------------------------
-- Audit: module access requests (Lambdas insert rows on INSERT/UPDATE/DELETE)
-- ---------------------------------------------------------------------------

CREATE TABLE public.module_access_request_audit (
    module_access_request_audit_id bigint NOT NULL,
    module_access_request_id uuid NOT NULL,
    action character varying(20) NOT NULL,
    old_status public.pi_sandbox_module_access_request_status_enum,
    new_status public.pi_sandbox_module_access_request_status_enum,
    old_module_id integer,
    new_module_id integer,
    old_client_id integer,
    new_client_id integer,
    old_reviewed_at timestamp with time zone,
    new_reviewed_at timestamp with time zone,
    old_reviewed_by_admin_id character varying(100),
    new_reviewed_by_admin_id character varying(100),
    old_review_notes text,
    new_review_notes text,
    old_requester_name character varying(255),
    new_requester_name character varying(255),
    old_requester_email character varying(255),
    new_requester_email character varying(255),
    old_justification text,
    new_justification text,
    changed_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    changed_by character varying(100) NOT NULL
);

ALTER TABLE public.module_access_request_audit OWNER TO piadmin;

ALTER TABLE public.module_access_request_audit ALTER COLUMN module_access_request_audit_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.module_access_request_audit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

ALTER TABLE ONLY public.module_access_request_audit
    ADD CONSTRAINT module_access_request_audit_pkey PRIMARY KEY (module_access_request_audit_id);

ALTER TABLE ONLY public.module_access_request_audit
    ADD CONSTRAINT fk_module_access_request_audit_request FOREIGN KEY (module_access_request_id) REFERENCES public.module_access_request(module_access_request_id) ON DELETE CASCADE;

COMMENT ON TABLE public.module_access_request_audit IS 'Audit trail for module access requests. Rows written by Lambdas (INSERT/UPDATE/DELETE); not DB triggers.';
COMMENT ON COLUMN public.module_access_request_audit.action IS 'INSERT | UPDATE | DELETE (or narrow e.g. STATUS_CHANGE if Lambdas prefer).';


-- ---------------------------------------------------------------------------
-- Optional: future cognitive / sandbox identity (stub — extend when auth ships)
-- ---------------------------------------------------------------------------

CREATE TABLE public.sandbox_user (
    sandbox_user_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying(255) NOT NULL,
    display_name character varying(255),
    status character varying(20) DEFAULT 'ACTIVE'::character varying NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    notes text,
    CONSTRAINT sandbox_user_pkey PRIMARY KEY (sandbox_user_id),
    CONSTRAINT sandbox_user_email_unique UNIQUE (email)
);

ALTER TABLE public.sandbox_user OWNER TO piadmin;

COMMENT ON TABLE public.sandbox_user IS 'Optional future: sandbox-only user identity (e.g. cognitive auth). Not required for Request Access v1.';
COMMENT ON COLUMN public.sandbox_user.updated_at IS 'Set by application/Lambda on INSERT/UPDATE; not maintained by DB triggers.';


-- ---------------------------------------------------------------------------
-- Audit: sandbox_user (Lambdas insert rows on INSERT/UPDATE/DELETE)
-- ---------------------------------------------------------------------------

CREATE TABLE public.sandbox_user_audit (
    sandbox_user_audit_id bigint NOT NULL,
    sandbox_user_id uuid NOT NULL,
    action character varying(20) NOT NULL,
    old_email character varying(255),
    new_email character varying(255),
    old_display_name character varying(255),
    new_display_name character varying(255),
    old_status character varying(20),
    new_status character varying(20),
    old_notes text,
    new_notes text,
    changed_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    changed_by character varying(100) NOT NULL
);

ALTER TABLE public.sandbox_user_audit OWNER TO piadmin;

ALTER TABLE public.sandbox_user_audit ALTER COLUMN sandbox_user_audit_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.sandbox_user_audit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

ALTER TABLE ONLY public.sandbox_user_audit
    ADD CONSTRAINT sandbox_user_audit_pkey PRIMARY KEY (sandbox_user_audit_id);

ALTER TABLE ONLY public.sandbox_user_audit
    ADD CONSTRAINT fk_sandbox_user_audit_user FOREIGN KEY (sandbox_user_id) REFERENCES public.sandbox_user(sandbox_user_id) ON DELETE CASCADE;

COMMENT ON TABLE public.sandbox_user_audit IS 'Audit trail for sandbox_user. Rows written by Lambdas; not DB triggers.';

-- ---------------------------------------------------------------------------
-- Video assets: store S3 location metadata for sandbox videos
-- ---------------------------------------------------------------------------

CREATE TABLE public.sandbox_video_asset (
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
