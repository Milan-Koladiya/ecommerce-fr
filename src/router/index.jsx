import { createBrowserRouter,Navigate } from 'react-router-dom'

import PublicRoute from '../layout/PublicLayout'
import PrivateRoute from '../layout/PrivateLayout'

import Login from '../pages/auth/login'
import Register from '../pages/auth/register'
import ForgetPassword from '../pages/auth/forget-password'
import ResetPassword from '../pages/auth/reset-password'
import VerifyEmail from '../pages/auth/verify-email'

import Dashboard from '../views/Dashboard'
import ViewCategory from '../views/category/ViewCategory'
import EditCategory from '../views/category/EditCategory'
import ViewSubCategory from '../views/subcategory/ViewSubCategory'
import ViewProduct from '../views/product/ViewProduct'
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
                element: <VerifyEmail/>
            },
            
        ]
    },
    {
        element:<PrivateRoute/>,
        children:[

            {
                path:'/dashboard',
                element:<Dashboard/>
            },
            //category route
            {
                path:'/category/view',
                element:<ViewCategory/>
            },
            {
                path:'/category/edit',
                element:<EditCategory/>
            },
            //subcategory route
            {
                path:'/subcategory/view',
                element:<ViewSubCategory/>
            },
            {
                path:'/product/view',
                element:<ViewProduct/>
            },
            
            //orders route

            {
                path:'/orders/view',
                element:<ViewOrder/>
            },
            
            
        ]
    }
])

export default router