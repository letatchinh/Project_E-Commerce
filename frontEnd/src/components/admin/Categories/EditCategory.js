import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  editCategory,
  updateCategory,
} from "../../../redux/admin/Actions/CategoryAction";

import Message from "../LoadingError/Error";
import LoadingDashboard from "../LoadingError/LoadingDashboard";
const EditCategory = (props) => {
  const params = useParams();
  const categoryId = params.id;
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const categoryEdit = useSelector((state) => state.categoryEdit);
  const { loading, error, category } = categoryEdit;

  const categoryList = useSelector((state) => state.categoryList);
  const { categorys } = categoryList;

  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const { loading: loadingUpdate, error: errorUpdate } = categoryUpdate;

  //   console.log(dispatch(editCategory(categoryId)));
  const fetch = useCallback(async () => {
    if (!category.name || category._id !== categoryId) {
      dispatch(editCategory(categoryId));
    } else {
      setName(category.name);
    }
  }, [category, dispatch, categoryId]);
  useEffect(() => {
    fetch();
  }, [fetch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCategory({
        _id: categoryId,
        name,
      })
    );
    if (category.name !== name && !categorys.includes(category.name)) {
      toast.success("Chỉnh sửa thành công");
    }
  };
  return (
    <>
      <ToastContainer />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="pcShow">
            <div className="content-header">
              <Link to={-1} className="btn btn-danger text-white">
                Trở về danh sách loại
              </Link>
              <h2 className="content-title">Cập nhật loại</h2>
              <div>
                <button type="submit" className="btn btn-primary">
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
          <div className="spShow">
            <div className="content-header">
              <div className="btn-box">
                <Link
                  to="/admin/categorys"
                  className="btn btn-danger text-white"
                >
                  Trở về danh sách loại
                </Link>
                <div>
                  <button type="submit" className="btn btn-primary">
                    Cập nhật
                  </button>
                </div>
              </div>
              <h2 className="content-title">Update Category</h2>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loadingUpdate && <LoadingDashboard />}
                  {loading ? (
                    <LoadingDashboard />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="Category_Name" className="form-label">
                          Tên
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="Category_Name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditCategory;
