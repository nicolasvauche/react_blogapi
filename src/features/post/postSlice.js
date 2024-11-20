import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../axios'

export const fetchCategoryPosts = createAsyncThunk(
  'posts/fetchCategoryPosts',
  async (slug, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/categories/${slug}/posts`)
      return response.data._embedded.posts
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Erreur inconnue')
    }
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
