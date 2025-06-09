
import { createSlice } from "@reduxjs/toolkit";
import { fetchCategoryAction, addCategoryAction, deleteCategoryAction,editCategoryAction } from "../actions/category.action";

const categorySlice = createSlice({
    name: "category",
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

        builder.addCase(fetchCategoryAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchCategoryAction.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
            state.message = action.payload.message;
            state.alertType='success'
            state.success=true
        })
        builder.addCase(fetchCategoryAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.alertType='danger'

        });


        //add category
        builder.addCase(addCategoryAction.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.message = "pending"
        })
        builder.addCase(addCategoryAction.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message
            state.alertType = "success"

        })
        builder.addCase(addCategoryAction.rejected, (state, action) => {
            state.loading = false;
            state.error = 'true';
            state.alertType = "danger"
            state.message = action.payload
        });

        //delete category

        builder.addCase(deleteCategoryAction.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        })
        builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload.message;
        })
        builder.addCase(deleteCategoryAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        //edit category

        builder.addCase(editCategoryAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(editCategoryAction.fulfilled, (state, action) => {
            state.alertType='success'
            state.loading = false;
            state.message = action.payload.message;
        })
        builder.addCase(editCategoryAction.rejected, (state, action) => {
            state.alertType='danger'
            state.loading = false;
            state.error = action.payload;
        });

    },
});

export const { clearMessage, errorMessage } = categorySlice.actions;

export default categorySlice.reducer;
