import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../axios'

export const fetchPostDetails = createAsyncThunk(
  'postDetail/fetchPostDetails',
  async (slug, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/posts/detail/${slug}`)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Erreur inconnue')
    }
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
