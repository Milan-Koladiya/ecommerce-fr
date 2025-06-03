import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import Home from './Home'


const Slidebar = () => {
    return (
        <div className="d-flex">

            <div
                className="bg-dark text-white p-3"
                style={{
                    width: '250px',
                    height: '100vh',
                    position: 'fixed',
                    top: 0,
                    left: 0,

                }}
            >
                <h4>Ecommerece..</h4>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="#">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/categories/">Category</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/subcategories/allsubcategory">SubCategory</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/product/">Product</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/orders/userOrders">Orders</Link>
                    </li>
                </ul>
            </div>


        </div>
    );
};

export default Slidebar;
