import { PropsWithChildren, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  title?: string;
  open?: boolean;
  onClose: () => void;
}

export default function Modal({
  title,
  open = true,
  onClose,
  children,
}: PropsWithChildren<ModalProps>) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal
      className="fixed inset-0 z-[9999] grid place-items-center"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Card */}
      <div
        className="relative z-10 w-[92vw] max-w-5xl rounded-2xl bg-white p-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h2 className="mb-3 text-lg font-semibold">{title}</h2>}
        {children}
      </div>
    </div>,
    document.body
  );
}
