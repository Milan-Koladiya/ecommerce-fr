import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, errorMessage } from '../store/reducers/subcategory.reducers'
import { fetchSubcategoryAction, addSubcategoryAction, deleteSubcategoryAction,editSubcategoryAction } from '../store/actions/subcategory.action'
import { useCallback } from 'react';

const useSubcategory = () => {
    const {
        loading,
        message,
        error,
        apiName,
        alertType,
        emailStatus,
    } = useSelector((state) => state.subcategory);


    const dispatch = useDispatch();

    const viewSubcategory = useCallback(async () => {
        return await dispatch(fetchSubcategoryAction())
    },[])
    
    const deleteSubcategory = async (id) => {
        return await dispatch(deleteSubcategoryAction(id))
    }

    const addSubcategory = async (body) => {
        return await dispatch(addSubcategoryAction(body));
    };

    const closeAlert = () => {
        dispatch(clearMessage());
    };

    const editSubcategory = async (id,body) => {
        return await dispatch(editSubcategoryAction({id,body:body}))
    }

    return {
        loading,
        message,
        error,
        apiName,
        alertType,
        emailStatus,
        closeAlert,
        viewSubcategory,
        addSubcategory,
        deleteSubcategory,
        editSubcategory
    }

}

export default useSubcategory