import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPostDetails = createAsyncThunk(
  'postDetail/fetchPostDetails',
  async slug => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/posts/detail/${slug}`
    )
    return response.data
  }
)

const postDetailSlice = createSlice({
  name: 'postDetail',
  initialState: {
    post: null,
    status: 'idle',
    error: null
  },
  reducers: {
    resetPostDetail (state) {
      state.post = null
      state.status = 'idle'
      state.error = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPostDetails.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchPostDetails.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.post = action.payload
      })
      .addCase(fetchPostDetails.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { resetPostDetail } = postDetailSlice.actions
export default postDetailSlice.reducer
