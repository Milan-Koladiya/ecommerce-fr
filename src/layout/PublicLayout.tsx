import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContex"
import Loader from "../components/common/loader"

const PublicRoute = () => {

    const { loading, authUser } = useAuth()

    if (loading) {
        return <Loader />
    }

    if (authUser) {
        return <Navigate to="/dashboard" />
    }

    return <Outlet />
}

export default PublicRoute
