import React, { useState } from "react";
import Header from "./../../../layout/admin/Header";
import Sidebar from "./../../../layout/admin/sidebar";
import MainProducts from "./../../../components/admin/products/MainProducts";

const ProductScreen = () => {
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
        <MainProducts />
      </main>
    </>
  );
};

export default ProductScreen;
