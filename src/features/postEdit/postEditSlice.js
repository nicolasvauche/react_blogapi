import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../axios'

const API_EDIT_POST_URL = '/posts/edit'

export const editPost = createAsyncThunk(
  'posts/editPost',
  async ({ slug, ...postData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(
        `${API_EDIT_POST_URL}/${slug}`,
        postData
      )
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Erreur inconnue')
    }
  }
)

const postEditSlice = createSlice({
  name: 'editPost',
  initialState: {
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(editPost.pending, state => {
        state.status = 'loading'
      })
      .addCase(editPost.fulfilled, state => {
        state.status = 'succeeded'
        state.error = null
      })
      .addCase(editPost.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  }
})

export default postEditSlice.reducer
