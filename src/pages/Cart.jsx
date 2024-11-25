import React from "react";
import { Footer, Navbar } from "../components/componentsExpo";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";


const Cart = () => {


  const state = useSelector((state) => state.cart);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  

  const EmptyCart = () => (
    <div className="container">
      <div className="row">
        <div className="col-md-12 py-5 bg-light text-center">
          <h4 className="p-3 display-5">
            Looks like you forgot to shop! Let’s fix that.
          </h4>
          <Link to="/" className="btn btn-outline-dark mx-4">
            <i className="fa fa-arrow-left"></i> Back to Shopping
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
    <section className="h-100 gradient-custom">
      <div className="container py-4">
        <div className="row d-flex justify-content-center my-3">
          <div className="col-md-8">
            <p className="text-success fs-4">We hope you got all you want!</p>
            <div className="card mb-4">
              <div className="card-header py-2">
                <h5 className="mb-0">Your Cart Details</h5>
              </div>
              <div className="card-body">
                {state.map((item) => (
                  <div key={item.id}>
                    <div className="row d-flex align-items-center">
                      <div className="col-lg-3 col-md-12">
                        <img
                          src={item.image}
                          alt={item.title}
                          width={100}
                          height={75}
                          className="img-fluid rounded"
                        />
                      </div>
                      <div className="col-lg-5 col-md-6">
                        <p>
                          <strong>{item.title}</strong>
                        </p>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div
                          className="d-flex mb-4"
                          style={{ maxWidth: "300px" }}
                        >
                          <button
                            className="btn btn-outline-danger px-3"
                            onClick={() => removeItem(item)}
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                          <p className="mx-5">{item.qty}</p>
                          <button
                            className="btn btn-outline-success px-3"
                            onClick={() => addItem(item)}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        <p className="text-start text-md-center">
                          <strong>
                            <span className="text-muted">{item.qty}</span> x $
                            {item.price}
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
            <p className="text-success fs-4">Visit us again!</p>
            <div className="card mb-4">
              <div className="card-header py-2 bg-light">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products ({totalItems}) <span>${Math.round(subtotal)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping <span>${shipping}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <strong>Total amount</strong>
                    <span>
                      <strong>${Math.round(totalAmount)}</strong>
                    </span>
                  </li>
                </ul>
                <Link
                  to="/checkout"
                  className="btn btn-success btn-lg btn-block"
                  onClick={handleCheckout}
                >
                  Checkout now
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
      <div className="container my-3 py-3">
        <h1 className="text-center text-primary">Your Cart Summary</h1>
        <hr className="text-danger" style={{ borderTop: "2px solid" }} />
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
