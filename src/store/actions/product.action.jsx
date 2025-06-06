import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import localStorage from '../../utils/localStorage'


export const fetchProductAction = createAsyncThunk(
    "product/fetchAll",
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get("http://localhost:5500/product/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
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


export const addProductAction = createAsyncThunk(
  "product/",
  async (arg, thunkAPI) => {
    try {
        const token=localStorage.getItem('token')
      const response = await axios.post("http://localhost:5500/product/",arg,{
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'multipart/form-data'
        }
      });
      return thunkAPI.fulfillWithValue(response.data); 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);



export const deleteProductAction = createAsyncThunk(
    "subcategory/delete",
    async (id, thunkAPI) => {
        try {
            const token = localStorage.getItem('token')

            const res = await axios.delete(`http://localhost:5500/product/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return thunkAPI.fulfillWithValue(res.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Delete failed");
        }
    }
);