import { useDispatch, useSelector } from 'react-redux'
import { clearMessage } from '../store/reducers/order.reducers'
import { fetchOrderyAction } from '../store/actions/order.action'

const useOrder = () => {
    const {
        loading,
        message,
        error,
        apiName,
        alertType,
        emailStatus,
    } = useSelector((state) => state.orders);

    const dispatch = useDispatch();

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
        emailStatus,
        closeAlert,
        viewOrder
    }
}
export default useOrder
