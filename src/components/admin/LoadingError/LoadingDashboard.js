import React from "react";

const LoadingDashboard = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-info">
        <div className="circle one"></div>
        <div className="circle two"></div>
        <div className="circle three"></div>
      </div>
    </div>
  );
};

LoadingDashboard.defaultProps = {
  variant: "alert-infoAdmin",
};
export default LoadingDashboard;
