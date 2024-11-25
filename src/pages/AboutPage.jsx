import React from "react";
import { Footer, Navbar } from "../components/componentsExpo";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center text-primary display-5">Welcome</h1>
        
        <p
          className="lead text-center"
          
        >
          Paragraph of intro rough 300-400
        </p>

        <h2 className="text-center text-info pt-5 pb-3">Our main categories</h2>
        <div className="row">
          <div className={`col-md-3 col-sm-6 mb-4 px-3 ${styles['card']}`}>
            <div className={`h-100 shadow-lg border-0 ${styles['card']}`}>
              <img
                className={`img-fluid rounded-top ${styles['card-img-top']}`}
                src="\assets\womens-clothing.jpg"
                alt="Women's Clothing"
                height={160}
              />
              <div className={`text-center ${styles['card-body']}`}>
                <h5 className={`fw-bold ${styles[`card-title`]}`}>Her Fashion</h5>
              </div>
            </div>
          </div>

          <div className={`col-md-3 col-sm-6 mb-4 px-3 ${styles['card']}`}>
            <div className={`h-100 shadow-lg border-0 ${styles['card']}`}>
              <img
                className={`img-fluid rounded-top ${styles['card-img-top']}`}
                src="\assets\jewelry.jpg"
                alt="Jewelry"
                height={160}
              />
              <div className={`text-center ${styles['card-body']}`}>
                <h5 className={`fw-bold ${styles[`card-title`]}`}>Gems & Adornments</h5>
              </div>
            </div>
          </div>

          <div className={`col-md-3 col-sm-6 mb-4 px-3 ${styles['card']}`}>
            <div className={`h-100 shadow-lg border-0 ${styles['card']}`}>
              <img
                className={`img-fluid rounded-top ${styles['card-img-top']}`}
                src="\assets\mens-clothing.jpg"
                alt="Men's Clothing"
                height={160}
              />
              <div className={`text-center ${styles['card-body']}`}>
                <h5 className={`fw-bold ${styles[`card-title`]}`}>His Fashion</h5>
              </div>
            </div>
          </div>

          <div className={`col-md-3 col-sm-6 mb-4 px-3 ${styles['card']}`}>
            <div className={`h-100 shadow-lg border-0 ${styles['card']}`}>
              <img
                className={`img-fluid rounded-top ${styles['card-img-top']}`}
                src="\assets\comp-electronics.jpeg"
                alt="Electronics"
                height={160}
              />
              <div className={`text-center ${styles['card-body']}`}>
                <h5 className={`fw-bold ${styles[`card-title`]}`}>Gadgets</h5>
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
