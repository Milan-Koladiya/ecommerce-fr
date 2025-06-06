import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import localStorage from '../../utils/localStorage'

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

export const verifyEmailAction = createAsyncThunk(
  'auth/emailverify',
  async (arg, thinkAPI) => {
    try {
      const response = await axios.post(`http://localhost:5500/auth/emailverify`, arg);

      if (response?.status !== 200) {
        return thinkAPI.rejectWithValue(response?.data);
      }
      return thinkAPI.fulfillWithValue(response?.data);
    }
    catch (error) {
      console.log(error)
      return thinkAPI.rejectWithValue({
        message: error?.response?.data?.message || "Email Verification Error",
      });
    }

  }
)

export const loginAction = createAsyncThunk(
  'auth/login',
  async (arg, thinkAPI) => {
    try {
      const response = await axios.post("http://localhost:5500/auth/login",arg)
      if (response?.status !== 200) {
        return thinkAPI.rejectWithValue(response?.data);
      }
      console.log(response)
    
      localStorage.setItem('user',response.data.data)
      localStorage.setItem('token',response.data.data.token)
      localStorage.setItem('refresh_token',response.data.data.token)
      return thinkAPI.fulfillWithValue(response?.data);
    }
    catch (error) {
      console.log(`Something want wrong in login ${error}`)
      return thinkAPI.rejectWithValue({
        message: error?.response?.data?.message || "Login Error",
      });
    }
  }
)


export const forgetPasswordAction = createAsyncThunk(
  'auth/forgetPassword',
  async (email, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5500/auth/forget-password', { email });

      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to send reset link"
      );
    }
  }
);


export const resetPasswordAction = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, newPassword }, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5500/auth/reset-password', {
        token,
        newPassword
      });

      return thunkAPI.fulfillWithValue(response.data); 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to reset password"
      );
    }
  }
);


export const logoutAction = createAsyncThunk("auth/logout", async (_, thinkAPI) => {
    try {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        return true;
    } catch (error) {
        return thinkAPI.rejectWithValue({
            message: error?.data?.message || "Something is wrong here",
        });

    }
});