import Modal from './Modal'

// This component displays the details of an image
const ImageDetailsModal = ({ image, isOpen, onClose }) => {
  if (!image) {
    return null
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="modal-body detail-layout">
        <img
          alt={image.tags}
          className="detail-image"
          src={image.largeImageURL ?? image.webformatURL}
        />

        <div className="detail-list">
          <span>
            <strong>Photographer</strong>
            <em>{image.user}</em>
          </span>
          <span>
            <strong>Views</strong>
            <em>{image.views}</em>
          </span>
          <span>
            <strong>Downloads</strong>
            <em>{image.downloads}</em>
          </span>
          <span>
            <strong>Collections</strong>
            <em>{image.collections}</em>
          </span>
          <span>
            <strong>Likes</strong>
            <em>{image.likes}</em>
          </span>
          <span>
            <strong>Comments</strong>
            <em>{image.comments}</em>
          </span>
        </div>
      </div>
    </Modal>
  )
}

export default ImageDetailsModal