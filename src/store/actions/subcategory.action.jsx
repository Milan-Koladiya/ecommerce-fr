

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import localStorage from '../../utils/localStorage'


export const fetchSubcategoryAction = createAsyncThunk(
  "subcategory/fetchAll",
  async (_, thunkAPI) => {
    try {
        const token=localStorage.getItem('token')
      const response = await axios.get("http://localhost:5500/subcategories/allsubcategory",{
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
        }
      });
      return thunkAPI.fulfillWithValue(response.data.data); 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);