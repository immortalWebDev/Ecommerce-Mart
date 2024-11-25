import React from "react";
import { Footer, Navbar } from "../components/componentsExpo";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center text-primary display-5">Welcome</h1>

        <p className="lead text-center">
          Paragraph of intro rough 300-400 chars
        </p>

        <h2 className="text-center  pb-3">categories</h2>
        <div className="row">
          <div className="">
            <div className="">
              <img
                className=""
                src="\assets\womens-clothing.jpg"
                alt="Women's fash"
              />
              <div className="">
                <h5 className="women-fashion">Women fashion</h5>
              </div>
            </div>
          </div>

          <div className="">
            <div className="">
              <img className="" src="\assets\jewelry.jpg" alt="Jewelry" />
              <div className="">
                <h5 className="">Gems & Adornments</h5>
              </div>
            </div>
          </div>

          <div className="">
            <div className="">
              <img
                className=""
                src="\assets\mens-clothing.jpg"
                alt="Men's Clothing"
              />
              <div className="">
                <h5 className="">Men Fashion</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
