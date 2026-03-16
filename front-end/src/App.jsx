import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import CategoryModal from './components/CategoryModal'
import ImageDetailsModal from './components/ImageDetailsModal'
import ImageGrid from './components/ImageGrid'
import {
  closeCategoryModal,
  clearSelectedImage,
  fetchImages,
  openCategoryModal,
  selectImage,
  setCategory,
  setPage,
  setSortBy,
} from './features/images/imagesSlice'


// main app component
const App = () => {
  const dispatch = useDispatch()
  const {
    category,
    error,
    isCategoryModalOpen,
    items,
    page,
    selectedImage,
    sortBy,
    status,
    totalHits,
    totalPages,
  } = useSelector((state) => state.images)

  const requestImages = (nextCategory, nextPage, nextSortBy) => {
    dispatch(
      fetchImages({
        category: nextCategory,
        page: nextPage,
        sortBy: nextSortBy,
      }),
    )
  }

  const handlePageChange = (nextPage) => {
    dispatch(setPage(nextPage))
    requestImages(category, nextPage, sortBy)
  }

  const handleCategoryChange = (nextCategory) => {
    dispatch(setCategory(nextCategory))
    dispatch(closeCategoryModal())
    requestImages(nextCategory, 1, sortBy)
  }

  const handleSortChange = (event) => {
    const nextSortBy = event.target.value

    dispatch(setSortBy(nextSortBy))
    requestImages(category, 1, nextSortBy)
  }

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <p className="eyebrow">Home assignment</p>
        <div className="hero-copy">
          <div>
            <h1>SnapFind</h1>
            <p>
              Enjoy a clean 3x3 layout that stays up-to-date with fast, smart data syncing.
            </p>
          </div>
          <div className="hero-stats">
            <span>{totalHits} results</span>
            <span>Category: {category}</span>
            <span>Page {page} of {Math.max(totalPages, 1)}</span>
          </div>
        </div>
      </section>

      <section className="gallery-panel">
        <header className="gallery-toolbar">
          <button
            className="toolbar-button"
            disabled={page <= 1 || status === 'loading'}
            onClick={() => handlePageChange(page - 1)}
            type="button"
          >
            Prev
          </button>

          <button
            className="toolbar-button toolbar-button--accent"
            onClick={() => dispatch(openCategoryModal())}
            type="button"
          >
            Choose category
          </button>

          <button
            className="toolbar-button"
            disabled={page >= totalPages || status === 'loading' || totalPages === 0}
            onClick={() => handlePageChange(page + 1)}
            type="button"
          >
            Next
          </button>
        </header>

        <div className="gallery-controls">
          <label className="sort-control" htmlFor="sortBy">
            <span>Sort images</span>
            <select id="sortBy" onChange={handleSortChange} value={sortBy}>
              <option value="id">oldest</option>
              <option value="date">newest</option>
            </select>
          </label>

          {status === 'loading' ? <span className="status-badge">Loading images...</span> : null}
          {error ? <span className="status-badge status-badge--error">{error}</span> : null}
        </div>

        <ImageGrid images={items} onSelectImage={(image) => dispatch(selectImage(image))} />
      </section>

      <CategoryModal
        currentCategory={category}
        isOpen={isCategoryModalOpen}
        onClose={() => dispatch(closeCategoryModal())}
        onConfirm={handleCategoryChange}
      />

      <ImageDetailsModal
        image={selectedImage}
        isOpen={Boolean(selectedImage)}
        onClose={() => dispatch(clearSelectedImage())}
      />
    </main>
  )
}

export default App
