import { useDispatch, useSelector } from 'react-redux'
import {
    registerAction,
    verifyEmailAction,
    loginAction
} from '../store/actions/auth.action'
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

    const verifyEmail = async (token) => {
        return await dispatch(verifyEmailAction(token))
    }

    const login = async (body) => {
        return await dispatch(loginAction(body))
    }

    const forgetPassword = async (email) => {
        return await dispatch(forgetPasswordAction(email));
    };

    const resetPassword = async ({ token, newPassword }) => {
        return await dispatch(resetPasswordAction({ token, newPassword }));
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
        Register,
        verifyEmail,
        closeAlert,
        login,
        forgetPassword,
        resetPassword

    }
}

export default useAuth