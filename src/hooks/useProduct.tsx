import { useDispatch, useSelector } from 'react-redux'
import { clearMessage } from '../store/reducers/product.reducer'
import { fetchProductAction, addProductAction, deleteProductAction,editProductAction} from '../store/actions/product.action'
import type { AppDispatch, RootState } from "../store/index"
import type { EditProductArgs, IProduct } from '../types/product.type'

const useProduct = () => {
    const {
        loading,
        message,
        error,
        apiName,
        alertType,
    } = useSelector((state:RootState) => state.product);


    const dispatch = useDispatch<AppDispatch>();

    const viewProduct = async () => {
        return await dispatch(fetchProductAction())

    }

    const addProduct = async (body:IProduct) => {
        return await dispatch(addProductAction(body));
    };

    const deleteProduct = async (id:any) => {
        return await dispatch(deleteProductAction(id))
    }

    const editProduct=async({id,formData}:EditProductArgs)=>{
        return await dispatch(editProductAction({id,formData}))
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
        closeAlert,
        viewProduct,
        addProduct,
        deleteProduct,
        editProduct
    }

}

export default useProduct