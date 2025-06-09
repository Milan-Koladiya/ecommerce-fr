import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, errorMessage } from '../store/reducers/product.reducer'
import { fetchProductAction, addProductAction, deleteProductAction,editProductAction} from '../store/actions/product.action'

const useProduct = () => {
    const {
        loading,
        message,
        error,
        apiName,
        alertType,
        emailStatus,
    } = useSelector((state) => state.product);


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

    const editProduct=async(id,body)=>{
        return await dispatch(editProductAction({id,body:body}))

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
        deleteProduct,
        editProduct
    }

}

export default useProduct