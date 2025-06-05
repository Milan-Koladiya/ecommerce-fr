import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, errorMessage } from '../store/reducers/auth.reducers'
import { fetchCategoryAction } from '../store/actions/category.action'

const useCategory = () => {
    const {
        loading,
        message,
        error,
        apiName,
        alertType,
        emailStatus,
    } = useSelector((state) => state.auth);


    const dispatch = useDispatch();

    const viewCategory = async () => {
        return await dispatch(fetchCategoryAction())

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
        viewCategory
    }

}

export default useCategory