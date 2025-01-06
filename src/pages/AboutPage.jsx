import React from "react";
import { Footer, Navbar } from "../components/componentsExpo";
import styles from"../styles/aboutPageCard.module.css";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center text-primary display-5">Let us introduce ourselves</h1>
        <hr className="mb-5 text-danger" style={{ borderTop: "2px solid" }} />
        <p
          className="lead text-center"
          style={{
            fontWeight: 500,
            width: "90%",
            margin: "0 auto",
            lineHeight: "1.7",
          }}
        >
          At <strong>Great Mart</strong>, we believe in creating a seamless
          shopping experience that brings <strong>Quality Products</strong>{" "}
          right to your doorstep. From trendy clothing to cutting-edge
          electronics, our curated collection is designed to cater to every
          taste and need. We pride ourselves on offering the best deals,
          unmatched customer service, and a shopping journey that is both
          delightful and effortless. As we continue to grow, our goal remains
          the same: to serve you with <strong>integrity, innovation</strong>,
          and a <strong>touch of excellence</strong>. <br />
          Let’s make every purchase a memorable one!
        </p>

        <h2 className="text-center text-info pt-5 pb-3">Our main categories</h2>
        <div className="row">
          <div className={`col-md-3 col-sm-6 mb-4 px-3 ${styles['card']}`}>
            <div className={`h-100 shadow-lg border-0 ${styles['card']}`}>
              <img
                className={`img-fluid rounded-top ${styles['card-img-top']}`}
                src="https://cdn.jsdelivr.net/gh/immortalWebDev/my-cdn@fa4f40cc754803fc272bc18c296f72bf7133e974/great-mart/womens-clothing.webp"
                alt="Women's Clothing"
                height={160}
                loading="lazy"
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
                src="https://cdn.jsdelivr.net/gh/immortalWebDev/my-cdn@fa4f40cc754803fc272bc18c296f72bf7133e974/great-mart/jewelry.webp"
                alt="Jewelry"
                height={160}
                loading="lazy"
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
                src="https://cdn.jsdelivr.net/gh/immortalWebDev/my-cdn@fa4f40cc754803fc272bc18c296f72bf7133e974/great-mart/mens-clothing.webp"
                alt="Men's Clothing"
                height={160}
                loading="lazy"
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
                src="https://cdn.jsdelivr.net/gh/immortalWebDev/my-cdn@fa4f40cc754803fc272bc18c296f72bf7133e974/great-mart/comp-electronics.webp"
                alt="Electronics"
                height={160}
                loading="lazy"
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
