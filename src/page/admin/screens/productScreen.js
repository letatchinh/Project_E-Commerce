import React from "react";
import { useParams } from "react-router-dom";

import MainProducts from "./../../../components/admin/products/MainProducts";

const ProductScreen = () => {
  const params = useParams();
  const keyword = params.keyword;
  // console.log(keyword);
  return (
    <>
      <MainProducts keyword={keyword} />
    </>
  );
};

export default ProductScreen;
