import { configureStore } from "@reduxjs/toolkit";

import authSlice from '../store/reducers/auth.reducers';
import categorySlice from '../store/reducers/category.reducers'
import subcategorySlice from '../store/reducers/subcategory.reducers'
import productSlice from '../store/reducers/product.reducer'
const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice,
    subcategory:subcategorySlice,
    product:productSlice
  },
});

export default store;