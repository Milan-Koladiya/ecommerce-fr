import { useDispatch, useSelector } from "react-redux";
import { fetchProfileAction } from "../store/actions/user.action";
import { clearMessage } from "../store/reducers/users.reducres";

const useUser = () => {
  const dispatch = useDispatch();

  const {
    profile,
    loading,
    error,
    message,
    apiName,
    alertType,
  } = useSelector((state) => state.user); 

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
