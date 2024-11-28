import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Success = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="container d-flex justify-content-center">
        <div className="text-center bg-light p-5 rounded border">
          <h2 className="text-success">Thank You!</h2>
          <p className="lead">Order is placed</p>
          <div className="mt-4">
            <button onClick={() => navigate("/")}>Home</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Success;
