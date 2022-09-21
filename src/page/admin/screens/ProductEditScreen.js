import React, { useState } from "react";
import Header from "./../../../layout/admin/Header";
import Sidebar from "./../../../layout/admin/sidebar";
import EditProductMain from "./../../../components/admin/products/EditProductMain";
import products from "../../../data/Products";
const ProductEditScreen = ({ match }) => {
  const productId = products.find((p) => p._id === match.params.id);
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
        <EditProductMain productId={productId} />
      </main>
    </>
  );
};

export default ProductEditScreen;
