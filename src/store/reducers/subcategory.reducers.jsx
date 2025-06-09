


import { createSlice } from "@reduxjs/toolkit";
import { fetchSubcategoryAction, addSubcategoryAction,editSubcategoryAction, deleteSubcategoryAction } from "../actions/subcategory.action";

const subcategorySlice = createSlice({
    name: "subcategory",
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

        builder.addCase(fetchSubcategoryAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchSubcategoryAction.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        })
        builder.addCase(fetchSubcategoryAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        //add subcategory reducer
        builder.addCase(addSubcategoryAction.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.message = "pending"
        })
        builder.addCase(addSubcategoryAction.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message
            state.alertType="success"
        })
        builder.addCase(addSubcategoryAction.rejected, (state, action) => {
            state.loading = false;
            state.error = 'true';
            state.alertType = "danger"
            state.message = action.payload
        });

        //delete subcategory action


        builder.addCase(deleteSubcategoryAction.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        })
        builder.addCase(deleteSubcategoryAction.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload.message;
        })
        builder.addCase(deleteSubcategoryAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });


        //edit subcategory
        builder.addCase(editSubcategoryAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(editSubcategoryAction.fulfilled, (state, action) => {
            state.alertType = 'success'
            state.loading = false;
            state.message = action.payload.message;
        })
        builder.addCase(editSubcategoryAction.rejected, (state, action) => {
            state.alertType = 'danger'
            state.loading = false;
            state.error = action.payload;
        });

    },
});

export const { clearMessage, errorMessage } = subcategorySlice.actions;

export default subcategorySlice.reducer;
