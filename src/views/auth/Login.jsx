import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../schema/auth.schema';
import { useNavigate, Link } from 'react-router-dom';
import useAuthentication from '../../hooks/useAuthentication';
import { useAuth } from '../../context/AuthContex';
import Alert from '../../components/common/alert';

const Login = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();
  const { loading, login, apiName, alertType, message, closeAlert } = useAuthentication();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const res = await login(data);
    if (res?.type === 'auth/login/fulfilled') {
      setAuthUser(res.payload.data);
      navigate('/dashboard');
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 lg:py-0">
        <div className="mt-10 flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            className="w-10 h-8 mr-2"
            src="https://www.creativefabrica.com/wp-content/uploads/2022/06/17/Ecommerce-Logo-Design-Graphics-32523051-1-1-580x386.jpg"
            alt="logo"
          />
          <h1>Ecommerce</h1>
        </div>

        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 sm:p-8">
            {(apiName === '/auth/login') && alertType && message && (
              <Alert type={alertType} message={message} showButton={true} closeAlert={closeAlert} />
            )}

            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6" noValidate>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="name@company.com"
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register('password')}
                  placeholder="••••••••"
                  className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
              </div>

              <p className="flex justify-end text-sm font-light text-gray-500 dark:text-gray-400">
                <Link to="/forget-password" className="text-primary-600 hover:underline dark:text-primary-500">
                  Forget password?
                </Link>
              </p>

              <div>
                <button
                  type="submit"
                  className="mb-20 btn btn-primary"
                  disabled={loading === 'login'}
                >
                  {loading === 'login' ? 'Logging in...' : 'Login'}
                </button>
              </div>

              <p className="mb-10 text-sm font-light text-gray-500 dark:text-gray-400">
                Create Account?{' '}
                <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
