import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, errorMessage } from '../store/reducers/category.reducers'
import { fetchCategoryAction, addCategoryAction,deleteCategoryAction} from '../store/actions/category.action'

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

    const viewCategory = async () => {
        return await dispatch(fetchCategoryAction())

    }

    const addCategory = async (body) => {
        return await dispatch(addCategoryAction({ name: body }));
    };

    const deleteCategory=async(id)=>{
        return await dispatch(deleteCategoryAction(id))
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
        deleteCategory
    }

}

export default useCategory