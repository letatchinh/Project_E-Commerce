import React from "react";
import EditProductMain from "./../../../components/admin/products/EditProductMain";
import { useParams } from "react-router-dom";
const ProductEditScreen = ({ match }) => {
  let params = useParams();
  const productId = params.id;

  return (
    <>
      <EditProductMain productId={productId} />
    </>
  );
};

export default ProductEditScreen;
