import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../axios'

const API_POST_DETAILS_URL = '/posts/detail'

// Action asynchrone pour récupérer les détails d'un article
export const fetchPostDetails = createAsyncThunk(
  'postDetail/fetchPostDetails',
  async (slug, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `${API_POST_DETAILS_URL}/${slug}`
      )
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
    resetPostDetail: state => {
      state.post = null
      state.status = 'idle'
      state.error = null
    },
    updatePostLocally: (state, action) => {
      if (state.post) {
        state.post = {
          ...state.post,
          ...action.payload
        }
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPostDetails.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchPostDetails.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.post = action.payload
        state.error = null
      })
      .addCase(fetchPostDetails.rejected, (state, action) => {
        state.status = 'failed'
        state.post = null
        state.error = action.payload
      })
  }
})

export const { resetPostDetail, updatePostLocally } = postDetailSlice.actions
export default postDetailSlice.reducer
