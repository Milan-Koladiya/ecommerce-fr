import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthentication from '../../hooks/useAuthentication';
import Alert from '../../components/common/alert';
import {resetPasswordSchema} from '../../schema/auth.schema'


const ResetPassword = () => {
  const { loading, apiName, resetPassword, alertType, message, closeAlert } = useAuthentication();
  const navigate = useNavigate();
  const location = useLocation();

  const token = new URLSearchParams(location.search).get('token');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = async (data:any) => {
    const res = await resetPassword({ newPassword: data.newPassword, token });
    if (res?.type === 'auth/resetPassword/fulfilled') {
      reset();
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-6 py-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-800 dark:border dark:border-gray-700 p-6 space-y-6">
        <div className="flex items-center mb-6">
          <img className="w-10 h-8 mr-2" src="https://www.creativefabrica.com/wp-content/uploads/2022/06/17/Ecommerce-Logo-Design-Graphics-32523051-1-1-580x386.jpg" alt="logo" />
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Ecommerce</h1>
        </div>

        {apiName === '/auth/resetPassword' && alertType && message && (
          <Alert type={alertType} message={message} showButton={true} closeAlert={closeAlert} />
        )}

        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Reset Password</h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <div>
            <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              New Password
            </label>
            <input id="newPassword" type="password" placeholder="••••••••" aria-invalid={errors.newPassword ? 'true' : 'false'} className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                errors.newPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('newPassword')}
            />
            {errors.newPassword && (
              <p className="text-red-600 text-sm mt-1">{errors.newPassword.message}</p>
            )}
          </div>

          <div>
            <label  htmlFor="confirmPassword"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
              Confirm Password
            </label>
            <input id="confirmPassword" type="password" placeholder="••••••••" aria-invalid={errors.confirmPassword ? 'true' : 'false'} className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button type="submit" disabled={loading === 'resetPassword'} className="btn btn-primary w-full">
            {loading === 'resetPassword' ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
