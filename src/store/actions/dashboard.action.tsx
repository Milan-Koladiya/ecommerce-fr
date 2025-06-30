import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import localStorage from '../../utils/localStorage'

type DashboardDataType = {
  totalUsers: number;
  totalCategories: number;
  totalSubcategories: number;
}; 

export const fetchDashboardSummary = createAsyncThunk<DashboardDataType>(
  'dashboard/fetchSummary',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:5500/admin/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return thunkAPI.fulfillWithValue(response.data.data)
    } catch (error:any) {
      console.log('fetchdashboard data error------------',error)
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to load dashboard')
    }
  }
)
