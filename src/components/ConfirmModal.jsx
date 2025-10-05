import React from "react";
import "./ConfirmModal.css";

export default function ConfirmModal({
  open,
  title = "Confirm",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  busy = false,
}) {
  if (!open) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("confirm-modal-overlay")) {
      if (!busy) onCancel?.();
    }
  };

  return (
    <div className="confirm-modal-overlay" onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <div className="confirm-modal">
        <div className="confirm-modal-header">
          <h3 className="confirm-modal-title">{title}</h3>
        </div>
        <div className="confirm-modal-body">
          <p className="confirm-modal-message">{message}</p>
        </div>
        <div className="confirm-modal-actions">
          <button
            className="cm-btn cm-cancel"
            onClick={onCancel}
            disabled={busy}
          >
            {cancelText}
          </button>
          <button
            className="cm-btn cm-confirm"
            onClick={onConfirm}
            disabled={busy}
          >
            {busy ? "Working..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
