import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, errorMessage } from '../store/reducers/category.reducers'
import { fetchCategoryAction, addCategoryAction,deleteCategoryAction,editCategoryAction} from '../store/actions/category.action'
import { useCallback } from 'react';

const useCategory = () => {
    const {
        loading,
        message,
        error,
        apiName,
        alertType,
        emailStatus,
    } = useSelector((state) => state.category);


    const dispatch = useDispatch();

    const viewCategory = useCallback( async () => {
        return await dispatch(fetchCategoryAction())
    },[])

    const addCategory = async (body) => {
        return await dispatch(addCategoryAction({ name: body }));
    };

    const deleteCategory=async(id)=>{
        return await dispatch(deleteCategoryAction(id))
    }

    const EditCategory=async(id,body)=>{
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
        emailStatus,
        closeAlert,
        viewCategory,
        addCategory,
        deleteCategory,
        EditCategory
    }

}

export default useCategory