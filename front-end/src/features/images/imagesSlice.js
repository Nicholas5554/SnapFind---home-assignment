import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000'

// initial state for the images slice
const initialState = {
  items: [],
  status: 'idle',
  error: null,
  page: 1,
  pageSize: 9,
  totalPages: 0,
  totalHits: 0,
  category: 'books',
  sortBy: 'id',
  selectedImage: null,
  isCategoryModalOpen: false,
}

// async thunk for fetching images from the server based on category, page, and sortBy parameters
export const fetchImages = createAsyncThunk(
  'images/fetchImages',
  async ({ category, page, sortBy }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/images/${encodeURIComponent(category)}`, {
        params: {
          page,
          sortBy,
        },
      })

      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message ?? 'Unable to load images right now.')
    }
  },
)
// create the images slice with reducers for updating state and handling async actions
const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {

    // reducers for updating page, category, sortBy, selectedImage, and modal state
    setPage: (state, action) => {
      state.page = action.payload
    },
    setCategory: (state, action) => {
      state.category = action.payload
      state.page = 1
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
      state.page = 1
    },
    openCategoryModal: (state) => {
      state.isCategoryModalOpen = true
    },
    closeCategoryModal: (state) => {
      state.isCategoryModalOpen = false
    },
    selectImage: (state, action) => {
      state.selectedImage = action.payload
    },
    clearSelectedImage: (state) => {
      state.selectedImage = null
    },
  },

  // fetching images from the server
  extraReducers: (builder) => {
    builder
      // handle pending, fulfilled, and rejected states of fetchImages
      .addCase(fetchImages.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload.items
        state.page = action.payload.page
        state.pageSize = action.payload.pageSize
        state.totalPages = action.payload.totalPages
        state.totalHits = action.payload.totalHits
        state.category = action.payload.category
        state.sortBy = action.payload.sortBy
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
});

export const {
  clearSelectedImage,
  closeCategoryModal,
  openCategoryModal,
  selectImage,
  setCategory,
  setPage,
  setSortBy,
} = imagesSlice.actions

export default imagesSlice.reducer