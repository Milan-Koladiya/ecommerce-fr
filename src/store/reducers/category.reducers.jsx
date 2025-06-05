
import { createSlice } from "@reduxjs/toolkit";
import { fetchCategoryAction } from "../actions/category.action";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    
      builder.addCase(fetchCategoryAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      builder.addCase(fetchCategoryAction.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      builder.addCase(fetchCategoryAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
