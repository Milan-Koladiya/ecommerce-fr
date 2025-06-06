import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, errorMessage } from '../store/reducers/auth.reducers'
import { fetchProductAction, addProductAction, deleteProductAction } from '../store/actions/product.action'

const useProduct = () => {
    const {
        loading,
        message,
        error,
        apiName,
        alertType,
        emailStatus,
    } = useSelector((state) => state.auth);


    const dispatch = useDispatch();

    const viewProduct = async () => {
        return await dispatch(fetchProductAction())

    }

    const addProduct = async (body) => {
        return await dispatch(addProductAction(body));
    };

    const deleteProduct = async (id) => {
        return await dispatch(deleteProductAction(id))
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
        viewProduct,
        addProduct,
        deleteProduct
    }

}

export default useProduct