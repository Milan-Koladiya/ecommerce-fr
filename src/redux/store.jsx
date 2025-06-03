import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './slice/alertSlice';
import authReducer from './slice/authSlice';

 const store = configureStore({
  reducer: {
    alert: alertReducer, 
    auth:authReducer
  },
});

export default store