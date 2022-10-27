import React from "react";
import { useParams } from "react-router-dom";

import MainProducts from "./../../../components/admin/products/MainProducts";

const ProductScreen = () => {
  const params = useParams();
  const keyword = params.keyword;
  const keywordCategory = params.keywordCategory;
  return (
    <>
      <MainProducts keyword={keyword} keywordCategory={keywordCategory} />
    </>
  );
};

export default ProductScreen;
