import { useDispatch, useSelector } from "react-redux";
import { fetchProfileAction } from "../store/actions/user.action";
import { clearMessage } from "../store/reducers/users.reducres";
import type { AppDispatch, RootState } from "../store/index"

const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    profile,
    loading,
    error,
    message,
    apiName,
    alertType,
  } = useSelector((state:RootState) => state.user); 

  const getProfile = async () => {
    await dispatch(fetchProfileAction());  
  };

  const closeAlert = () => {
    dispatch(clearMessage());
  };

  return {
    profile,
    loading,
    error,
    message,
    apiName,
    alertType,
    getProfile,
    closeAlert,
  };
};

export default useUser;
