import React, { useState } from "react";
import { Footer, Navbar } from "../components/componentsExpo";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";
import { clearCartFirebase } from "../utils/firebaseHelper";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Checkout = () => {

  const [isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userEmail = useSelector((state) => state.auth.userEmail);

  const dispatch = useDispatch();

  const handleCheckout = async (values) => {
    if (isAuthenticated) {
      try {
        setIsLoading(true)
        await clearCartFirebase(userEmail);
        dispatch(clearCart());
        navigate("/success");
      } catch (error) {
        console.error("Error during checkout:", error);
      }
      finally{
        setIsLoading(false)
        // console.log('Order placed successfully of:', userEmail )
      }
    } else {
      navigate("/login");
    }
  };

  const EmptyCart = () => (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-12 text-center">
          <h4 className="p-4">
            Looks like you forgot to shop! Let’s fix that.
          </h4>
          <Link to="/product" className="btn btn-primary px-4 py-2">
            <i className="fa fa-arrow-left me-2"></i> Back to Shopping
          </Link>
        </div>
      </div>
    </div>
  );

  const ShowCheckout = () => {
    let subtotal = 0;
    let shipping = 40;
    let totalItems = 0;

    cartItems.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    const yupValidationSchema = Yup.object({
      firstName: Yup.string()
        .required("First name is required")
        .min(2, "First name must be at least 2 characters"),
      lastName: Yup.string()
        .required("Last name is required")
        .min(2, "Last name must be at least 2 characters"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      address1: Yup.string().required("Address is required"),
      address2: Yup.string(), // Optional field
      country: Yup.string().required("Country is required"),
      state: Yup.string().required("State is required"),
      zip: Yup.string()
        .required("Zip code is required")
        .matches(/^\d{5,6}$/, "Zip code must be 5-6 digits"),
      cardName: Yup.string().required("Name on card is required"),
      cardNumber: Yup.string()
        .required("Card number is required")
        .matches(/^\d{16}$/, "Card number must be 16 digits"),
      expire: Yup.string()
        .required("Expiry date is required")
        .matches(
          /^(0[1-9]|1[0-2])\/\d{2}$/,
          "Expiry date must be in MM/YY format"
        ),
      cvv: Yup.string()
        .required("CVV is required")
        .matches(/^\d{3}$/, "CVV must be 3 digits"),
    });

    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4 col-md-5 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-primary text-white">
                <h5 className="m-2">Order Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between">
                    Products ({totalItems})<span>${subtotal.toFixed(2)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    Shipping
                    <span>${shipping}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <strong>Total Amount</strong>
                    <strong>${(subtotal + shipping).toFixed(2)}</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-md-7 border border-primary rounded-2 p-1">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-light">
                <h4 className="m-1 text-primary">Billing Address</h4>
              </div>
              <div className="card-body">
                <Formik
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    address1: "",
                    address2: "",
                    country: "",
                    state: "",
                    zip: "",
                    cardName: "",
                    cardNumber: "",
                    expire: "",
                    cvv: "",
                  }}
                  validationSchema={yupValidationSchema}
                  onSubmit={handleCheckout}
                >
                  <Form>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">First Name</label>
                        <Field
                          type="text"
                          name="firstName"
                          className="form-control"
                          placeholder="John"
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Last Name</label>
                        <Field
                          type="text"
                          name="lastName"
                          className="form-control"
                          placeholder="Cena"
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="col-12">
                        <label className="form-label">Email</label>
                        <Field
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="example@domain.com"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="col-12">
                        <label className="form-label">Address</label>
                        <Field
                          type="text"
                          name="address1"
                          className="form-control"
                          placeholder="123 Main St"
                        />
                        <ErrorMessage
                          name="address1"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">
                          Address line 2 (Optional)
                        </label>
                        <Field
                          type="text"
                          name="address2"
                          className="form-control"
                          placeholder="Apartment or Suite"
                        />
                      </div>

                      <div className="col-md-5">
                        <label className="form-label">Country</label>
                        <Field
                          as="select"
                          name="country"
                          className="form-select"
                        >
                          <option value="">Select...</option>
                          <option>India</option>
                        </Field>
                        <ErrorMessage
                          name="country"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">State</label>
                        <Field as="select" name="state" className="form-select">
                          <option value="">Select...</option>
                          <option>Maharashtra</option>
                          <option>Gujarat</option>
                          <option>Tamil Nadu</option>
                          <option>Karnataka</option>
                        </Field>
                        <ErrorMessage
                          name="state"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label">Zip</label>
                        <Field
                          type="text"
                          name="zip"
                          className="form-control"
                          placeholder="110001"
                        />
                        <ErrorMessage
                          name="zip"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>

                    <hr className="my-4" />

                    <h4 className="mb-3">Payment Details</h4>
                    <div className="row gy-3">
                      <div className="col-md-6">
                        <label className="form-label">Name on Card</label>
                        <Field
                          type="text"
                          name="cardName"
                          className="form-control"
                          placeholder="John Doe"
                        />
                        <ErrorMessage
                          name="cardName"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Card Number</label>
                        <Field
                          type="text"
                          name="cardNumber"
                          className="form-control"
                          placeholder="1234 5678 9012 3456"
                        />
                        <ErrorMessage
                          name="cardNumber"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label">Expire on</label>
                        <Field
                          type="text"
                          name="expire"
                          className="form-control"
                          placeholder="MM/YY"
                        />
                        <ErrorMessage
                          name="expire"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label">CVV</label>
                        <Field
                          type="text"
                          name="cvv"
                          className="form-control"
                          placeholder="123"
                        />
                        <ErrorMessage
                          name="cvv"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>

                    <hr className="my-4" />

                    <div className="d-grid gap-2">
                      <button type="submit" className="btn btn-primary"  disabled={isLoading}>
                      {isLoading
                          ? "Processing..."
                          : "Complete Your Order"}
                      </button>
                      
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3">
        <h1 className="text-center text-danger mb-3">Checkout</h1>
        <hr />
        {cartItems.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
