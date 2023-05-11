import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  activeReivew,
  disabledReivew,
  listReviews,
} from "../../../redux/admin/Actions/ReviewAction.js";
import Message from "../LoadingError/Error";
import StyledRating from "../../client/StyledRating.js";
import LoadingDashboard from "../LoadingError/LoadingDashboard";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";
const CommentsTables = () => {
  const params = useParams();
  let navigator = useNavigate();
  const [keyword, setKeyword] = useState();
  const [activeComment, setActiveComment] = useState();
  const [sortRating, setSortRating] = useState();
  const dispatch = useDispatch();
  let id = 1;

  const pagenumber = params.pagenumber;

  const reviewList = useSelector((state) => state.reviewList);
  const { loading, error, reviews, page, pages, count } = reviewList;
  const reviewDisabled = useSelector((state) => state.reviewDisabled);

  const reviewActive = useSelector((state) => state.reviewActive);

  const fecth = useCallback(async () => {
    await dispatch(listReviews(keyword, pagenumber, sortRating, activeComment));
  }, [dispatch, pagenumber, keyword, sortRating, activeComment]);

  useEffect(() => {
    fecth();
  }, [fecth, reviewDisabled, reviewActive]);
  const handlesortRating = (e) => {
    setSortRating(e.target.value);
    navigator(`/admin/productcomments/page/${page}/${e.target.value}`);
  };
  const handleActive = (e) => {
    if (e.target.value === "") {
      setActiveComment(e.target.value);
      navigator(`/admin/productcomments/`);
    } else {
      setActiveComment(e.target.value);
      navigator(`/admin/productcomments/active/${e.target.value}`);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigator(`/admin/productcomments/search/${keyword}`);
    } else {
      navigator("/admin/productcomments");
    }
  };
  const handelDisabled = (id) => {
    dispatch(disabledReivew(id));
    toast("Ngừng hoạt động thành công");
  };
  const handelActive = (id) => {
    dispatch(activeReivew(id));
    toast("Ngừng hoạt động thất bại");
  };

  return (
    <>
      <ToastContainer />
      <h2 className="p-2">Bình luận danh sách sản phẩm</h2>

      <div className="col-md-12 col-lg-12 mt-3 mb-3 card">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <form
              className="col-lg-4 col-md-6 me-auto d-flex"
              onSubmit={submitHandler}
            >
              <input
                type="search"
                placeholder="Tìm kiếm..."
                className="form-control p-2"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </form>

            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select" onChange={handlesortRating}>
                <option value="">Tất cả đánh giá</option>
                <option value="-1">Giảm dần</option>
                <option value="1">Tăng dần</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select" onChange={handleActive}>
                <option value="">Tất cả trạng thái</option>
                <option value={true}>Hoạt động</option>
                <option value={false}>ngừng hoạt động</option>
              </select>
            </div>
          </div>
        </header>
        {loading ? (
          <LoadingDashboard />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Stt</th>
                  <th>Tên</th>
                  <th>Sản phẩm</th>
                  <th>Đánh giá</th>
                  <th>Bình luận</th>
                  <th>Ngày tạo</th>
                  {/* <th>Trạng thái</th>
                  <th>Hành động</th> */}
                </tr>
              </thead>
              {/* Table Data */}
              <tbody>
                {/* Products */}
                {reviews.reviews && count > 0 ? (
                  reviews.reviews.map((e) => (
                    <tr
                      key={id}
                      style={{
                        background: e.active ? "" : "rgba(108, 117, 125, 0.25)",
                      }}
                    >
                      <td>{id++}</td>
                      <td>
                        <b>{e.name}</b>
                      </td>
                      <td>
                        {e.product && (
                          <div class="itemside">
                            <div class="left">
                              <img
                                src={
                                  `/images/${e.product.images[0]}` ||
                                  `/images/img01.png}`
                                }
                                alt={e.product.name}
                                className="img-xs"
                                style={{ width: "40px", height: "40px" }}
                              />
                            </div>
                            <div class="info">{e.product.name}</div>
                          </div>
                        )}
                      </td>
                      <td>
                        <StyledRating value={e.rating} readOnly />
                      </td>
                      <td>{e.comment}</td>
                      <td> {moment(e.createdAt).format("llll")}</td>
                      {/* <td>
                        <span
                          className={
                            e.active ? "badge btn-primary" : "badge btn-dark"
                          }
                        >
                          {e.active ? "hoạt động" : "Không hoạt động"}
                        </span>{" "}
                      </td> */}
                      {/* <td>
                        {e.active ? (
                          <Link
                            to={`/admin/productcomments/${e._id}/disabled`}
                            onClick={() => handelDisabled(e._id)}
                          >
                            <span className="btn  btn-secondary">Không hoạt động</span>
                          </Link>
                        ) : (
                          <Link
                            to={`/admin/productcomments/${e._id}/active`}
                            onClick={() => handelActive(e._id)}
                          >
                            <span className="btn btn-success">Hoạt động</span>
                          </Link>
                        )}
                      </td> */}
                    </tr>
                  ))
                ) : (
                  <div className="p-2">Không bình luận</div>
                )}
              </tbody>
            </table>
          </div>
        )}
        {/* {pages > 1 && (
          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              {page === 1 ? (
                <li disabled className="page-item disabled">
                  <Link
                    className="page-link"
                    to={`/admin/productcomments/page/${page && page - 1}`}
                  >
                    Trước
                  </Link>
                </li>
              ) : (
                <li disabled className="page-item">
                  <Link
                    className="page-link"
                    to={`/admin/productcomments/page/${page && page - 1}`}
                  >
                    Trước
                  </Link>
                </li>
              )}

              {[...Array(pages).keys()].map((x) => (
                <li
                  className={`page-item ${x + 1 === page ? "active" : ""}`}
                  key={x + 1}
                >
                  <Link
                    className="page-link"
                    to={
                      keyword
                        ? `/admin/productcomments/search/${keyword}/page/${
                            x + 1
                          }`
                        : `/admin/productcomments/page/${x + 1}`
                    }
                  >
                    {x + 1}
                  </Link>
                </li>
              ))}
              {page === pages ? (
                <li disabled className="page-item disabled">
                  <Link
                    className="page-link"
                    to={`/admin/productcomments/page/${page && page - 1}`}
                  >
                    Sau
                  </Link>
                </li>
              ) : (
                <li disabled className="page-item">
                  <Link
                    className="page-link"
                    to={`/admin/productcomments/page/${page && page + 1}`}
                  >
                    Sau
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )} */}
      </div>
    </>
  );
};

export default CommentsTables;
