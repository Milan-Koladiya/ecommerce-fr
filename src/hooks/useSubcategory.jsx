import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, errorMessage } from '../store/reducers/auth.reducers'
import { fetchSubcategoryAction } from '../store/actions/subcategory.action'

const useSubcategory = () => {
    const {
        loading,
        message,
        error,
        apiName,
        alertType,
        emailStatus,
    } = useSelector((state) => state.auth);


    const dispatch = useDispatch();

    const viewSubcategory = async () => {
        return await dispatch(fetchSubcategoryAction())

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
        viewSubcategory
    }

}

export default useSubcategory