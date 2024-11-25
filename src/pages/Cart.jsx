import React from "react";
import { Footer, Navbar } from "../components/componentsExpo";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const state = useSelector((state) => state.cart);


  const dispatch = useDispatch();

  const EmptyCart = () => (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h4 className="p-3 display-5">Cart is empty</h4>
          <Link to="/" className="btn mx-4">
            <i className=""></i> go back
          </Link>
        </div>
      </div>
    </div>
  );

  const addItem = (product) => dispatch(addCart(product));
  const removeItem = (product) => dispatch(delCart(product));

  const calculateTotal = () => {
    let subtotal = 0;
    let totalItems = 0;
    state.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });
    return { subtotal, totalItems, shipping: 40, totalAmount: subtotal + 40 };
  };

  const { subtotal, totalItems, shipping, totalAmount } = calculateTotal();

  const ShowCart = () => (
    <section className="">
      <div className="container py-4">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header"></div>
              <div className="card-body">
                {state.map((item) => (
                  <div key={item.id}>
                    <div className="row d-flex align-items-center">
                      <div className="col-lg-3 col-md-12"></div>
                      <div className="col-lg-5 col-md-6">
                        <p>
                          <strong>{item.title}</strong>
                        </p>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="d-flex mb-4">
                          <button className="" onClick={() => removeItem(item)}>
                            <i className="">-</i>
                          </button>
                          <p className="mx-5">{item.qty}</p>
                          <button className="" onClick={() => addItem(item)}>
                            <i className="">+</i>
                          </button>
                        </div>
                        <p className="">
                          <strong>
                            <span className="">{item.qty}</span> x ${item.price}
                          </strong>
                        </p>
                      </div>
                    </div>
                    <hr className="my-4" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header py-2 bg-light">
                <h5 className="mb-0">Order details</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between">
                    Products ({totalItems}) <span>${Math.round(subtotal)}</span>
                  </li>
                  <li className="list-group-item d-flex align-items-center px-0">
                    Shipping <span>${shipping}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <strong>Total amount</strong>
                    <span>
                      <strong>${Math.round(totalAmount)}</strong>
                    </span>
                  </li>
                </ul>
                <Link to="/checkout" className="btn" onClick={handleCheckout}>
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="text-center text-primary">cart</h1>
        <hr className="text-danger" />
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
