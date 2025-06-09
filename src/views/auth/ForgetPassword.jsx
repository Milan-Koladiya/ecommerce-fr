import useAuthentication from '../../hooks/useAuthentication'
import Alert from '../../components/common/alert'
import {forgetPasswordSchema} from '../../schema/auth.schema'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const ForgetPassword = () => {
  const { loading, apiName, forgetPassword, alertType, message, closeAlert } = useAuthentication();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(forgetPasswordSchema),
  });

  const onSubmit = async (data) => {
    const res = await forgetPassword(data.email);
    if (res?.type === 'auth/forgetPassword/fulfilled') {
      reset(); 
    }
  };

  return (
    <section className="bg-gray-50 flex items-center justify-center py-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-800 dark:border dark:border-gray-700 p-6 space-y-6">
        <div className="flex items-center">
          <img
            className="w-10 h-8 mr-2"
            src="https://www.creativefabrica.com/wp-content/uploads/2022/06/17/Ecommerce-Logo-Design-Graphics-32523051-1-1-580x386.jpg"
            alt="logo"
          />
          <h2 className=" font-semibold text-gray-900 dark:text-white">Ecommerce</h2>
        </div>

        {(apiName === '/auth/forgetPassword') && alertType && message && (
          <Alert type={alertType} message={message} showButton={true} closeAlert={closeAlert} />
        )}

        <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Forgot Password
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 md:space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input type="email" id="email" placeholder="name@company.com" className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('email')}
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <button type="submit" className="mb-20 btn btn-primary" disabled={loading === 'forgetPassword'}>
            {loading === 'forgetPassword' ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgetPassword;
