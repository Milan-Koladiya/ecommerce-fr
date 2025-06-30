
import { createSlice } from "@reduxjs/toolkit";
import { fetchCategoryAction, addCategoryAction, deleteCategoryAction, editCategoryAction } from "../actions/category.action";
import type React from "react";

interface InitialStateType {
    categories: any,
    loading: boolean,
    error: any,
    alertType: string,
    apiName: string,
    message: string | undefined | React.ReactNode,
    success: boolean | string | undefined,
}

const initialState: InitialStateType = {
    categories: [],
    loading: false,
    error: null,
    alertType: '',
    apiName: '',
    message: '',
    success: false

}

const categorySlice = createSlice({
    name: "category",
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

        builder.addCase(fetchCategoryAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchCategoryAction.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload.data;
            state.message = action.payload.message;
            state.alertType = 'success'
        })
        builder.addCase(fetchCategoryAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.alertType = 'danger'

        });


        //add category
        builder.addCase(addCategoryAction.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.message = "pending"
        })
        builder.addCase(addCategoryAction.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message
            state.apiName = "categories/addCategory/fullfill"
            state.alertType = "success"

        })
        builder.addCase(addCategoryAction.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            state.alertType = "danger"
            state.apiName = "categories/addCategory/reject"
            state.message = action.payload as string
        });

        //delete category

        builder.addCase(deleteCategoryAction.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.apiName = "category/deleteCategory/pending"
        })
        builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload.message;
            state.apiName = "category/deleteCategory/fulfilled"
        })
        builder.addCase(deleteCategoryAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.apiName = "category/deleteCategory/reject"
        });

        //edit category

        builder.addCase(editCategoryAction.pending, (state) => {
            state.loading = true;
            state.error = null;

        })
        builder.addCase(editCategoryAction.fulfilled, (state, action) => {
            state.alertType = 'success'
            state.loading = false;
            state.message = action.payload.message;
            state.success = true
            state.apiName = "categories/updateCategory/fullfill"

        })
        builder.addCase(editCategoryAction.rejected, (state, action) => {
            state.alertType = 'danger'
            state.loading = false;
            state.error = action.payload;
            state.apiName = "categories/updateCategory/reject"

        });

    },
});

export const { clearMessage, errorMessage } = categorySlice.actions;

export default categorySlice.reducer;
