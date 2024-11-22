import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink className="" to="/">
        <i className="fa fa-shopping-bag me-1"></i> Shopping mart
      </NavLink>

      <button className="navbar-toggler">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="nabbar-content">
        <ul className="navbar-nav text-center">
          <li className="nav-item px-4">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="nav-item px-2">
            <NavLink to="/product">Products</NavLink>
          </li>
          <li className="nav-item px-2">
            <NavLink to="/about">About</NavLink>
          </li>
          <li className="nav-item px-2">
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>

        <div className="buttons text-center">
          <NavLink to="/login">
            <i className="fa fa-user me-2"></i>Login
          </NavLink>
          <NavLink to="/register">
            <i className="fa fa-check me-2"></i>Register
          </NavLink>
          <NavLink to="/cart">
            <i className="me-2"></i>Cart
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
