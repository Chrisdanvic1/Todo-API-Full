// Simple confirmation modal, used for the "delete task" flow.
//
// Props:
// - open: boolean
// - title, text: strings shown in the dialog
// - confirmLabel: label for the destructive button (default "Delete")
// - onConfirm(): called when the user confirms
// - onCancel(): called when the user cancels / closes the dialog
export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  text,
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="modal-title" id="confirm-dialog-title">
          {title}
        </p>
        {text ? <p className="modal-text">{text}</p> : null}
        <div className="modal-actions">
          <button type="button" className="btn btn-secondary btn-sm" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger btn-sm" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
