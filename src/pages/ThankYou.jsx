import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <>
    <Navbar/>
    <div className="container d-flex justify-content-center align-items-center border border-danger rounded-3" style={{ minHeight: "100vh" }}>
      <div className="text-center bg-light p-5 rounded border border-success rounded-4 shadow-sm" style={{ width: "80%", maxWidth: "600px" }}>
        <i className="fa fa-check-circle fa-5x text-success mb-3"></i>
        <h2 className="text-success">Thank You!</h2>
        <p className="lead">Your message has been successfully received</p>
        <p className="lead">Thank you for shopping with us!</p>
        <div className="mt-4">
          <button
            className="btn btn-primary"
            onClick={() => navigate('/')} 
          >
            Go to Home
          </button>
        </div>
        <div className="mt-3">
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
  
};

export default ThankYou
