import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../axios'

const API_URL = '/users/me'

export const checkAuth = createAsyncThunk(
  'authCheck/checkAuth',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('jwt')
    if (!token) {
      return thunkAPI.rejectWithValue('Aucun token présent')
    }

    try {
      const response = await axiosInstance.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('jwt')
        return thunkAPI.rejectWithValue('Token invalide ou expiré')
      }
      return thunkAPI.rejectWithValue('Erreur inconnue')
    }
  }
)

const authCheckSlice = createSlice({
  name: 'authCheck',
  initialState: {
    user: null,
    isAuthenticated: false,
    status: 'idle', // idle | loading | succeeded | failed
    error: null
  },
  reducers: {
    logout: state => {
      state.user = null
      state.isAuthenticated = false
      state.status = 'idle'
      state.error = null
      localStorage.removeItem('jwt')
    },
    forceAuthCheck: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(checkAuth.pending, state => {
        state.status = 'loading'
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.status = 'failed'
        state.isAuthenticated = false
        state.user = null
        state.error = action.payload
      })
  }
})

export const { logout, forceAuthCheck } = authCheckSlice.actions
export default authCheckSlice.reducer
