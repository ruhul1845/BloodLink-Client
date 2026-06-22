"use client";

export default function ConfirmModal({ open, title, message, confirmLabel = "Confirm", busy = false, onConfirm, onClose }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
        <h2 id="confirm-title" className="text-2xl font-black">{title}</h2>
        <p className="mt-3 text-[#667085]">{message}</p>
        <div className="mt-7 flex justify-end gap-3">
          <button type="button" className="btn-ghost" onClick={onClose} disabled={busy}>Cancel</button>
          <button type="button" className="btn-update" onClick={onConfirm} disabled={busy}>{busy ? "Updating..." : confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}
