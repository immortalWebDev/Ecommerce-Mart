import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "./Logout";
import styles from "../styles/navbar.module.css";

const Navbar = () => {
  const state = useSelector((state) => state.cart);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // Close dropdown if im clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto text-center">
            <li className="nav-item px-3">
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

            <div
              className="position-relative d-inline-block"
              ref={dropdownRef} // Attach ref to dropdown container
            >
              <button
                className="btn btn-outline-secondary me-2"
                style={{ fontWeight: "500" }}
                onClick={toggleDropdown}
              >
                <i className="fa fa-gear"></i>
              </button>

              {showDropdown && (
                <div
                  className={`dropdown-menu-end show shadow-sm ${styles["dropdown-menu"]}`}
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: "0",
                    zIndex: 1000,
                  }}
                >
                  <NavLink
                    to="/login"
                    className={`text-dark ${styles["dropdown-item"]}`}
                    style={{ fontWeight: "500" }}
                    onClick={() => setShowDropdown(false)}
                  >
                    <i className="fa fa-user me-2"></i>Login
                  </NavLink>
                  <NavLink
                    to="/cart"
                    className={`text-dark ${styles["dropdown-item"]}`}
                    style={{ fontWeight: "500" }}
                    onClick={() => setShowDropdown(false)}
                  >
                    <i className="fa fa-cart-arrow-down me-2"></i>Cart (
                    {state.length})
                  </NavLink>
                  {isAuthenticated && (
                    <div className={`text-dark ${styles["dropdown-item"]}`}>
                      <Logout />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
