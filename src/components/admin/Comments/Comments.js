import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { listAllCategorys } from "../../../redux/admin/Actions/CategoryAction";
import {
  deleteReview,
  listReviews,
} from "../../../redux/admin/Actions/ReviewAction.js";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import StyledRating from "../../client/StyledRating.js";
import LoadingDashboard from "../LoadingError/LoadingDashboard";
import { toast, ToastContainer } from "react-toastify";
const CommentsTables = () => {
  const [keyword, setKeyword] = useState();
  const [sortRating, setSortRating] = useState();
  const dispatch = useDispatch();
  let id = 1;
  const params = useParams();
  let navigator = useNavigate();
  const pagenumber = params.pagenumber;
  const reviewList = useSelector((state) => state.reviewList);
  const { loading, error, reviews, page, pages } = reviewList;

  const reviewDelete = useSelector((state) => state.reviewDelete);
  const { error: errorDelete, success: successDelete } = reviewDelete;

  const fecth = useCallback(async () => {
    await dispatch(listReviews(keyword, pagenumber, sortRating));
  }, [dispatch, pagenumber, keyword, sortRating]);

  useEffect(() => {
    fecth();
  }, [fecth, reviewDelete]);
  const handlesortRating = (e) => {
    setSortRating(e.target.value);
    navigator(`/admin/productcomments/page/${page}/${e.target.value}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigator(`/admin/productcomments/search/${keyword}`);
    } else {
      navigator("/admin/productcomments");
    }
  };
  // console.log(reviewList);
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ?")) {
      dispatch(deleteReview(id));
      toast("Delete success");
    }
    // navigator(-1);
  };
  return (
    <>
      <ToastContainer />
      <h2 className="p-2">Comment products</h2>

      <div className="col-md-12 col-lg-12 mt-3 mb-3 card">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <form
              className="col-lg-4 col-md-6 me-auto d-flex"
              onSubmit={submitHandler}
            >
              <input
                type="search"
                placeholder="Search..."
                className="form-control p-2"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </form>
            {/* <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select" onChange={handlesortCategory}>
                <option value="">All category</option>
                {categorys &&
                  categorys.map((cate) => (
                    <option key={cate._id} value={cate.name}>
                      {cate.name}
                    </option>
                  ))}
              </select>
            </div> */}

            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select" onChange={handlesortRating}>
                <option value="">All rating</option>
                <option value="-1">High to Low</option>
                <option value="1">Low to High</option>
              </select>
            </div>
          </div>
        </header>
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
                <th>Product</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Action</th>
              </tr>
            </thead>
            {/* Table Data */}
            <tbody>
              {/* Products */}
              {reviews.reviews &&
                reviews.reviews.map((e) => (
                  <tr key={id}>
                    <td>{id++}</td>
                    <td>
                      <b>{e.name}</b>
                    </td>
                    <td>
                      <div class="itemside">
                        <div class="left">
                          <img
                            src={`/images/${e.product.images[0]}`}
                            alt={e.product.name}
                            className="img-xs"
                            style={{ width: "40px", height: "40px" }}
                          />
                        </div>
                        <div class="info">{e.product.name}</div>
                      </div>
                    </td>
                    <td>
                      <StyledRating value={e.rating} />
                    </td>
                    <td>{e.comment}</td>
                    <td>
                      <Link
                        to="#"
                        onClick={() => deleteHandler(e._id)}
                        className="text-danger"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
        {pages > 1 && (
          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              {page === 1 ? (
                <li disabled className="page-item disabled">
                  <Link
                    className="page-link"
                    to={`/admin/productcomments/page/${page && page - 1}`}
                  >
                    Previous
                  </Link>
                </li>
              ) : (
                <li disabled className="page-item">
                  <Link
                    className="page-link"
                    to={`/admin/productcomments/page/${page && page - 1}`}
                  >
                    Previous
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
                    Next
                  </Link>
                </li>
              ) : (
                <li disabled className="page-item">
                  <Link
                    className="page-link"
                    to={`/admin/productcomments/page/${page && page + 1}`}
                  >
                    Next
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </>
  );
};

export default CommentsTables;
