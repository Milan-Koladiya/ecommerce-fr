import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerAction = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5500/auth/register', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error?.response?.data?.message || 'Registration failed'
      });
    }
  }
);
