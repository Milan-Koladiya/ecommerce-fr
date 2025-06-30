import { createSlice } from "@reduxjs/toolkit";
import { registerAction, verifyEmailAction, loginAction, forgetPasswordAction, resetPasswordAction, logoutAction } from "../actions/auth.action";
import type { InitialStateType } from "../../types/state.type"

const initialState: InitialStateType = {
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
    builder.addCase(registerAction.rejected, (state, action: any) => {
      state.loading = "";
      state.alertType = "danger";
      // if (action.payload) {
      //   state.message = action.payload.message;
      // }
      state.message = action.payload.message
    });

    builder.addCase(verifyEmailAction.pending, (state) => {
      state.loading = "verifyemail";
      state.apiName = "verifyemail";
    });

    builder.addCase(
      verifyEmailAction.fulfilled,
      (state, { payload }) => {
        state.loading = "";
        state.alertType = "success";
        state.message = payload.message;
      });

    builder.addCase(
      verifyEmailAction.rejected,
      (state, { payload }: any) => {
        state.loading = "";
        state.error = true;
        state.alertType = "danger";
        if (payload) {
          state.message = payload.message;
        }
      })


    //login reducers
    builder.addCase(loginAction.pending, (state) => {
      state.loading = "/auth/login";
      state.apiName = "/auth/login";
    });

    builder.addCase(
      loginAction.fulfilled,
      (state, { payload }) => {
        state.loading = "";
        state.alertType = "success";
        state.message = payload.message;
      });

    builder.addCase(
      loginAction.rejected,
      (state, { payload }: any) => {
        state.loading = "";
        state.error = true;
        state.alertType = "danger";
        if (payload) {
          state.message = payload.message;
        }
      })

    //Forget Password
    builder.addCase(forgetPasswordAction.pending, (state) => {
      state.loading = true;
      state.apiName = '/auth/forgetPassword';
    });
    builder.addCase(forgetPasswordAction.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.alertType = 'success';
      state.error = null;
    });
    builder.addCase(forgetPasswordAction.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
      state.alertType = 'danger';
    });

    //Reset Password
    builder.addCase(resetPasswordAction.pending, (state) => {
      state.loading = true;
      state.apiName = '/auth/resetPassword';
      state.emailStatus = "success";
    });
    builder.addCase(resetPasswordAction.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.alertType = 'success';
      state.error = null;
    });
    builder.addCase(resetPasswordAction.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.alertType = 'danger';
    });


    //logout Reducers
    builder.addCase(logoutAction.pending, (state) => {
      state.loading = "logout";
    });
    builder.addCase(logoutAction.fulfilled, (state) => {
      state.loading = "";
      state.message = "Logged out successfully";
      state.apiName = "logout";
    });
    builder.addCase(logoutAction.rejected, (state) => {
      state.loading = "";
      state.apiName = "logout";
    });

  },

});

export const { clearMessage, errorMessage } = authSlice.actions;
export default authSlice.reducer;
