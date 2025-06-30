
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '../../schema/auth.schema';
import useAuth from '../../hooks/useAuthentication';
import { useNavigate, Link } from 'react-router-dom';
import Alert from '../../components/common/alert';

type IRegisterFormValues = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role:'seller';
};

const Register = () => {
  const { loading, apiName, alertType, message, closeAlert, Register } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormValues>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      role: 'seller',
    },
  });

  const onSubmit = async (data:any) => {
    const res:any = await Register(data);
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
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">Create an account</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              <div>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  First Name
                </label>
                <input type="text" id="first_name" {...register('first_name')} className={`bg-gray-50 border ${errors.first_name ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600`} placeholder="First Name"/>
                {errors.first_name && (
                  <p className="text-sm text-red-600 mt-1">{errors.first_name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Last Name
                </label>
                <input type="text" id="last_name" {...register('last_name')} className={`bg-gray-50 border ${errors.last_name ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600`} placeholder="Last Name"/>
                {errors.last_name && (
                  <p className="text-sm text-red-600 mt-1">{errors.last_name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input type="email" id="email" {...register('email')} className={`bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600`} placeholder="Email"/>
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input type="password" id="password" {...register('password')} className={`bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600`} placeholder="Password"/>
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                )}
              </div>

              <input type="hidden" {...register('role')} value="seller" />

              <div>
                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled={loading === 'signup'}
                >
                  {loading === 'signup' ? 'Creating...' : 'Create Account'}
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
