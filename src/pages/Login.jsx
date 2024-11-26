import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { Footer, Navbar } from "../components/componentsExpo";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  
  
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SIGN_IN_URL}${apiKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      );

      const data = response.data;
      

      
      dispatch(
        login({
          email: data.email,
          token: data.idToken,
        })
      );

      
      navigate("/");
    } catch (err) {
      console.error("Authentication failed", err);
  
    } 
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    
    
    

    const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;

    try {
      await axios.post(`${process.env.REACT_APP_PASSWORD_RESET_URL}${apiKey}`, {
        requestType: "PASSWORD_RESET",
        email,
      });

    
    } catch (err) {
      console.error("Password reset failed", err);
    
    } finally {
      
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-2 py-2">
       
       
       
       
        

        <div className="row my-4">
          <div className="col-md-6 col-lg-5 mx-auto">
            <div className="card shadow-lg p-4">
              
                <form onSubmit={handleSubmit}>
                  <div className="form-group my-3">
                    <label htmlFor="email" className="fw-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control rounded-pill"
                      id="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group my-3">
                    <label htmlFor="password" className="fw-semibold">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control rounded-pill"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {error && <p className="text-danger text-center">{error}</p>}
                  <div className="text-end mb-3">
                    <button
                      type="button"
                      className="btn btn-link text-decoration-underline text-primary"
                      onClick={() => setIsForgotPassword(true)}
                    >
                      I have lost my password
                    </button>
                  </div>
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary rounded-pill py-2 shadow-sm"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Login"}
                    </button>
                  </div>
                  <div className="text-center mt-4">
                    <p>
                      First time ?{" "}
                      <Link
                        to="/register"
                        className="text-decoration-underline text-primary"
                      >
                        Create a new account
                      </Link>
                    </p>
                  </div>
                </form>
              
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
