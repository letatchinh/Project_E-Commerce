import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAllCategorys } from "../../../redux/admin/Actions/CategoryAction";
import { listAllProducts } from "../../../redux/admin/Actions/ProductActions";
import Message from "../LoadingError/Error";
import LoadingDashboard from "../LoadingError/LoadingDashboard";
const CategoriesTable = () => {
  const dispatch = useDispatch();
  let id = 1;

  const productsListAll = useSelector((state) => state.productsListAll);
  const { loading, error, productsAll } = productsListAll;

  const categoryList = useSelector((state) => state.categoryList);
  const { categorys } = categoryList;

  const fecth = useCallback(async () => {
    await dispatch(listAllProducts());
    await dispatch(listAllCategorys());
  }, [dispatch]);

  useEffect(() => {
    fecth();
  }, [fecth]);

  const category = [];
  for (var i = 0; i < categorys.length; i++) {
    category.push({ name: categorys[i].name, num: 0 });
  }

  const newCate =
    category &&
    category.map((el) => {
      const newNum =
        (!productsAll.products &&
          productsAll.filter((e) => e.category === el.name).length) ||
        (productsAll.product &&
          productsAll.products.filter((e) => e.category === el.name).length);

      return { ...el, num: newNum };
    });
  return (
    <>
      <div className="col-md-12 col-lg-12 mt-3 mb-3">
        <h2>Tổng số lượng sản phẩm của từng loại</h2>
        {loading ? (
          <LoadingDashboard />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Stt</th>
                <th>Tên</th>
                <th>Mô tả</th>
              </tr>
            </thead>
            {/* Table Data */}
            <tbody>
              {/* Products */}
              {newCate &&
                newCate?.map((cate) => (
                  <tr key={id}>
                    <td>{id++}</td>
                    <td>
                      <b>{cate.name}</b>
                    </td>
                    <td>{cate.num ? cate.num + " sản phẩm" : "0 sản phẩm"}</td>
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
