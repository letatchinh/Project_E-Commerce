import React from "react";

const ProductsStatistic = () => {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Products statistics</h5>
          {/* <iframe
            title="chart-product"
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
              width: "100%",
              height: "350px",
            }}
            src="https://charts.mongodb.com/charts-clotheshop-isudy/embed/charts?id=633fb952-bcee-48ec-8a98-8cbbfdcad525&maxDataAge=3600&theme=light&autoRefresh=true"
          /> */}
          <iframe
            title="chart-product"
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              boxShadow: " 0 2px 10px 0 rgba(70, 76, 79, .2)",
              width: "100%",
              height: "350px",
            }}
            src="https://charts.mongodb.com/charts-clotheshop-isudy/embed/charts?id=633fb952-bcee-48ec-8a98-8cbbfdcad525&maxDataAge=300&theme=light&autoRefresh=true"
          />
        </article>
      </div>
    </div>
  );
};

export default ProductsStatistic;
