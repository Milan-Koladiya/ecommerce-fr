import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, errorMessage } from '../store/reducers/auth.reducers'
import { fetchSubcategoryAction,addSubcategoryAction,deleteSubcategoryAction} from '../store/actions/subcategory.action'

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
        const deleteSubcategory=async(id)=>{
            return await dispatch(deleteSubcategoryAction(id))
        }
    
    const addSubcategory = async (body) => {
        return await dispatch(addSubcategoryAction(body));
    };

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
        viewSubcategory,
        addSubcategory,
        deleteSubcategory
    }

}

export default useSubcategory