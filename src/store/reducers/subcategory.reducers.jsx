


import { createSlice } from "@reduxjs/toolkit";
import { fetchSubcategoryAction } from "../actions/subcategory.action";

const categorySlice = createSlice({
  name: "subcategory",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    
      builder.addCase(fetchSubcategoryAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      builder.addCase(fetchSubcategoryAction.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      builder.addCase(fetchSubcategoryAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
