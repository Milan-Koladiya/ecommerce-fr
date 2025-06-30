import { configureStore } from "@reduxjs/toolkit";

import authSlice from './reducers/auth.reducers';
import categorySlice from './reducers/category.reducers'
import subcategorySlice from './reducers/subcategory.reducers'
import productSlice from './reducers/product.reducer'
import ordersSlice from './reducers/order.reducers'
import userReducer from './reducers/users.reducres';
import dashboardSlice from './reducers/dashboard.reducers'

const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice,
    subcategory: subcategorySlice,
    product: productSlice,
    orders: ordersSlice,
    user: userReducer,
    dashboard: dashboardSlice

  },
});

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch

export default store;