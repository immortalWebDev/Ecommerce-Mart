import React, { useState } from "react";
import { Footer, Navbar } from "../components/componentsExpo";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-hot-toast";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError(null);


    const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;

    try {

      const response = await axios.post(
        `${process.env.REACT_APP_SIGN_UP_URL}${apiKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      );

      const data = response.data;
      // console.log("User registered successfully", data.email);

      // Show success toast
      toast.success("Heyy, Registration successful! Redirecting to login...", {
        duration: 3000,
        position: "down-right",
        style: {
            marginBottom: "3rem",
          },
      });


      // Redirect after a short delay
      setTimeout(() => navigate("/login"), 3000);
      
    //   navigate("/login");
    } catch (err) {
      console.error("Signup failed", err);
      setError("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-2 py-2">
        <h1 className="text-center text-primary mb-3">Create Your Account</h1>
        <p className="text-center text-muted mb-3">
          Get started with us today! It's quick and easy.
        </p>
        <hr className="mb-5 text-danger" style={{ borderTop: "2px solid" }} />

        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5 col-sm-8">
            <div className="card shadow-lg p-4">
              <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
                  <label htmlFor="Name" className="fw-semibold">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="fullName"
                    placeholder="Enter your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
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
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="password" className="fw-semibold">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control rounded-pill"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-danger text-center">{error}</p>}
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary rounded-pill py-2 shadow-sm"
                    disabled={isLoading}
                  >
                    {isLoading  ? "Registering..." : "Register"}
                  </button>
                </div>
                <div className="text-center mt-4">
                  <p>
                    Already with us ?{" "}
                    <Link
                      to="/login"
                      className="text-decoration-underline text-primary"
                    >
                      Continue here
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

export default Register;
