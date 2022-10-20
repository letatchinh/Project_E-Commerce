import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listAllCategorys } from "../../../redux/admin/Actions/CategoryAction";
import {
  listAllProducts,
  listProducts,
} from "../../../redux/admin/Actions/ProductActions";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import LoadingDashboard from "../LoadingError/LoadingDashboard";
const CategoriesTableEx = () => {
  let id = 0;
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { loading, error, categorys } = categoryList;
  const fecth = useCallback(async () => {
    await dispatch(listAllCategorys());
  }, [dispatch]);

  useEffect(() => {
    fecth();
  }, [fecth, categoryCreate]);
  return (
    <>
      <div className="col-md-12 col-lg-12">
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <LoadingDashboard />}
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          {/* Table Data */}
          <tbody>
            {/* Products */}
            {categorys &&
              categorys.map((cate) => (
                <tr key={id}>
                  <td>{id++}</td>
                  <td style={{ width: "20%" }}>
                    <b>{cate.name}</b>
                  </td>
                  <td>
                    <Link
                      to={`/admin/category/${cate._id}/edit`}
                      className="btn btn-sm btn-outline-success p-2 pb-3 col-md-3"
                    >
                      <i className="fas fa-pen"></i>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CategoriesTableEx;
