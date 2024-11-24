import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
<<<<<<< HEAD
import Logout from "./Logout";
import styles from "../styles/navbar.module.css";
=======
>>>>>>> 562737da6086942bf865f1d566812978e3d9fba2

const Navbar = () => {
  const state = useSelector((state) => state.cart);

  return (
<<<<<<< HEAD
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
=======
    <nav className="navbar">
      
        <NavLink
          className=""
          to="/"
        
        >
          <i className="fa fa-shopping-bag me-1"></i> Shopping mart
        </NavLink>

        
        <button
          className="navbar-toggler"
>>>>>>> 562737da6086942bf865f1d566812978e3d9fba2
        >
          <span className="navbar-toggler-icon"></span>
        </button>

<<<<<<< HEAD
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
=======
        
        <div className="nabbar-content" id="navbarContent">
          
          <ul className="navbar-nav text-center">
            <li className="nav-item px-4">
              <NavLink
                to="/"
                
                  
                    
                
>>>>>>> 562737da6086942bf865f1d566812978e3d9fba2
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
=======
               
>>>>>>> 562737da6086942bf865f1d566812978e3d9fba2
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item px-3">
              <NavLink
                to="/about"
<<<<<<< HEAD
                className={({ isActive }) =>
                  isActive
                    ? "nav-link text-danger fw-bold fs-5 active-link"
                    : "nav-link text-dark fs-5"
                }
=======
               
>>>>>>> 562737da6086942bf865f1d566812978e3d9fba2
              >
                About
              </NavLink>
            </li>
            <li className="nav-item px-3">
              <NavLink
                to="/contact"
<<<<<<< HEAD
                className={({ isActive }) =>
                  isActive
                    ? "nav-link text-danger fw-bold fs-5 active-link"
                    : "nav-link text-dark fs-5"
                }
=======
                
>>>>>>> 562737da6086942bf865f1d566812978e3d9fba2
              >
                Contact
              </NavLink>
            </li>
          </ul>

<<<<<<< HEAD
          <div className="buttons text-center">
            <NavLink
              to="/register"
              className="btn btn-outline-success me-2"
              style={{ fontWeight: "500" }}
=======
          {/* Buttons */}
          <div className="buttons text-center">
            <NavLink
              to="/login"
              
             
            >
              <i className="fa fa-user me-2"></i>Login
            </NavLink>
            <NavLink
              to="/register"
              
             
>>>>>>> 562737da6086942bf865f1d566812978e3d9fba2
            >
              <i className="fa fa-check me-2"></i>Register
            </NavLink>
            <NavLink
              to="/cart"
<<<<<<< HEAD
              className="btn btn-outline-dark"
              style={{ fontWeight: "500" }}
            >
              <i className="fa fa-cart-arrow-down me-2"></i>Cart ({state.length}
=======
              
             
            >
              <i className="me-2"></i>Cart ({state.length}
>>>>>>> 562737da6086942bf865f1d566812978e3d9fba2
              )
            </NavLink>
          </div>
        </div>
      
    </nav>
  );
};

export default Navbar;
