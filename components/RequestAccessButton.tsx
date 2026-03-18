"use client";

import { useState } from "react";
import { RequestAccessForm } from "./RequestAccessForm";

interface RequestAccessButtonProps {
  productName: string;
  productSlug: string;
}

export function RequestAccessButton({
  productName,
  productSlug,
}: RequestAccessButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm shadow-sm hover:opacity-90 transition-opacity"
      >
        Request Access
      </button>
      {open && (
        <RequestAccessForm
          productName={productName}
          productSlug={productSlug}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
