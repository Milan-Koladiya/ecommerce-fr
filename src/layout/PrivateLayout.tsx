import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContex";
import Loader from "../components/common/loader";
import Header from "./Header";
import Sidebar from "./Sidebar";

const PrivateRoute = () => {
    const { authUser, loading } = useAuth();

    if (loading) {
        return <Loader />;
    }

    if (!authUser) {
        console.log("not authorize")
        return <Navigate to="/login" />;
    }

    return (
        <>
            <Header/>
            <Sidebar />
            <Outlet />
        </>
    );
};

export default PrivateRoute;
