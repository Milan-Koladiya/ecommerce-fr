import { configureStore } from "@reduxjs/toolkit";

import authSlice from '../store/reducers/auth.reducers';
import categorySlice from '../store/reducers/category.reducers'
import subcategorySlice from '../store/reducers/subcategory.reducers'
import productSlice from '../store/reducers/product.reducer'
import ordersSlice from '../store/reducers/order.reducers'
import userReducer from '../store/reducers/users.reducres';
import dashboadSlice from '../store/reducers/dashboard.reducres'

const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice,
    subcategory:subcategorySlice,
    product:productSlice,
    orders:ordersSlice,
        user: userReducer,
        dashboard:dashboadSlice

  },
});

export default store;