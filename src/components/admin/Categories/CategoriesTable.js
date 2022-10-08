import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listProducts } from "../../../redux/admin/Actions/ProductActions";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import LoadingDashboard from "../LoadingError/LoadingDashboard";
const CategoriesTable = () => {
  const dispatch = useDispatch();
  let id = 1;

  let counter = 0;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const fecth = useCallback(async () => {
    await dispatch(listProducts());
  }, [dispatch]);

  useEffect(() => {
    fecth();
  }, [fecth]);

  // console.log(products);
  const category = [
    {
      name: "trousers",
      num: 0,
    },
    {
      name: "hat",
      num: 0,
    },
    {
      name: "shirt",
      num: 0,
    },
    {
      name: "shoe",
      num: 0,
    },
  ];
  const newCate = category.map((el) => {
    const newNum = products.filter((e) => e.category === el.name).length;
    return { ...el, num: newNum };
  });

  return (
    <>
      <div className="col-md-12 col-lg-12">
        {loading ? (
          <LoadingDashboard />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            {/* Table Data */}
            <tbody>
              {/* Products */}
              {newCate.map((cate) => (
                <tr key={id}>
                  <td>{id++}</td>
                  <td>
                    <b>{cate.name}</b>
                  </td>
                  <td>{cate.num} products</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default CategoriesTable;
