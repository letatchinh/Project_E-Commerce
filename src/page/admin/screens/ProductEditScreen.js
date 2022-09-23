import React, { useState } from "react";
import Header from "./../../../layout/admin/Header";
import Sidebar from "./../../../layout/admin/sidebar";
import EditProductMain from "./../../../components/admin/products/EditProductMain";
import products from "../../../data/Products";
import { useParams } from "react-router-dom";
const ProductEditScreen = ({ match }) => {
  const params = useParams();
  const productId = products.find((p) => p._id === params.id);
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
