import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import localStorage from '../../utils/localStorage'
import type { ICategory,UpdateCategoryArgs } from '../../types/category.type';
import type { APIsuccessResponse } from '../../libs/axios';

export const fetchCategoryAction = createAsyncThunk<APIsuccessResponse>(
    "category/fetchAll",
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get("http://localhost:5500/categories/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error:any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch categories"
            );
        }
    }
);




export const addCategoryAction = createAsyncThunk<APIsuccessResponse,ICategory>(
    "category/",
    async (name, thunkAPI) => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.post("http://localhost:5500/categories/",name, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return thunkAPI.fulfillWithValue({ success: true,message:response.data.message, data: response.data.data });
        } catch (error:any) {
        
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to add categories"
            );
        }
    }
);


export const deleteCategoryAction = createAsyncThunk<APIsuccessResponse,ICategory>(
    "category/delete",
    async (id, thinkAPI) => {
        try {
            const token = localStorage.getItem('token')

            const res = await axios.delete(`http://localhost:5500/categories/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return thinkAPI.fulfillWithValue(res.data);
        } catch (error:any) {
            return thinkAPI.rejectWithValue(error.response?.data?.message || "Delete failed");
        }
    }
);

export const editCategoryAction = createAsyncThunk<APIsuccessResponse,UpdateCategoryArgs>(
    "category/edit",
    async ({id,body},thinkAPI) => {
        try {
            
            const token = localStorage.getItem('token')
            const res = await axios.put(`http://localhost:5500/categories/${id}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            return thinkAPI.fulfillWithValue(res.data)
        }
        catch (error:any) {
            console.log(error)
            return thinkAPI.rejectWithValue(error.response?.data?.message || "Update failed");

        }
    }
)