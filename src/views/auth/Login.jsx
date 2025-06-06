import React, { useState } from 'react'
import { Navigate,useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useAuthentication from '../../hooks/useAuthentication'
import { useAuth } from '../../context/AuthContex'
import Alert from '../../components/common/alert'
import Dashboard from '../Dashboard'
const Login = () => {

    const navigate = useNavigate();
    const { setAuthUser, authUser } = useAuth();
    const { loading, login, apiName, alertType, message, closeAlert } = useAuthentication();

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const res = await login(data)
    
        if (res?.type === 'auth/login/fulfilled') {
            const user = res?.payload?.data;
            setAuthUser(user);
            navigate('/dashboard')
        }

    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="mt-5 flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div className="mt-10 flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-10 h-8 mr-2" src="https://www.creativefabrica.com/wp-content/uploads/2022/06/17/Ecommerce-Logo-Design-Graphics-32523051-1-1-580x386.jpg" alt="logo" />
                    <h1>Ecommerce</h1>
                </div>

                <div className="mb-20 w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        {(apiName === '/auth/login') && alertType && message && (
                            <Alert
                                type={alertType}
                                message={message}
                                showButton={true}
                                closeAlert={closeAlert}
                            />
                        )}
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login
                        </h1>
                        <form onSubmit={onSubmit} method="post" className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" value={data.email} onChange={handleOnChange} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" value={data.password} onChange={handleOnChange} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <p className="flex justify-end text-sm font-light text-gray-500 dark:text-gray-400">
                                <Link to="/forget-password" className="text-primary-600 hover:underline dark:text-primary-500">Forget password?</Link>
                            </p>
                            <div>
                                <button type="submit" className="mb-20 btn btn-primary">Login</button>
                            </div>
                            <p className="mb-10 text-sm font-light text-gray-500 dark:text-gray-400">
                                Create Account? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Login
