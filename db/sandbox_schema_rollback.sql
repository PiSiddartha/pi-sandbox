--
-- Roll back the old **sandbox** schema (from an earlier DDL that used CREATE SCHEMA sandbox).
--
-- Run this on pi_database (or your target DB) if you previously applied objects under schema `sandbox`
-- and want to remove them before using `sandbox_schema.sql` (tables in **public** only).
--
-- WARNING: DROP SCHEMA ... CASCADE deletes all tables, types, and data in `sandbox`. Back up first if needed.
--

DROP SCHEMA IF EXISTS sandbox CASCADE;
