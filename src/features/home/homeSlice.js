import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api/posts/latest'

export const fetchLatestPosts = createAsyncThunk(
  'home/fetchLatestPosts',
  async () => {
    const response = await axios.get(API_URL)
    return response.data
  }
)

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    latestPosts: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchLatestPosts.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchLatestPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.latestPosts = action.payload
      })
      .addCase(fetchLatestPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default homeSlice.reducer
