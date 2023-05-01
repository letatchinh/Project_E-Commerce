import React from "react";

const SalesStatistical = () => {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Thống kê doanh thu bán được</h5>
          <iframe
            title="chart-sale"
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
              width: "100%",
              height: "350px",
            }}
            src="https://charts.mongodb.com/charts-clotheshop-isudy/embed/charts?id=633f90fa-ed2a-4c99-8f5e-c98f4d6e3544&maxDataAge=10&theme=light&autoRefresh=true"
          ></iframe>
        </article>
      </div>
    </div>
  );
};

export default SalesStatistical;
