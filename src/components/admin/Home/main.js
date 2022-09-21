import React from "react";
import ProductsStatistic from "./ProductsStatistic";
import SalesStatistical from "./SalesStatistical";
import LatestOrder from "./LatestOrder";
import TopTotal from "./TopTotal";
const Main = () => {
  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">Dashboard</h2>
        </div>
        {/* Top total */}
        <TopTotal />

        <div className="row">
          {/* STATICS */}
          <SalesStatistical />
          <ProductsStatistic />
        </div>

        {/* LATEST ORDER */}
        <div className="card mb-4 shadow-sm">
          <LatestOrder />
        </div>
      </section>
    </>
  );
};

export default Main;
