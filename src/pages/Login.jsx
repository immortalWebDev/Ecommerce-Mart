import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { Footer, Navbar } from "../components/componentsExpo";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

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
      console.log("User signed in successfully", data.displayName);
      // console.log(data.idToken)

       toast.success("Heyy, Welcome to Great Mart", {
        duration: 3000,
        position: "down-right",
        style: {
            marginBottom: "3rem",
            backgroundColor: '#0275d8 ',
            color: 'white',
          },
      });

      // console.log("Imp data dispatched to store");
      dispatch(
        login({
          email: data.email,
          token: data.idToken,
          refreshToken: data.refreshToken,
          displayName: data.displayName,
          expiresIn: data.expiresIn
        })
      );

      // console.log("navigated to home page after success login and updating state via redux");
      navigate("/");
    } catch (err) {
      console.error("Authentication failed", err);
      setError("Authentication failed. Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);
    setMessage(null);

    const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;

    try {
      await axios.post(`${process.env.REACT_APP_PASSWORD_RESET_URL}${apiKey}`, {
        requestType: "PASSWORD_RESET",
        email,
      });

      setMessage("Reset email sent. If your email is associated with us");
    } catch (err) {
      console.error("Password reset failed", err);
      setError("Failed to send password reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-2 py-2">
        <h1 className="text-center fw-bold text-primary mb-4">
          {isForgotPassword ? "Forgot Password" : "Welcome Back!"}
        </h1>
        <p className="text-center text-muted">
          {isForgotPassword
            ? "Enter your email to reset your password."
            : "Please login to continue accessing your account."}
        </p>
        <hr className="mb-5 text-danger" style={{ borderTop: "2px solid" }} />

        <div className="row my-4">
          <div className="col-md-6 col-lg-5 mx-auto">
            <div className="card shadow-lg p-4">
              {isForgotPassword ? (
                <form onSubmit={handleForgotPassword}>
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
                  {error && <p className="text-danger text-center">{error}</p>}
                  {message && (
                    <p className="text-success text-center">{message}</p>
                  )}
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary rounded-pill py-2 shadow-sm"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending..." : "Send Reset Email"}
                    </button>
                  </div>
                  <div className="text-center mt-4">
                    <button
                      type="button"
                      className="btn btn-link text-decoration-underline text-primary"
                      onClick={() => setIsForgotPassword(false)}
                    >
                      Back to Login
                    </button>
                  </div>
                </form>
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
