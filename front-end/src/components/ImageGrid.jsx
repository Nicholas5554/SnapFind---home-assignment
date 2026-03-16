// image grid component to display the images returned from the api
const ImageGrid = ({ images, onSelectImage }) => {
  if (!images.length) {
    return (
      <div className="empty-state">
        <h2>No images available</h2>
        <p>Choose another category to load a new set of Pixabay results.</p>
      </div>
    )
  }

  return (
    <section className="image-grid">
      {images.map((image) => (
        <button
          className="image-card"
          key={image.id}
          onClick={() => onSelectImage(image)}
          type="button"
        >
          <img alt={image.tags} src={image.webformatURL} />
        </button>
      ))}
    </section>
  )
}

export default ImageGrid