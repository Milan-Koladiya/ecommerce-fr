import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearAlert } from '../redux/slice/alertSlice'

const AlertMessage = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);

  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000); 

      return () => clearTimeout(timer);
    }
  }, [alert.message, dispatch]);

  if (!alert.message) return null;

  return (
    <div className={`alert alert-${alert.type || 'primary'}`}>
      {alert.message}
    </div>
  );
};

export default AlertMessage;
