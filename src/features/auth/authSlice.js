import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_LOGIN_URL = 'http://127.0.0.1:8000/auth/login'

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(API_LOGIN_URL, { email, password })
      const { token } = response.data
      localStorage.setItem('jwt', token)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Erreur inconnue')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'idle', // idle | loading | succeeded | failed
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(login.fulfilled, state => {
        state.status = 'succeeded'
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  }
})

export default authSlice.reducer
