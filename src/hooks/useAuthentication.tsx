import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from "../store/index"
import {
    registerAction,
    verifyEmailAction,
    loginAction,
    logoutAction,
    forgetPasswordAction,
    resetPasswordAction
} from '../store/actions/auth.action'
import { clearMessage } from '../store/reducers/auth.reducers'
import type { IUser,IResetPasswordType } from "../types/user.type"

const useAuth = () => {

    const {
        loading,
        message,
        error,
        apiName,
        alertType,
        emailStatus,
    } = useSelector((state: RootState) => state.auth);

    const dispatch = useDispatch<AppDispatch>();

    const Register = async (body: IUser) => {
        return await dispatch(registerAction(body));
    }

    const verifyEmail = async (token: object) => {
        return await dispatch(verifyEmailAction(token))
    }

    const login = async (body: IUser) => {
        return await dispatch(loginAction(body))
    }

    const forgetPassword = async (email: object) => {
        return await dispatch(forgetPasswordAction(email));
    };

    const resetPassword = async ({token, newPassword}:IResetPasswordType) => {
        return await dispatch(resetPasswordAction({token, newPassword}));
    };


    const logout = async () => {
            await dispatch(logoutAction())
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
            verifyEmail,
            closeAlert,
            login,
            forgetPassword,
            resetPassword,
            logout
        }
}

        export default useAuth