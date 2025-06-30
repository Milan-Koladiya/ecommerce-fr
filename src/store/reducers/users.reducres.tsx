import { createSlice } from '@reduxjs/toolkit';
import { fetchProfileAction } from '../actions/user.action';
import type {initialStateType} from '../../types/stateType'

const initialState:initialStateType={
        loading: false,
        error: null,
        profile:{}
}

const userSlice = createSlice({
    name: 'user',
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
        builder.addCase(fetchProfileAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProfileAction.fulfilled, (state, action) => {
            state.loading = false;
            state.apiName='user/fetchProfile/fulfilled'
            state.profile = action.payload.data;
            state.message=action.payload.message
        });
        builder.addCase(fetchProfileAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.apiName="fetchProfile/reject"
        });
    },
});

export const { clearMessage, errorMessage } = userSlice.actions;
export default userSlice.reducer;
