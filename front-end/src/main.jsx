import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { store } from './app/store'
import { fetchImages } from './features/images/imagesSlice'
import './index.css'

const { category, page, sortBy } = store.getState().images

// Fetch the initial gallery data before the main React tree renders.
await store.dispatch(fetchImages({ category, page, sortBy }))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
