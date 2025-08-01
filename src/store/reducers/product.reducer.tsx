
import { createSlice } from "@reduxjs/toolkit";
import { fetchProductAction, addProductAction, editProductAction, deleteProductAction } from "../actions/product.action";

interface InitialStateType {
  loading?: boolean,
  error?: null|unknown
  alertType?: string,
  apiName?: string,
  message?: string |React.ReactNode,
  product?: object,
  success?:string
}

const initialState:InitialStateType={
        product:{},
        loading: false,
        error: null,
}
const productSlice = createSlice({
    name: "product",
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

        builder.addCase(fetchProductAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchProductAction.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
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
            state.alertType="success"
        })
        builder.addCase(addProductAction.rejected, (state, action) => {
            state.loading = false;
            state.error = 'true';
            state.alertType = "danger"
            state.message = action.payload as string
        });


        builder.addCase(deleteProductAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(deleteProductAction.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload.message;
        })
        builder.addCase(deleteProductAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        //edit product reducer

        builder.addCase(editProductAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(editProductAction.fulfilled, (state, action) => {
            state.alertType = 'success'
            state.loading = false;
            state.message = action.payload.message;
        })
        builder.addCase(editProductAction.rejected, (state, action) => {
            state.alertType = 'danger'
            state.loading = false;
            state.error = action.payload;
        });
    },


});

export const { clearMessage, errorMessage } = productSlice.actions;
export default productSlice.reducer;
