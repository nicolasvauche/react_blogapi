import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchCategoryPosts = createAsyncThunk(
  'posts/fetchCategoryPosts',
  async slug => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/categories/${slug}/posts`
    )
    return response.data._embedded.posts
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategoryPosts.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchCategoryPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts = action.payload
      })
      .addCase(fetchCategoryPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default postsSlice.reducer
