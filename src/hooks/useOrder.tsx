import { useDispatch, useSelector } from 'react-redux'
import { clearMessage } from '../store/reducers/order.reducers'
import { fetchOrderyAction } from '../store/actions/order.action'
import type { AppDispatch, RootState } from "../store/index"

const useOrder = () => {
    const {
        loading,
        message,
        error,
        apiName,
        alertType,
    } = useSelector((state:RootState) => state.orders);

    const dispatch = useDispatch<AppDispatch>();

    const viewOrder = async () => {
        return await dispatch(fetchOrderyAction())
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
        viewOrder
    }
}
export default useOrder
