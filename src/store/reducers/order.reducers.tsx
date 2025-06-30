import { createSlice } from "@reduxjs/toolkit";
import { fetchOrderyAction } from "../actions/order.action";

interface initialStateType {
  loading: boolean,
  error: null|unknown,
  alertType: string,
  apiName: string,
  message: string,
  order: object,
}

const initialState: initialStateType = {
  loading: false,
  error: null,
  alertType: "",
  apiName: "",
  message: "",
  order: {}
}

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.alertType = "";
      state.apiName = "";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderyAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderyAction.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderyAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessage } = orderSlice.actions;
export default orderSlice.reducer;
