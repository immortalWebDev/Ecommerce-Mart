import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "./Logout";
import styles from "../styles/navbar.module.css";

const Navbar = () => {
  const state = useSelector((state) => state.cart);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 sticky-top">
      <div className="container">
        <NavLink
          className="navbar-brand fs-3 fw-bold px-3 text-primary"
          to="/"
          style={{ letterSpacing: "1px" }}
        >
          <i className="fa fa-shopping-bag me-1"></i> Great Mart
        </NavLink>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-toggle="collapse"
          data-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ outline: "none" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        
        <div className="nabbar-content" id="navbarContent">
          
          <ul className="navbar-nav text-center">
            <li className="nav-item px-">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link text-danger fw-bold fs-5 active-link"
                    : "nav-link text-dark fs-5"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item px-3">
              <NavLink
                to="/product"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link text-danger fw-bold fs-5 active-link"
                    : "nav-link text-dark fs-5"
                }
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item px-3">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link text-danger fw-bold fs-5 active-link"
                    : "nav-link text-dark fs-5"
                }
              >
                About
              </NavLink>
            </li>
            <li className="nav-item px-3">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link text-danger fw-bold fs-5 active-link"
                    : "nav-link text-dark fs-5"
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>

          <div className="buttons text-center">
            <NavLink
              to="/register"
              className="btn btn-outline-success me-2"
              style={{ fontWeight: "500" }}
            >
              <i className="fa fa-check me-2"></i>Register
            </NavLink>
            <NavLink
              to="/cart"
              className="btn btn-outline-dark"
              style={{ fontWeight: "500" }}
            >
              <i className="fa fa-cart-arrow-down me-2"></i>Cart ({state.length}
              )
            </NavLink>
          </div>
        </div>
      
    </nav>
  );
};

export default Navbar;
