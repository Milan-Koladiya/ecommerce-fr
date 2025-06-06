
import { createSlice } from "@reduxjs/toolkit";
import { fetchProductAction, addProductAction, deleteProductAction } from "../actions/product.action";

const productSlice = createSlice({
    name: "product",
    initialState: {
        categories: [],
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

        builder.addCase(fetchProductAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchProductAction.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        })
        builder.addCase(fetchProductAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        //product reducre
        builder.addCase(addProductAction.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.message = "pending"
        })
        builder.addCase(addProductAction.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message
        })
        builder.addCase(addProductAction.rejected, (state, action) => {
            state.loading = false;
            state.error = 'true';
            state.alertType = "danger"
            state.message = action.payload
        });


        builder.addCase(deleteProductAction.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        })
        builder.addCase(deleteProductAction.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload.message;
        })
        builder.addCase(deleteProductAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },


});

export const { clearMessage, errorMessage } = productSlice.actions;
export default productSlice.reducer;
