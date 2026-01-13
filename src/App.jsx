import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ScrollHandler from "./components/ScrollHandler";
import { Home, MainContent } from "./pages/pagesExpo";
import { useSelector, useDispatch } from "react-redux";
import { getCartFromFirebase } from "./utils/firebaseHelper";
import { setCart } from "./redux/slices/cartSlice";
import { ClipLoader } from "react-spinners";
import ErrorBoundary from "./components/ErrorBoundary";

const Profile = lazy(() => import("./pages/Profile"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Checkout = lazy(() => import("./pages/Checkout"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const PageNotFound404Error = lazy(() => import("./pages/PageNotFound404Error"));
const BuyNow = lazy(() => import("./pages/BuyNow"));
const Success = lazy(() => import("./pages/Success"));

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userEmail = useSelector((state) => state.auth.userEmail);
  const currentCart = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userEmail) {
          const firebaseCart = await getCartFromFirebase(userEmail);

          const isCartDifferent = JSON.stringify(currentCart) !== JSON.stringify(firebaseCart);
           if (isCartDifferent) {
            dispatch(setCart(firebaseCart));
            localStorage.setItem("cart", JSON.stringify(firebaseCart));
          }
        }

        // toast.success("Cart synced successfully!", {
        //   duration: 2000,
        //   position: "top-right",
        //   style: {
        //     marginTop: "4rem",
        //     color: "#0275d8",
        //   },
        // });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (userEmail) {
      fetchData();
    }
  }, [userEmail, dispatch]);

  return (
    <>
      <ScrollHandler>
        <ErrorBoundary>
        <Suspense
          fallback={
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "90vh" }}
            >
              <ClipLoader color="red" size={60} />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<MainContent />} />
            <Route path="/product/:id" element={<BuyNow />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/checkout"
              element={
                isAuthenticated ? <Checkout /> : <Navigate to="/login" />
              }
            />
            <Route path="/success" element={<Success />} />
            <Route path="*" element={<PageNotFound404Error />} />
            <Route path="/product/*" element={<PageNotFound404Error />} />
          </Routes>
        </Suspense>
        </ErrorBoundary>
      </ScrollHandler>
      <Toaster />
    </>
  );
};

export default App;
