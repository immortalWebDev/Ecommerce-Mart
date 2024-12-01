import React ,{useEffect}from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ScrollHandler from "./components/ScrollHandler";
import {
  Home,
  MainContent,
  Profile,
  AboutPage,
  ContactPage,
  Cart,
  Login,
  Register,
  Checkout,
  ThankYou,
  PageNotFound404Error,
  BuyNow,
} from "./pages/pagesExpo";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import {getCartFromFirebase } from "./utils/firebaseHelper";
import { setCart } from "./redux/slices/cartSlice";
import { useDispatch } from "react-redux";

const App = () => {

  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token)
  const userEmail = useSelector((state) => state.auth.userEmail)

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        if (userEmail) {
          const cart = await getCartFromFirebase(userEmail);
          dispatch(setCart(cart));
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (userEmail) {
      fetchData();
    } 
  }, [token, userEmail, dispatch]);


  return (
    <>
      <ScrollHandler>
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
            element={isAuthenticated ? <Checkout /> : <Navigate to="/login" />}
          />
          <Route path="/success" element={<Success />} />
          <Route path="*" element={<PageNotFound404Error />} />
          <Route path="/product/*" element={<PageNotFound404Error />} />
        </Routes>
      </ScrollHandler>
      <Toaster />
    </>
  );
};

export default App;
