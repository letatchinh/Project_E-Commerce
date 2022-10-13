import React from "react";
import { useParams } from "react-router-dom";

import OrderMain from "./../../../components/admin/orders/OrderMain";
const OrderScreen = () => {
  const params = useParams();
  const keyword = params.keyword;
  const name = params.name;
  return (
    <>
      <OrderMain keyword={keyword} name={name} />
    </>
  );
};

export default OrderScreen;
