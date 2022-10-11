import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  currencyUSD,
  currencyVND,
  listAllProducts,
  listProducts,
} from "../../../redux/admin/Actions/ProductActions.js";
import Message from "../LoadingError/Error.js";
// import Loading from "../LoadingError/Loading.js";
import LoadingDashboard from "../LoadingError/LoadingDashboard.js";
import Product from "../products/Product.js";
import { ToastContainer, toast } from "react-toastify";
const CurrencyComponent = () => {
  const dispatch = useDispatch();

  const productsListAll = useSelector((state) => state.productsListAll);
  const { loading, error, productsAll } = productsListAll;

  // const productList = useSelector((state) => state.productList);
  // const { loading, error, products } = productList;
  console.log(productsAll);
  useEffect(() => {
    dispatch(listAllProducts());
    dispatch(listProducts());
    // dispatch(currencyUSD());
  }, [dispatch]);

  const handleCurrencyVND = () => {
    dispatch(currencyVND());
    toast("Change VND success ");
  };
  const handleCurrencyUSD = () => {
    dispatch(currencyUSD());
    toast("Change USD success ");
  };

  return (
    <>
      <ToastContainer />
      <section className="content-main">
        <div className="box-currency">
          <button
            type="button"
            className="btn btn-success btn-ripple"
            onClick={handleCurrencyVND}
          >
            VND
          </button>
          <button
            type="button"
            className="btn btn-success btn-ripple"
            onClick={handleCurrencyUSD}
          >
            USD
          </button>
        </div>
        <section className="content-main">
          <div className="content-header">
            <h2 className="content-title">Products</h2>
          </div>

          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <div className="row">{!productsAll.products && <p>Empty</p>}</div>
              {loading ? (
                <LoadingDashboard />
              ) : error ? (
                <Message variant="alert-danger">{error}</Message>
              ) : (
                <div className="row">
                  {/* Products */}
                  {productsAll.products &&
                    productsAll.products.map((product) => (
                      <Product product={product} key={product._id} />
                    ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default CurrencyComponent;
