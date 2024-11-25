import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    navigate("/login");

    window.location.reload();

    // console.log("User logged out successfully"); 
  };

  return (
    <div className="logout-container">
      <button
        className="logout-button btn btn-danger rounded-pill"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
