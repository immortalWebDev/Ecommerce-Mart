import React from "react";
import { Link } from "react-router-dom";
import { Navbar,Footer } from "../components/componentsExpo";


const PageNotFound404Error = () => {
  return (
    <>
    <Navbar/>
      <div className="container my-5 py-5">
        <div className="row justify-content-center ">
          <div className="col-md-6 col-lg-4 col-sm-8  text-center">
            <div className="bg-light p-5 rounded-lg border border-danger rounded-3 shadow-sm">
              <h1 className="display-3 text-danger fw-bold">404</h1>
              <h4 className="text-muted mb-4">Oops! Page Not Found</h4>
              <p className="text-muted mb-4">
                The page you are looking for might have been removed or is temporarily unavailable.
              </p>
              <Link to="/" className="btn btn-dark btn-lg px-4 py-2 rounded-pill">
                <i className="fa fa-home"></i> Go Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default PageNotFound404Error;
