 import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import localStorage from '../../utils/localStorage'
import type { APIsuccessResponse } from '../../libs/axios';

export const fetchOrderyAction = createAsyncThunk<APIsuccessResponse>(
    "order/fetchAll",
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('token')
            console.log(token)
            const response = await axios.post("http://localhost:5500/orders/userOrders",{}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log(response)
            return thunkAPI.fulfillWithValue(response.data.data);
        } catch (error:any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch order"
            );
        }
    }
);