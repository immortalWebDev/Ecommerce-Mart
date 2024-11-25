import React from "react";
import { Footer, Navbar } from "../components/componentsExpo";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice"; //till here

const Checkout = () => {
  
  const cartItems = useSelector((state) => state.cart);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  

  const EmptyCart = () => (
    <div className="container py-5">
      
        <div className="col-md-12 text-center">
          <h4 className="p-4">
            go back shopping text

          </h4>
          <Link to="/" className="">
            <i className="fa fa-arrow-left me-2"></i> shop back button
          </Link>
      
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
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        placeholder="John"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        placeholder="Cena"
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="example@domain.com"
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Address</label>
                      <input
                        type="text"
                        name="address1"
                        className="form-control"
                        placeholder="123 Main St"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">
                        Address line 2 (Optional)
                      </label>
                      <input
                        type="text"
                        name="address2"
                        className="form-control"
                        placeholder="Apartment or Suite"
                      />
                    </div>

                    <div className="col-md-5">
                      <label className="form-label">Country</label>
                      <select className="form-select" name="country">
                        <option value="">Select...</option>
                        <option>India</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">State</label>
                      <select className="form-select" name="state">
                        <option value="">Select...</option>
                        <option>Maharashtra</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Zip</label>
                      <input
                        type="text"
                        name="zip"
                        className="form-control"
                        placeholder="110001"
                      />
                    </div>
                  </div>

                  <hr className="my-4" />

                  <h4 className="mb-3">Payment Details</h4>
                  <div className="row gy-3">
                    <div className="col-md-6">
                      <label className="form-label">Name on Card</label>
                      <input
                        type="text"
                        name="cardName"
                        className="form-control"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        className="form-control"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Expire on</label>
                      <input
                        type="text"
                        name="expire"
                        className="form-control"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        className="form-control"
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <hr className="my-4" />

                  <button
                    type="submit"
                    className="btn btn-success w-100"
                    onClick={handleCheckout}
                  >
                    Complete Your Order
                  </button>
                </form>
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
      <div className="container my-4">
        <h1 className="text-center text-danger mb-4">Checkout</h1>
        <hr />
        {cartItems.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
