"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface RequestAccessFormProps {
  productName: string;
  productSlug: string;
  onClose: () => void;
}

/**
 * Bare-bones request access form. Submit will be wired to admin console later.
 * Cognitive-based auth for Sandbox can be added later.
 * Rendered via portal so it appears above sidebar and all content.
 */
export function RequestAccessForm({
  productName,
  productSlug,
  onClose,
}: RequestAccessFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: POST to admin console / onboarding API
    console.log("Request Access", {
      productName,
      productSlug,
      name,
      email,
      reason,
    });
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const overlay = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-card border border-border rounded-lg shadow-lg max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Request Access — {productName}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        {submitted ? (
          <p className="text-sm text-muted-foreground">
            Thank you. Your request has been recorded and will be reviewed.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md text-foreground bg-background"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md text-foreground bg-background"
                required
              />
            </div>
            <div>
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Why do you need access?
              </label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-input rounded-md text-foreground bg-background resize-none"
                required
              />
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90"
              >
                Submit Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );

  if (!mounted || typeof document === "undefined") return null;
  return createPortal(overlay, document.body);
}
