import React from "react";


const Footer = () => {
  return (
    <>
    
      <footer className="">
        <div className="d-flex flex-column justify-content-center">
          <div className="">
            <p className="mb-md-3 mb-2 text-muted">
              Crafted with ❤️ by {" "}
              <a
                href="my portfolio link"
                className="text-primary text-decoration-none fw-bold"
                target="_blank"
                rel="noreferrer"
                style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}
              >
                Piyush Badgujar
              </a>
            </p>
            <a
              href="my git link"
              className="fs-4 text-dark mx-3"
              target="_blank"
              rel="noreferrer"
              
            >
              <i
                className="fa fa-github"
                aria-hidden="true"
                style={{ fontSize: "1.8rem" }}
              ></i>
            </a>

            <a
              href="my portfolio link"
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
            © 2024 Rights reserved
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
