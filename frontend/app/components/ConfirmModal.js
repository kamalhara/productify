"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle, X } from "lucide-react";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  loading = false,
}) {
  const overlayRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-100 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn" />

      {/* Modal */}
      <div className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-scaleIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 text-text-muted dark:text-neutral-500 hover:text-text-primary dark:hover:text-white transition-colors rounded-lg hover:bg-surface-card dark:hover:bg-neutral-800 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
            variant === "danger"
              ? "bg-red-50 dark:bg-red-950 text-danger"
              : "bg-surface-card dark:bg-neutral-800 text-text-primary dark:text-white"
          }`}
        >
          <AlertTriangle className="w-6 h-6" />
        </div>

        {/* Content */}
        <h3 className="text-lg font-bold text-text-primary dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-sm text-text-secondary dark:text-neutral-400 leading-relaxed mb-6">
          {message}
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-sm font-medium text-text-primary dark:text-white bg-surface-card dark:bg-neutral-800 border border-border-default dark:border-neutral-700 rounded-full hover:bg-surface-input dark:hover:bg-neutral-700 transition-colors cursor-pointer"
            disabled={loading}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2.5 text-sm font-medium text-white rounded-full transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
              variant === "danger"
                ? "bg-danger hover:bg-danger-hover"
                : "bg-surface-dark hover:bg-surface-dark-soft"
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="spinner w-4 h-4 mx-auto border-white/30 border-t-white" />
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
