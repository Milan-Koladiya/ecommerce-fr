import { useDispatch, useSelector } from 'react-redux'
import { clearMessage } from '../store/reducers/subcategory.reducers'
import { fetchSubcategoryAction, addSubcategoryAction, deleteSubcategoryAction,editSubcategoryAction } from '../store/actions/subcategory.action'
import { useCallback } from 'react';
import type { AppDispatch, RootState } from "../store/index"
import type { EditSubcategory, ISubcategory } from '../types/subcategoryType';

const useSubcategory = () => {
    const {
        loading,
        message,
        error,
        apiName,
        alertType,

    } = useSelector((state:RootState) => state.subcategory);


    const dispatch = useDispatch<AppDispatch>();

    const viewSubcategory = useCallback(async () => {
        return await dispatch(fetchSubcategoryAction())
    },[])
    
    const deleteSubcategory = async (id:any) => {
        return await dispatch(deleteSubcategoryAction(id))
    }

    const addSubcategory = async (body:ISubcategory) => {
        return await dispatch(addSubcategoryAction(body));
    };

    const closeAlert = () => {
        dispatch(clearMessage());
    };

    const editSubcategory = async ({id,body}:EditSubcategory) => {
        return await dispatch(editSubcategoryAction({id,body:body}))
    }

    return {
        loading,
        message,
        error,
        apiName,
        alertType,
        closeAlert,
        viewSubcategory,
        addSubcategory,
        deleteSubcategory,
        editSubcategory
    }

}

export default useSubcategory