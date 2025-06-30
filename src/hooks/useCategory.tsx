import { useDispatch, useSelector } from 'react-redux'
import { clearMessage } from '../store/reducers/category.reducers'
import { fetchCategoryAction, addCategoryAction,deleteCategoryAction,editCategoryAction} from '../store/actions/category.action'
import { useCallback } from 'react';
import type { AppDispatch, RootState } from "../store/index"
import type { ICategory,UpdateCategoryArgs } from '../types/category.type';

const useCategory = () => {
    const {
        loading,
        message,
        error,
        apiName,
        alertType,
        success
    } = useSelector((state:RootState) => state.category);


    const dispatch = useDispatch<AppDispatch>();

    const viewCategory = useCallback( async () => {
        return await dispatch(fetchCategoryAction())
    },[])

    const addCategory = async (name:ICategory) => {
        return await dispatch(addCategoryAction(name));
    };

    const deleteCategory=async(id:any)=>{
        return await dispatch(deleteCategoryAction(id))
    }

    const EditCategory=async({id,body}:UpdateCategoryArgs)=>{
        return await dispatch(editCategoryAction({id,body:body}))
    }

    const closeAlert = () => {
        dispatch(clearMessage());
    };

    return {
        loading,
        message,
        error,
        apiName,
        alertType,
        success,
        closeAlert,
        viewCategory,
        addCategory,
        deleteCategory,
        EditCategory
    }

}

export default useCategory