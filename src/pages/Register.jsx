import React, { useState } from "react";
import { Footer, Navbar } from "../components/componentsExpo";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      navigate("/login");
    } catch (err) {
      console.error("Signup failed", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="">
        <h1 className="text-center mb-3">Create</h1>
        <p className="text-center">Get started</p>

        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5 col-sm-8">
            <div className="card shadow-lg">
              <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
                  <label htmlFor="" className="fw-semibold">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className=""
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="">
                  <label htmlFor="email" className="fw-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form">
                  <label htmlFor="password" className="fw-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control rounded-pill"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-danger text-center">{error}</p>}
                <div className="d-grid">
                  <button type="submit" disabled={isLoading}>
                    Sign up
                  </button>
                </div>
                <div className="text-center mt-4">
                  <p>
                    login <Link to="/login">Continue here</Link>
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
