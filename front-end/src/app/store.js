import { configureStore } from '@reduxjs/toolkit'
import imagesReducer from '../features/images/imagesSlice'

// configure the Redux store with the images reducer
export const store = configureStore({

  // reducer that manages the state of the images in the application
  reducer: {
    images: imagesReducer,
  },
})