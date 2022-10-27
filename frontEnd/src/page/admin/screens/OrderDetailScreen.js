import React from "react";
import { useParams } from "react-router-dom";

import OrderDetailmain from "./../../../components/admin/orders/OrderDetailmain";
const OrderDetailScreen = () => {
  const param = useParams();

  const orderId = param.id;
  return (
    <>
      <OrderDetailmain orderId={orderId} />
    </>
  );
};

export default OrderDetailScreen;
