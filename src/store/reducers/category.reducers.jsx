
import { createSlice } from "@reduxjs/toolkit";
import { fetchCategoryAction, addCategoryAction, deleteCategoryAction } from "../actions/category.action";

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
        })
        builder.addCase(fetchCategoryAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
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

    },
});

export const { clearMessage, errorMessage } = categorySlice.actions;

export default categorySlice.reducer;
