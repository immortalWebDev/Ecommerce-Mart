import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/slices/cartSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import styles from "../styles/productCard.module.css";
import { syncCartWithFirebase } from "../utils/firebaseHelper";
import { useSelector } from "react-redux";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);

  const componentMounted = useRef(true);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const userEmail = useSelector((state) => state.auth.userEmail)
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
    if (isAuthenticated && userEmail) {
      dispatch(syncCartWithFirebase(userEmail)); 
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_STORE_URL}`);
      if (componentMounted.current) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
      }

      return () => {
        componentMounted.current = false;
      };
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <div className="row">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
            <Skeleton height={500} />
          </div>
        ))}
      </div>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="d-flex flex-wrap justify-content-center gap-4 py-4">
          <button
            className="btn btn-primary btn-sm text-white px-4 py-2"
            onClick={() => setFilter(data)}
            style={{
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <i className="fa fa-th me-2"></i> All
          </button>
          <button
            className="btn btn-gradient btn-sm text-dark px-4 py-2"
            onClick={() => filterProduct("men's clothing")}
            style={{
              background: "linear-gradient(to right, #9aa5ec, #a56be1)",
              border: "none",
              
              borderRadius: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <i className="fa fa-male me-2"></i> Gent's Fashion
          </button>
          <button
            className="btn btn-gradient btn-sm text-dark px-4 py-2"
            onClick={() => filterProduct("women's clothing")}
            style={{
              background: "linear-gradient(to right, #e83e8c, #76a4b6)",
              border: "none",

              borderRadius: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <i className="fa fa-female me-2"></i> Ladies' Fashion
          </button>
          <button
            className="btn btn-gradient btn-sm text-dark px-4 py-2"
            onClick={() => filterProduct("jewelery")}
            style={{
              background: "linear-gradient(to right, #f09819, #edde5d)",
              border: "none",

              borderRadius: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <i className="fa fa-diamond me-2"></i> Gems and Ornaments
          </button>
          <button
            className="btn btn-gradient btn-sm text-dark px-4 py-2"
            onClick={() => filterProduct("electronics")}
            style={{
              background: "linear-gradient(to right, #00c6ff, #0072ff)",
              border: "none",

              borderRadius: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <i className="fa fa-tv me-2"></i> Digital Accessories
          </button>
        </div>

        <div className="row">
          {filter.map((product) => {
            return (
              <div
                id={product.id}
                key={product.id}
                className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
              >
                <div className="card text-center h-80 border-1 rounded-2 border-secondary shadow-sm">
                  <img
                    className={`p-3 rounded ${styles["card-img-top"]}`}
                    src={product.image}
                    alt={product.title}
                    height={300}
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">
                      {product.title.substring(0, 15)}...
                    </h5>
                    <p className="card-text text-muted small">
                      {product.description.substring(0, 90)}...
                    </p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item lead text-success fw-bold">
                      $ {product.price}
                    </li>
                  </ul>
                  <div className="card-body">
                    <Link
                      to={"/product/" + product.id}
                      className="btn btn-success btn-sm me-2"
                    >
                      Buy Now
                    </Link>
                   { isAuthenticated && <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => {
                        toast.dismiss();
                        toast.success("Added to cart",{
                          duration:1000,
                          position: 'top-right',
                          style: {
                            marginTop: "4rem",
                            color: '#0275d8'
                          },
                          

                        });
                        addProduct(product);
                      }}
                    >
                      Add to Cart
                    </button>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-12 text-center">
          <h2 className="display-5 fw-bold text-primary">Just Arrived...</h2>
          <p className="text-muted">
            Explore our collection of the best products
          </p>
          <hr className="w-50 mx-auto text-success" />
        </div>
      </div>
      <div className="row justify-content-center">
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
};

export default Products;
