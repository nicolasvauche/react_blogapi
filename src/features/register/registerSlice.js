import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_REGISTER_URL = 'http://127.0.0.1:8000/api/register'

export const register = createAsyncThunk(
  'register/register',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(API_REGISTER_URL, userData)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Erreur inconnue')
    }
  }
)

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    status: 'idle', // idle | loading | succeeded | failed
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(register.fulfilled, state => {
        state.status = 'succeeded'
        state.error = null
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  }
})

export default registerSlice.reducer
