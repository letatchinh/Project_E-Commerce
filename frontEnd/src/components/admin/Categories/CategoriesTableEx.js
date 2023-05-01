import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listAllCategorys } from "../../../redux/admin/Actions/CategoryAction";
import Message from "../LoadingError/Error";
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
      <div className="col-md-12 col-lg-8">
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <LoadingDashboard />}
        <div
          style={{
            maxHeight: "135px",
            overflow: "auto",
            display: "inline-block",
            width: "100%",
          }}
          className="wrapper-table"
        >
          <table className="table">
            <thead>
              <tr>
                <th>Stt</th>
                <th>Tên</th>
                <th>Chỉnh sửa</th>
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
                        className="text-success"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CategoriesTableEx;
