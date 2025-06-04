import { createBrowserRouter,Navigate } from 'react-router-dom'

import PublicRoute from '../layout/PublicLayout'

import Login from '../pages/auth/login'
import Register from '../pages/auth/register'
import ForgetPassword from '../pages/auth/forget-password'
import ResetPassword from '../pages/auth/reset-password'

const router = createBrowserRouter([
    {
        element: <PublicRoute />,
        children: [

            {
                path: "/",
                element: <Navigate to="/login" />
            },
            {
                path: "/login",
                element:<Login/>
            },
            {
                path: "/register",
                element: <Register/>
            },
            {
                path: "/forget-password",
                element: <ForgetPassword/>
            },
            {
                path: "/reset-password/",
                element: <ResetPassword/>
            },
            {
                path: "/verify",
                element: ""
            }
        ]
    }
])

export default router