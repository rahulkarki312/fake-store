"use client";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />

      <div className="relative bg-surface rounded-2xl shadow-xl border border-border w-full max-w-md mx-4 p-6 animate-in fade-in zoom-in-95">
        <h2 className="text-lg font-semibold text-text mb-2">{title}</h2>

        {description && (
          <p className="text-sm text-text-muted mb-6">{description}</p>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="cursor-pointer px-4 py-2 rounded-xl text-sm font-medium border border-border bg-background hover:bg-border-muted transition-colors"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="cursor-pointer px-4 py-2 rounded-xl text-sm font-semibold bg-error text-white hover:opacity-90 transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
