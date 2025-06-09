import { createSlice } from '@reduxjs/toolkit';
import { fetchDashboardSummary } from '../actions/dashboard.action';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    loading: false,
    data: {},
    error: null,
  },
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
      state.error = action.payload;
    });
  },
});

export default dashboardSlice.reducer;
