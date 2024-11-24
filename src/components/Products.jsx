import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/slices/cartSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import styles from "../styles/productCard.module.css";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);

  const componentMounted = useRef(true);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
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
        <div className="d-flex flex-wrap justify-content-center gap-3 py-4">
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
              // color: "white",
              borderRadius: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <i className="fa fa-male me-2"></i> Men's Clothing
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
            <i className="fa fa-female me-2"></i> Women's Clothing
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
            <i className="fa fa-diamond me-2"></i> Jewelery
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
            <i className="fa fa-tv me-2"></i> Electronics
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
                <div className="card text-center h-100 border-1 shadow-sm">
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
                    <li className="list-group-item lead text-primary fw-bold">
                      $ {product.price}
                    </li>
                  </ul>
                  <div className="card-body">
                    <Link
                      to={"/product/" + product.id}
                      className="btn btn-primary btn-sm me-2"
                    >
                      Buy Now
                    </Link>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => {
                        toast.dismiss();
                        toast.success("Added to cart");
                        addProduct(product);
                      }}
                    >
                      Add to Cart
                    </button>
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
