import React, { useEffect, useState } from "react";
import { getCartFromFirebase } from "../utils/firebaseHelper";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCart } from "../redux/slices/cartSlice";
import { fetchUserProfile } from "../utils/firebaseHelper";
import { ClipLoader } from "react-spinners";
import styles from "../styles/main.module.css"

const Main = () => {
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.userEmail);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const name = await fetchUserProfile();
          setUserName(name);
        }
        if (userEmail) {
          const cart = await getCartFromFirebase(userEmail);
          dispatch(setCart(cart));
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token || userEmail) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [token, userEmail, dispatch]);

  const getWelcomeMessage = () => {
    if (isAuthenticated && userName) {
      return `Welcome, ${userName}`;
    } else {
      return "Hey, Welcome to Great Mart";
    }
  };

  return (
    <>
      <div className="main-body border-1">
        {isLoading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "90vh" }}
          >
            <ClipLoader color="blue" size={60} />
          </div>
        ) : (
          <div className="card bg-dark text-white border-0 mx-3">
            <img
              className={`${styles['card-img']}`}
              src="./assets/cart.png"
              alt="background"
            />
            <div className="card-img-overlay d-flex align-items-center">
              <div className="container">
                <h3 className="card-title fs-2 text-primary fw-bold">
                  {getWelcomeMessage()}
                </h3>
                <h5 className={`fs-1 text-primary fw-bold ${styles['card-title']}`}>
                  Exclusive Deals Waiting for you!
                </h5>
                <p className={`${styles['card-text']}`}>
                  Shop the Latest Trends and Save Big <br />
                  Hurry up - Limited Time Only!
                </p>
              </div>
            </div>
          </div>
        )}
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
