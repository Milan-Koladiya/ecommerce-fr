// src/store/reducers/user.reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchProfileAction } from "../actions/user.action";

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    loading: false,
    error: null,
    alertType: "",
    apiName: "",
    message: "",
  },
  reducers: {
    clearMessage: (state) => {
      state.alertType = "";
      state.apiName = "";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfileAction.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfileAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessage } = userSlice.actions;
export default userSlice.reducer;
