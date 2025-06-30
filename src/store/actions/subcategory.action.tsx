import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import localStorage from '../../utils/localStorage'
import type { APIsuccessResponse } from '../../libs/axios';
import type { ISubcategory,EditSubcategoryArgs } from "../../types/subcategory.type"

export const fetchSubcategoryAction = createAsyncThunk<APIsuccessResponse>(
  "subcategory/fetchAll",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get("http://localhost:5500/subcategories/allsubcategory", {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);


export const addSubcategoryAction = createAsyncThunk<APIsuccessResponse, ISubcategory>(
  "subcategory/",
  async (arg, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post("http://localhost:5500/subcategories/", arg, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch subcategories"
      );
    }
  }
);



export const deleteSubcategoryAction = createAsyncThunk<APIsuccessResponse, ISubcategory>(
  "subcategory/delete",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')

      const res = await axios.delete(`http://localhost:5500/subcategories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Delete failed");
    }
  }
);

export const editSubcategoryAction = createAsyncThunk<APIsuccessResponse, EditSubcategoryArgs>(
  "subcategory/edit",
  async ({ id, body }, thinkAPI) => {
    try {

      const token = localStorage.getItem('token')
      const res = await axios.put(`http://localhost:5500/subcategories/${id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      return thinkAPI.fulfillWithValue(res.data)
    }
    catch (error: any) {
      console.log(error)
      return thinkAPI.rejectWithValue(error.response?.data?.message || "Update failed");

    }
  }
)