
import { createSlice } from "@reduxjs/toolkit";
import { fetchProductAction } from "../actions/product.action";

const categorySlice = createSlice({
  name: "product",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    
      builder.addCase(fetchProductAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      builder.addCase(fetchProductAction.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      builder.addCase(fetchProductAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
