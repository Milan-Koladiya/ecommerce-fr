import { configureStore } from "@reduxjs/toolkit";

import authSlice from '../store/reducers/auth.reducers';

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;