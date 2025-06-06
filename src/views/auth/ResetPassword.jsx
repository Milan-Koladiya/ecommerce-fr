import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import useAuthentication from '../../hooks/useAuthentication'
import Alert from '../../components/common/alert'

const ResetPassword = () => {
    let { loading, apiName, resetPassword, alertType, message, closeAlert } = useAuthentication();
    const token = new URLSearchParams(location.search).get('token');
    const navigate = useNavigate()

    const [newPassword, setnewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, seterrorMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (newPassword !== confirmPassword) {
            seterrorMessage("Password do not match!")
            return
        }
        seterrorMessage('')
        const res = await resetPassword({ newPassword, token })

        setTimeout(() => {
                        navigate('/login')

        }, 1500);
        
        console.log(res)
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="mt-5 flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div className="mt-10 flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-10 h-8 mr-2" src="https://www.creativefabrica.com/wp-content/uploads/2022/06/17/Ecommerce-Logo-Design-Graphics-32523051-1-1-580x386.jpg" alt="logo" />
                    <h1>Ecommerce</h1>
                </div>
                <div className="mb-20 w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        {errorMessage && (
                            <Alert
                                type="danger"
                                message={errorMessage}
                                showButton={true}
                                closeAlert={() => seterrorMessage("")}
                            />
                        )}

                        {(apiName === '/auth/resetPassword') && alertType && message && (
                            <Alert
                                type={alertType}
                                message={message}
                                showButton={true}
                                closeAlert={closeAlert}
                            />
                        )}

                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Reset Password
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                <input
                                    type="password" id="password" value={newPassword} onChange={(e) => setnewPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="••••••••" required
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                <input
                                    type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="••••••••" required
                                />
                            </div>
                            <button type="submit" className="mb-20 btn btn-primary">Reset Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default ResetPassword
