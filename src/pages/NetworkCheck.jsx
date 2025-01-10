import React, { useState, useEffect } from "react";

const NetworkCheck = ({ children }) => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOffline) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-dark"
        style={{ textAlign: "center" }}
      >
        <i
          className="text-primary"
          aria-hidden="true"
        ></i>
        <h1 className="fw-bold">You are Offline</h1>
        <p className="text-secondary fs-5">
          It looks like there’s a network glitch. <br />
          Please check your internet connection and try again.
        </p>
        <button
          className="btn btn-primary mt-3"
          onClick={() => window.location.reload()}
        >
          Refresh page
        </button>
      </div>
    );
  }

  return children;
};

export default NetworkCheck;
