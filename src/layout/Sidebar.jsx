import React from "react";
import { NavLink } from "react-router-dom";
import '../css/sidebar.css'

const Sidebar = () => {
  return (
 <div
  className="sidebar d-flex flex-column flex-shrink-0 p-3 position-fixed"
  style={{
    top: 0,              
    left: 0,             
    height: '100vh',     
    width: "220px",
    margin: 0,
    paddingTop: '1rem', 
    overflowX: "hidden",
    zIndex: 1000         
  }}
>

   <h5 className="text-center mb-4">Ecommerce Seller</h5>

      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink
            to="/dashboard"
            className="nav-link text-white"
            activeClassName="active"
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category/view"
            className="nav-link text-white"
            activeClassName="active"
          >
            Category
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/subcategory/view"
            className="nav-link text-white"
            activeClassName="active"
          >
            SubCategory
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/product/view"
            className="nav-link text-white"
            activeClassName="active"
          >
            Products
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
