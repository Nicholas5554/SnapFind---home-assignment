// modal component used to display content in a dialog.
const Modal = ({ children, description, isOpen, onClose, title }) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <section
        aria-modal="true"
        aria-label={title}
        className="modal-card"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <header className="modal-header">
          <div>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <button className="toolbar-button modal-close" onClick={onClose} type="button">
            Close
          </button>
        </header>
        {children}
      </section>
    </div>
  )
}

export default Modal