import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  currencyUSD,
  currencyVND,
  listAllProducts,
} from "../../../redux/admin/Actions/ProductActions.js";
import Message from "../LoadingError/Error.js";
import LoadingDashboard from "../LoadingError/LoadingDashboard.js";
import Product from "../products/Product.js";
import { ToastContainer, toast } from "react-toastify";
const CurrencyComponent = () => {
  const dispatch = useDispatch();

  const productsListAll = useSelector((state) => state.productsListAll);
  const { loading, error, productsAll } = productsListAll;

  useEffect(() => {
    dispatch(listAllProducts());
  }, [dispatch]);
  const [index, setIndex] = useState(1);

  const handleCurrencyVND = () => {
    dispatch(currencyVND());
    toast("Change VND success ");
    setIndex(2);
  };
  const handleCurrencyUSD = () => {
    dispatch(currencyUSD());
    toast("Change USD success ");
    setIndex(1);
  };
  console.log(productsAll);
  return (
    <>
      <ToastContainer />
      <section className="content-main">
        <div className="box-currency">
          <button
            type="button"
            className="btn btn-success btn-ripple"
            style={{ background: index === 1 ? "gray" : "" }}
            onClick={handleCurrencyUSD}
          >
            USD
          </button>
          <button
            type="button"
            className="btn btn-success btn-ripple"
            onClick={handleCurrencyVND}
            style={{ background: index === 2 ? "gray" : "" }}
          >
            VND
          </button>
        </div>
        <section className="content-main">
          <div className="content-header">
            <h2 className="content-title">Danh sách sản phẩm</h2>
          </div>

          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              {
                <div className="row">
                  {/* Products */}
                  {productsAll &&
                    !productsAll.products &&
                    productsAll.map((product) => (
                      <Product product={product} key={product._id} />
                    ))}
                </div>
              }
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
