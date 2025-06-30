

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import localStorage from '../../utils/localStorage';
import type { APIsuccessResponse } from '../../libs/axios';

export const fetchProfileAction = createAsyncThunk<APIsuccessResponse>(
  'user/fetchProfile',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5500/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return thunkAPI.fulfillWithValue(response.data); 
    } catch (error:any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch profile'
      );
    }
  }
);
