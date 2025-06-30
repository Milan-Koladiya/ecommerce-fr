import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import localStorage from '../../utils/localStorage'
import type { APIsuccessResponse } from '../../libs/axios';
import type { IProduct,EditProduct } from '../../types/productType';

export const fetchProductAction = createAsyncThunk<APIsuccessResponse>(
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
        } catch (error:any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch categories"
            );
        }
    }
);


export const addProductAction = createAsyncThunk<APIsuccessResponse,IProduct>(
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
    } catch (error:any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);



export const deleteProductAction = createAsyncThunk<APIsuccessResponse,IProduct>(
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
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Delete failed");
        }
    }
);




export const editProductAction = createAsyncThunk<APIsuccessResponse,EditProduct>(
    "product/edit",
    async ({id,formData},thinkAPI) => {
        try {
            
            const token = localStorage.getItem('token')
            const res = await axios.put(`http://localhost:5500/product/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log("product response+++++++++",formData)
            return thinkAPI.fulfillWithValue(res.data)
        }
        catch (error:any) {
            console.log(error)
            return thinkAPI.rejectWithValue(error.response?.data?.message || "Update failed");

        }
    }
)