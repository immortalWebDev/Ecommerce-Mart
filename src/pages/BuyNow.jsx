import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/slices/cartSlice";
import { Footer, Navbar } from "../components/componentsExpo";
import { syncCartWithFirebase } from "../utils/firebaseHelper";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import styles from "../styles/buyNow.module.css"

const BuyNow = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userEmail = useSelector((state) => state.auth.userEmail);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
    if (isAuthenticated && userEmail) {
      dispatch(syncCartWithFirebase(userEmail));
    }

    toast.dismiss();
    toast.success("Added to cart", {
      duration: 1000,
      position: "top-right",
      style: {
        marginTop: "4rem",
        color: "#0275d8",
      },
    });
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      setLoading2(true);
      const response = await fetch(`${process.env.REACT_APP_STORE_URL}${id}`);
      const data = await response.json();
      setProduct(data);
      setLoading(false);
      const response2 = await fetch(
        `${process.env.REACT_APP_STORE_URL}category/${data.category}`
      );
      const data2 = await response2.json();
      setSimilarProducts(data2);
      setLoading2(false);
    };
    getProduct();
  }, [id]);

  const Loading = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row align-items-center">
            <div className="col-md-6 col-sm-12 py-3 text-center">
              <Skeleton height={400} width={450} className="rounded shadow" />
            </div>

            <div className="col-md-6 col-sm-12 py-4 border rounded shadow-sm bg-light">
              <div className="text-center mb-4">
                <Skeleton height={20} width={150} className="mb-3" />

                <Skeleton height={30} width={300} className="mb-3" />
              </div>

              <div className="d-flex align-items-center justify-content-center mb-3">
                <Skeleton height={20} width={50} className="me-2" />
                <Skeleton height={20} width={70} />
              </div>

              <Skeleton height={40} width={200} className="text-center my-3" />

              <Skeleton height={15} width={"100%"} className="mb-2" />
              <Skeleton height={15} width={"90%"} className="mb-2" />
              <Skeleton height={15} width={"95%"} />

              <div className="text-center mt-4">
                <Skeleton height={50} width={150} className="me-3" />
                <Skeleton height={50} width={150} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row align-items-center">
            <div className="col-md-6 col-sm-12 py-3 text-center">
              <img
                className={` rounded-4 shadow border border-warning ${styles['product-image']}`}
                src={product.image}
                alt={product.title}
              />
            </div>

            <div className="col-md-6 col-sm-12 p-5 border rounded-4 border-warning shadow-sm bg-light">
              <div className="text-center mb-4">
                <h6 className="text-muted text-uppercase">
                  {product.category}
                </h6>
                <h2 className="text-primary font-weight-bold">
                  {product.title}
                </h2>
              </div>

              <div className="d-flex align-items-center justify-content-center mb-3">
                <p className="lead mb-0 me-2">
                  {product.rating && product.rating.rate}{" "}
                  <i className="fa fa-star text-warning"></i>
                </p>
                <span className="badge bg-success ms-2">Rated</span>
              </div>

              <h4 className="text-danger display-6 my-3 text-center">
                ${product.price}
              </h4>

              <div className="text-dark mb-4">
                <p className="lead">{product.description}</p>
              </div>

              <div className={`text-center ${styles['button-group']}`}>
                {isAuthenticated && (
                  <button
                    className="btn btn-primary px-4 py-2 me-3"
                    onClick={() => addProduct(product)}
                  >
                    <i className="fa fa-cart-plus me-2"></i> Add to Cart
                  </button>
                )}
                <Link to={isAuthenticated ? '/cart' : '/login'} className="btn btn-info px-4 py-2">
                  <i className="fa fa-shopping-cart me-2"></i> Proceed to Buy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const Loading2 = () => {
    return (
      <>
        <div className="my-4 py-4">
          <div className="d-flex flex-wrap justify-content-center">
            <div className="mx-3">
              <Skeleton height={300} width={200} borderRadius={8} />
            </div>
            <div className="mx-3">
              <Skeleton height={300} width={200} borderRadius={8} />
            </div>
            <div className="mx-3">
              <Skeleton height={300} width={200} borderRadius={8} />
            </div>
            <div className="mx-3">
              <Skeleton height={300} width={200} borderRadius={8} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowSimilarProduct = () => {
    return (
      <>
        <div className="py-4 my-4">
          <div className="d-flex ">
            {similarProducts.map((item) => {
              return (
                <div
                  key={item.id}
                  className="card mx-4 text-center border rounded-2 border-primary"
                >
                  <img
                    className="card-img-top p-3"
                    src={item.image}
                    alt="Card"
                    height={300}
                    width={300}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {item.title.substring(0, 15)}...
                    </h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item lead">${product.price}</li>
                  </ul>
                  <div className="card-body">
                    <Link
                      to={"/product/" + item.id}
                      className="btn btn-success m-1"
                    >
                      Buy Now
                    </Link>
                    {isAuthenticated && (
                      <button
                        className="btn btn-primary m-1"
                        onClick={() => addProduct(item)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            className="w-full h-auto"
          >
            <path
              fill="none"
              stroke="blue"
              strokeWidth="3"
              d="M0,50 Q360,0 720,50 T1440,50"
            />
          </svg>
        </div>
        <div className="row my-2 py-2">
          <div className="d-none d-md-block">
            <h2 className="">Peope have also bought:</h2>
            <Marquee pauseOnHover={true} pauseOnClick={true} speed={60}>
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BuyNow
