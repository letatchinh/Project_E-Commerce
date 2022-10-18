import React, { useCallback, useEffect } from "react";
import ProductsStatistic from "./ProductsStatistic";
import SalesStatistical from "./SalesStatistical";
import LatestOrder from "./LatestOrder";
import TopTotal from "./TopTotal";
import { useDispatch, useSelector } from "react-redux";
import { listAllProducts } from "../../../redux/admin/Actions/ProductActions";
const Main = () => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders, count } = orderList;

  const productsListAll = useSelector((state) => state.productsListAll);
  const { productsAll } = productsListAll;

  const dispatch = useDispatch();
  const fecth = useCallback(async () => {
    await dispatch(listAllProducts());
  }, [dispatch]);

  useEffect(() => {
    fecth();
  }, [fecth]);
  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">Dashboard</h2>
        </div>
        {/* Top total */}
        <TopTotal orders={orders} products={productsAll} count={count} />

        <div className="row">
          {/* STATICS */}
          <SalesStatistical />
          <ProductsStatistic />
        </div>

        {/* LATEST ORDER */}
        <div className="card mb-4 shadow-sm">
          <LatestOrder orders={orders} loading={loading} error={error} />
        </div>
      </section>
    </>
  );
};

export default Main;
