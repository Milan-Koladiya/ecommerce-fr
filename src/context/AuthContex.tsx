import React, { createContext, useContext, useEffect, useState } from "react";
import Loader from "../components/common/loader";
import API from "../libs/axios";
import localStorage from "../utils/localStorage";
import type {IUser} from "../types/userType"

type AuthProviderProps = {
  children: React.ReactNode
}

// type AuthContexType = {
//   authUser: IUser |null,
//   setAuthUser: React.Dispatch<React.SetStateAction<IUser | null>>,
//   loading: boolean
// }

const AuthContext = createContext<any>(null);


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authUser, setAuthUser] = useState<IUser|null>(localStorage.getItem("user"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await API.get("/users/me");
        
        setAuthUser({
          ...user?.data?.data,
        });
        console.log("==============user data", user)
      } catch (error) {
        console.log("error===========", error);
      }
    };

    if (authUser) {
      fetchUser();
      console.log("authorize")
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

export const useAuth = ()=> useContext(AuthContext);
