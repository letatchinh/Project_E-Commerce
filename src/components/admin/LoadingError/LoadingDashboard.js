import React from "react";

const LoadingDashboard = () => {
  return (
    <div className="d-flex justify-content-center">
      <div class="spinner-info">
        <div class="circle one"></div>
        <div class="circle two"></div>
        <div class="circle three"></div>
      </div>
    </div>
  );
};

LoadingDashboard.defaultProps = {
  variant: "alert-infoAdmin",
};
export default LoadingDashboard;
