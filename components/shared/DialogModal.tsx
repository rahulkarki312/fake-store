"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  onConfirm: () => void;
}

export default function DialogModal({
  open,
  title,
  description,
  confirmText = "Confirm",
  onConfirm,
}: ConfirmDialogProps) {
  if (!open) return null;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={onConfirm}
            />

            <div className="flex flex-col relative bg-surface rounded-2xl shadow-xl border border-border w-full max-w-md mx-4 p-6 animate-in fade-in zoom-in-95">
              <h2 className="text-lg font-semibold text-text mb-2">{title}</h2>

              {description && (
                <p className="text-sm text-text-muted mb-6">{description}</p>
              )}

              <button
                onClick={onConfirm}
                className="self-end cursor-pointer px-4 py-2 rounded-xl text-sm font-semibold bg-success text-white hover:opacity-90 transition-colors"
              >
                {confirmText}
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
