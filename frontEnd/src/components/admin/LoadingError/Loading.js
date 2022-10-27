import React from "react";

const Loading = () => {
  return (
    <div className="d-flex justify-content-center">
      <div
        className="spinner-border text-success"
        role="status"
        style={{ width: "50px", height: "50pxs" }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

Loading.defaultProps = {
  variant: "alert-info",
};
export default Loading;
