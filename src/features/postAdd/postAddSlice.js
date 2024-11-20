import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_ADD_POST_URL = 'http://127.0.0.1:8000/api/posts/add'

export const addPost = createAsyncThunk(
  'posts/addPost',
  async (postData, thunkAPI) => {
    try {
      const token = localStorage.getItem('jwt')
      const response = await axios.post(API_ADD_POST_URL, postData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Erreur inconnue')
    }
  }
)

const postAddSlice = createSlice({
  name: 'addPost',
  initialState: {
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addPost.pending, state => {
        state.status = 'loading'
      })
      .addCase(addPost.fulfilled, state => {
        state.status = 'succeeded'
        state.error = null
      })
      .addCase(addPost.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  }
})

export default postAddSlice.reducer
