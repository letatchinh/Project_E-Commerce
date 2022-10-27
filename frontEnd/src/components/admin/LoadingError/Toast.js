import React from "react";
import { ToastContainer } from "react-toastify";
const Toasts = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />

      {/* Same as */}
      <ToastContainer />
    </div>
  );
};

export default Toasts;
