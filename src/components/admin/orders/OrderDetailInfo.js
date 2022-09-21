import React from "react";

const OrderDetailInfo = () => {
  return (
    <div className="row mb-5 order-info-wrap">
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-user"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Cusomer</h6>
            <p className="mb-1">
              User Adam <br />
              <a href={`mailto:user@example.com`}>user@example.com</a>
            </p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-truck-moving"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Order info</h6>
            <p className="mb-1">
              Shipping: Tanza <br /> Pay method: PayPal
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default OrderDetailInfo;
