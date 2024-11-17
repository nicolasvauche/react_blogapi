import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAuthorDetails = createAsyncThunk(
  'author/fetchAuthorDetails',
  async authorSlug => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/users/${authorSlug}`
    )
    return response.data
  }
)

const authorSlice = createSlice({
  name: 'author',
  initialState: {
    author: null,
    status: 'idle',
    error: null
  },
  reducers: {
    resetAuthorDetail (state) {
      state.author = null
      state.status = 'idle'
      state.error = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAuthorDetails.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchAuthorDetails.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.author = action.payload
      })
      .addCase(fetchAuthorDetails.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { resetAuthorDetail } = authorSlice.actions
export default authorSlice.reducer
