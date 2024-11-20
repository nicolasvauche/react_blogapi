import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../axios'

export const fetchLatestPosts = createAsyncThunk(
  'home/fetchLatestPosts',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/posts/latest')
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Erreur inconnue')
    }
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
