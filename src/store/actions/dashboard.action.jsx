// src/store/actions/dashboard.action.js
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import localStorage from '../../utils/localStorage'

export const fetchDashboardSummary = createAsyncThunk(
  'dashboard/fetchSummary',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:5500/admin/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response)
      return thunkAPI.fulfillWithValue(response.data.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to load dashboard')
    }
  }
)
