import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import localStorage from '../../utils/localStorage'


export const fetchCategoryAction = createAsyncThunk(
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
            return thunkAPI.fulfillWithValue(response.data.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch categories"
            );
        }
    }
);




export const addCategoryAction = createAsyncThunk(
    "category/",
    async (arg, thunkAPI) => {
        console.log("action ", arg)
        try {
            const token = localStorage.getItem('token')

            const response = await axios.post("http://localhost:5500/categories/", arg, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return thunkAPI.fulfillWithValue({ success: true,message:response.data.message, data: response.data.data });
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to add categories"
            );
        }
    }
);


export const deleteCategoryAction = createAsyncThunk(
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
        } catch (error) {
            return thinkAPI.rejectWithValue(error.response?.data?.message || "Delete failed");
        }
    }
);

export const editCategoryAction = createAsyncThunk(
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
        catch (error) {
            console.log(error)
            return thinkAPI.rejectWithValue(error.response?.data?.message || "Update failed");

        }
    }
)