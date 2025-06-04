import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuthentication';
import Alert from '../../components/common/alert';

const Register = () => {
    const { loading, apiName, alertType, message, closeAlert, Register } = useAuth();
    const navigate = useNavigate();

    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role: 'seller',
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            first_name: data.firstname,
            last_name: data.lastname,
            email: data.email,
            password: data.password,
            role: data.role,
        };
        const res = await Register(userData);
        if (res?.success) {
            navigate('/login');
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-10 lg:py-0">
                <div className="mt-10 flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img
                        className="w-10 h-8 mr-2"
                        src="https://www.creativefabrica.com/wp-content/uploads/2022/06/17/Ecommerce-Logo-Design-Graphics-32523051-1-1-580x386.jpg"
                        alt="logo"
                    />

                    <h1>Ecommerce</h1>
                </div>

                <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    {(apiName === 'signup') && alertType && message && (
                        <Alert
                            type={alertType}
                            message={message}
                            showButton={true}
                            closeAlert={closeAlert}
                        />
                    )}
                    <div className="p-6 space-y-4 sm:p-8">

                        <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>

                        <form onSubmit={onSubmit} className="space-y-4">
                            {[
                                { label: 'First Name', id: 'firstname', type: 'text' },
                                { label: 'Last Name', id: 'lastname', type: 'text' },
                                { label: 'Email', id: 'email', type: 'email' },
                                { label: 'Password', id: 'password', type: 'password' },
                            ].map(({ label, id, type }) => (
                                <div key={id}>
                                    <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        {label}
                                    </label>
                                    <input type={type} name={id} id={id} value={data[id]} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600" placeholder={label} required
                                    />
                                </div>
                            ))}

                            <input type="hidden" name="role" value={data.role} />

                            <div>
                                <button
                                    type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled={loading === 'signup'}> {loading === 'signup' ? 'Creating...' : 'Create Account'}
                                </button>
                            </div>

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account?{' '}
                                <Link to="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                                    Login here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
