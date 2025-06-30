import { createSlice } from '@reduxjs/toolkit';
import { fetchDashboardSummary } from '../actions/dashboard.action';

export interface DashboardDataType {
  totalUsers: number;
  totalCategories: number;
  totalSubcategories: number;
}

interface initialStateType{
  loading:boolean,
  data:DashboardDataType|null,
  error:null|string|unknown
}

const initialState:initialStateType={
    loading: false,
    data:null ,
    error: null,
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDashboardSummary.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDashboardSummary.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchDashboardSummary.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default dashboardSlice.reducer;
