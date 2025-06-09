import { createSlice } from '@reduxjs/toolkit';
import { fetchProfileAction } from '../actions/user.action';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        profile: null,
        loading: false,
        error: null,
    },
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
        builder.addCase(fetchProfileAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProfileAction.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
        });
        builder.addCase(fetchProfileAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { clearMessage, errorMessage } = userSlice.actions;
export default userSlice.reducer;
