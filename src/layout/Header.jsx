import React from "react";
import useAuthentication from '../hooks/useAuthentication'
import { useNavigate } from 'react-router-dom'
import {useAuth} from '../context/AuthContex'

const Header = () => {
    const { logout } = useAuthentication()
    const navigate = useNavigate()
    const {setAuthUser}=useAuth()
    
    const handleLogOut = async () => {
        await logout()
        setAuthUser(null)
        navigate('/login');
    }

    return (
        <nav className="mr-10 ml-45 navbar navbar-light bg-white px-4 py-2 border-bottom">
            <span className="navbar-brand mb-0 h1">Ecommerce Seller</span>

            <div className="d-flex align-items-center gap-3">
                <span className="text-muted">Welcome, Admin</span>
                <button onClick={handleLogOut} className="btn btn-primary btn-sm">Logout</button>
            </div>
        </nav>
    );
};

export default Header;
