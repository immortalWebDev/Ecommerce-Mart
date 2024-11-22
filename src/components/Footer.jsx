import React from "react";


const Footer = () => {
  return (
    <>
    
      <footer className="">
        <div className="d-flex flex-column justify-content-center">
          <div className="">
            <p className="mb-md-3 mb-2 text-muted">
              
              <a
                href="my portfolio link"
                className="text-primary fw-bold"
                target="_blank"
                rel="noreferrer"
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
                
              ></i>
            </a>

            <a
              href="my portfolio link"
              className="fs-4 text-dark mx-3"
              target="_blank"
              rel="noreferrer"
              
            >
              <i
                className="fa fa-star"
                aria-hidden="true"
              
              ></i>
            </a>
          </div>
          <span className="mt-3 fs-6 text-secondary">
            © 2024 Rights reserved
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
