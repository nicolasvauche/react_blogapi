import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchCategoryDetails = createAsyncThunk(
  'categoryDetail/fetchCategoryDetails',
  async slug => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/categories/${slug}`
    )
    return response.data
  }
)

const categoryDetailSlice = createSlice({
  name: 'categoryDetail',
  initialState: {
    category: null,
    status: 'idle',
    error: null
  },
  reducers: {
    resetCategoryDetail: state => {
      state.category = null
      state.status = 'idle'
      state.error = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategoryDetails.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchCategoryDetails.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.category = action.payload
      })
      .addCase(fetchCategoryDetails.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { resetCategoryDetail } = categoryDetailSlice.actions
export default categoryDetailSlice.reducer
