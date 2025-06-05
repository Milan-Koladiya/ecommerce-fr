import { configureStore } from "@reduxjs/toolkit";

import authSlice from '../store/reducers/auth.reducers';
import categorySlice from '../store/reducers/category.reducers'

const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice
  },
});

export default store;