import { createSlice } from "@reduxjs/toolkit";
import { registerAction } from "../actions/auth.action";

const initialState = {
  loading: "",
  message: "",
  error: false,
  apiName: "",
  alertType: "",
  verifyResetToken: null,
  emailStatus: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.alertType = "";
      state.apiName = "";
      state.message = "";
    },
    errorMessage: (state, action) => {
      state.alertType = action.payload.alertType;
      state.apiName = action.payload.apiName;
      state.message = action.payload.message;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerAction.pending, (state) => {
      state.apiName = "signup";
      state.loading = "signup";
    });
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.loading = "";
      state.alertType = "success";
      state.message = action.payload.message;
    });
    builder.addCase(registerAction.rejected, (state, action) => {
      state.loading = "";
      state.alertType = "error";
      if (action.payload) {
        state.message = action.payload.message;
      }
    });

  },
});

export const { clearMessage, errorMessage } = authSlice.actions;
export default authSlice.reducer;
