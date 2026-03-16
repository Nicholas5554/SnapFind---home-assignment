import { useEffect, useState } from 'react'
import Modal from './Modal'

const CATEGORY_OPTIONS = ['sports', 'animals', 'work', 'travel', 'nature', 'books'];


// Modal component for selecting a photo category
const CategoryModal = ({ currentCategory, isOpen, onClose, onConfirm }) => {
  const [draftCategory, setDraftCategory] = useState(currentCategory)

  // Reset the draft category when the current category or modal open state changes
  useEffect(() => {
    setDraftCategory(currentCategory)
  }, [currentCategory, isOpen])

  // Handle form submission to confirm the category
  const handleSubmit = (event) => {
    event.preventDefault()

    const nextCategory = draftCategory.trim().toLowerCase()

    if (!nextCategory) {
      return
    }

    onConfirm(nextCategory)
  }

  return (
    <Modal
      title="Select a category"
      description="Pick one from the list or type your own"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="modal-body">
        <div className="category-options">
          {CATEGORY_OPTIONS.map((option) => (
            <button
              className={`category-chip ${draftCategory === option ? 'category-chip--active' : ''}`}
              key={option}
              onClick={() => setDraftCategory(option)}
              type="button"
              style={{ cursor: 'pointer' }}
            >
              {option}
            </button>
          ))}
        </div>

        <form className="category-form" onSubmit={handleSubmit}>
          <label htmlFor="category-input">
            <span>Custom category</span>
            <input
              id="category-input"
              onChange={(event) => setDraftCategory(event.target.value)}
              placeholder="Type a category such as architecture"
              value={draftCategory}
            />
          </label>

          <div className="modal-footer">
            <button className="toolbar-button" onClick={onClose} type="button">
              Cancel
            </button>
            <button className="toolbar-button toolbar-button--accent" type="submit">
              Load images
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default CategoryModal