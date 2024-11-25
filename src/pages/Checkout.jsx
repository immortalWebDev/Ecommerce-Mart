import React from "react";
import { Footer, Navbar } from "../components/componentsExpo";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart);

  const EmptyCart = () => (
    <div className="container py-5">
      <div className="col-md-12 text-center">
        <h4 className="p-4">go back shopping text</h4>
        <Link to="/" className="">
          <i className=""></i> shop back button
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
        <div className="">
          <div className="col-lg-4 col-md-5 mb-4">
            <div className="">
              <div className="">
                <h5 className="m-2">Order </h5>
              </div>
              <div className="card-body">
                <ul className="list-group">
                  <li className="list-group-item ">
                    Products ({totalItems})<span>${subtotal.toFixed(2)}</span>
                  </li>
                  <li className="list-group-item ">
                    Shipping
                    <span>${shipping}</span>
                  </li>
                  <li className="">
                    <strong>Total Amount</strong>
                    <strong>${(subtotal + shipping).toFixed(2)}</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-md-7">
            <div className="card shadow-sm">
              <div className="card-header">
                <h4 className="m-1 text-primary">Address</h4>
              </div>
              <div className="card-body">
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">First Name</label>
                      <input type="text" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Last Name</label>
                      <input type="text" />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Email</label>
                      <input type="email" />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Address</label>
                      <input type="text" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">
                        Address line 2 (Optional)
                      </label>
                      <input type="text" name="address2" />
                    </div>

                    <div className="col-md-5">
                      <label className="form-label">Country</label>
                      <select className="form-select" name="country">
                        <option>India</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">State</label>
                      <select className="form-select" name="state">
                        <option>Maharashtra</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Zip</label>
                      <input type="text" />
                    </div>
                  </div>

                  <hr className="my-4" />

                  <h4 className="mb-3">Payment Details</h4>
                  <div className="row gy-3">
                    <div className="col-md-6">
                      <label className="form-label">Name on Card</label>
                      <input type="text" name="cardName" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Card Number</label>
                      <input type="text" />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Expire on</label>
                      <input type="text" />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">CVV</label>
                      <input type="text" />
                    </div>
                  </div>

                  <hr className="my-4" />

                  <button
                    type="submit"
                    className="btn btn-success w-100"
                    onClick={handleCheckout}
                  >
                    Place order
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
        <h1 className="text-center">Checkout</h1>
        <hr />
        {cartItems.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
