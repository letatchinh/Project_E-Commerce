import React, { useCallback, useEffect, useState } from "react";
import EditProductMain from "./../../../components/admin/products/EditProductMain";
import { useParams } from "react-router-dom";
// import axios from "axios";
const ProductEditScreen = ({ match }) => {
  // let params = useParams();
  // const [products, setProducts] = useState([]);
  // // console.log("a");
  // const fetchproducts = useCallback(async () => {
  //   const data = await axios.get(`/api/products/${params.id}`);
  //   setProducts(data.data);
  // }, []);
  // useEffect(() => {
  //   fetchproducts();
  // }, [fetchproducts]);
  let params = useParams();
  const productId = params.id;

  return (
    <>
      <EditProductMain productId={productId} />
    </>
  );
};

export default ProductEditScreen;
