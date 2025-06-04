import { createContext, useContext, useEffect, useState } from "react";

import Loader from "../components/common/loader";
import Toast from "../components/common/toast";
import API from "../libs/axios";
import localStorage from "../utils/localStorage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(localStorage.getItem("user"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await API.get("/user/me");
        setAuthUser({
          ...user?.data?.data,
        });
      } catch (error) {
        console.log("error", error);
        return Toast.error("Failed to fetch User");
      }
    };

    if (authUser) {
      fetchUser();
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{ authUser, loading, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
