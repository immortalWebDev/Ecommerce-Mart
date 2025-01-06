import React from "react";
import styles from "../styles/footer.module.css"

const Footer = () => {
  return (
    <>
     <div className="absolute bottom-0 left-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          className="w-full h-auto"
        >
          <path
            fill="#ADD8E6"
            stroke="#1E90FF"
            strokeWidth="5"
            d="M0,50 Q360,0 720,50 T1440,50"
          />
        </svg>
      </div>
      <footer className={`text-center mb-0 py-3 ${styles.footer}`}>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="col-md-8">
            <p className="mb-md-3 mb-2 fs-6 text-muted">
              Crafted with ❤️ by {" "}
              <a
                href="https://web-portfolio-piyush.vercel.app/"
                className="text-primary text-decoration-none fw-bold"
                target="_blank"
                rel="noreferrer"
                style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}
              >
                Piyush
              </a>
            </p>
            <a
              href="https://github.com/immortalWebDev"
              className="fs-4 text-dark mx-3"
              target="_blank"
              rel="noreferrer"
              style={{ transition: "color 0.3s ease" }}
            >
              <i
                className="fa fa-github"
                aria-hidden="true"
                style={{ fontSize: "1.8rem" }}
              ></i>
            </a>

            <a
              href="https://web-portfolio-piyush.vercel.app/"
              className="fs-4 text-dark mx-3"
              target="_blank"
              rel="noreferrer"
              style={{ transition: "color 0.3s ease" }}
            >
              <i
                className="fa fa-star"
                aria-hidden="true"
                style={{ fontSize: "1.8rem" }}
              ></i>
            </a>
          </div>
          <p className="mt-3 fs-6 text-secondary">
            © {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
