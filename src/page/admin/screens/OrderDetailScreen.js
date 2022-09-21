import React, { useState } from "react";
import Header from "./../../../layout/admin/Header";
import Sidebar from "./../../../layout/admin/sidebar";
import OrderDetailmain from "./../../../components/admin/orders/OrderDetailmain";
const OrderDetailScreen = () => {
  const [isClick, setClick] = useState(false);
  const [isDisplay, setDisplay] = useState(false);
  const handleClickMenu = (e) => {
    setClick(!isClick);
  };
  const handleDisplay = (e) => {
    setDisplay(!isDisplay);
  };
  return (
    <>
      <Sidebar click={isClick} handleClickMenu={handleClickMenu} />
      <main className="main-wrap">
        <Header
          handleClickMenu={handleClickMenu}
          isDisplay={isDisplay}
          handleDisplay={handleDisplay}
        />
        <OrderDetailmain />
      </main>
    </>
  );
};

export default OrderDetailScreen;
