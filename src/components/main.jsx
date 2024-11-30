import React from "react";

const Home = () => {
  return (
    <>
      <div className="main border-1">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="./assets/cart.png"
            alt="background"
          />
          <div className="card-img-overlay d-flex align-items-center">
            <div className="container">
              <h3 className="card-title fs-2 text-primary fw-bold">
                {getWelcomeMessage()}
              </h3>
              <h5 className="card-title fs-1 text-primary fw-bold">
                Exclusive Deals Waiting for you!
              </h5>
              <p className="card-text fs-5 ">
                Shop the Latest Trends and Save Big – Hurry up ! <br />
                Limited Time Only!
              </p>
            </div>
          </div>
        </div>)}
        <div className="absolute bottom-0 left-0 w-full mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            className="w-full h-auto"
          >
            <path
              fill="none"
              stroke="red"
              strokeWidth="3"
              d="M0,50 Q360,0 720,50 T1440,50"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Main;
