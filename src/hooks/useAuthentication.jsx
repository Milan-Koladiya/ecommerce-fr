import { useDispatch, useSelector } from 'react-redux'
import { registerAction } from '../store/actions/auth.action'
import { useLocation } from 'react-router-dom'
import { clearMessage, errorMessage } from '../store/reducers/auth.reducers'

const useAuth = () => {

    const {
        loading,
        message,
        error,
        apiName,
        alertType,
        emailStatus,
    } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const Register = async (body) => {
        return await dispatch(registerAction(body));
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
        Register,
        closeAlert
    }
}

export default useAuth