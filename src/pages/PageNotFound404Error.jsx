import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Footer } from "../components/componentsExpo";

const PageNotFound404Error = () => {
  return (
    <>
      <Navbar />
      <div className="container my-5 py-5">
        <div className="col-md-6 col-lg-4 ">
          <div className="bg-light p-5 shadow-sm">
            <h1 className="text-danger fw-bold">Errorr 404</h1>
            <h4 className="">Oops! Page Not Found</h4>
            <p className="">No page</p>
            <Link to="/" className="btn btn-dark">
              <i className=""></i> Back
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PageNotFound404Error;
