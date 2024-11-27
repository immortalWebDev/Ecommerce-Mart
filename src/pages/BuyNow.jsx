import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/slices/cartSlice";
import { Footer, Navbar } from "../components/componentsExpo";
import { syncCartWithFirebase } from "../utils/firebaseHelper";
import { useSelector } from "react-redux";

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
        <div className="container my-2 py-5">
          <div className="row align-items-center">
            <div className="col-md-6 col-sm-12 py-5">
              <img
                className="img-fluid"
                src={product.image}
                alt={product.title}
                width={"450px"}
                height={"400px"}
              />
            </div>

            <div className="col-md-6 col-sm-12">
              <div className="text-center mb-4">
                <h6 className="">{product.category}</h6>
                <h2 className="">{product.title}</h2>
              </div>

              <div className="d-flex align-items-center justify-content-center">
                <p className="">{product.rating && product.rating.rate} </p>
                <span className="">Rated</span>
              </div>

              <h4 className="">${product.price}</h4>

              <div className="text-dark">
                <p className="lead">{product.description}</p>
              </div>

              <div className="text-center">
                {isAuthenticated && (
                  <button className="" onClick={() => addProduct(product)}>
                    Add to Cart
                  </button>
                )}
                <Link to="/cart" className="">
                  Proceed to Buy
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
                <div key={item.id} className="">
                  <img
                    className=""
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
                  <ul className="">
                    <li className="">${product.price}</li>
                  </ul>
                  <div className="card-body">
                    <Link to={"/product/" + item.id} className="">
                      Buy Now
                    </Link>
                    {isAuthenticated && (
                      <button className="" onClick={() => addProduct(item)}>
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
        <div className="row">
          {" "}
          <ShowProduct />
        </div>

        <div className="d-none d-md-block">
          <h3 className="">Peope have also bought:</h3>

          <ShowSimilarProduct />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BuyNow;
