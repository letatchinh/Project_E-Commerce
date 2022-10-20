import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listAllCategorys } from "../../../redux/admin/Actions/CategoryAction";
import { listReviews } from "../../../redux/admin/Actions/ReviewAction.js";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import StyledRating from "../../client/StyledRating.js";
import LoadingDashboard from "../LoadingError/LoadingDashboard";
const CommentsTables = () => {
  const dispatch = useDispatch();
  let id = 1;

  const reviewList = useSelector((state) => state.reviewList);
  const { loading, error, reviews } = reviewList;

  const fecth = useCallback(async () => {
    await dispatch(listReviews());
  }, [dispatch]);

  useEffect(() => {
    fecth();
  }, [fecth]);
  console.log(reviewList);
  return (
    <>
      <h2 className="p-2">Comment products</h2>

      <div className="col-md-12 col-lg-12 mt-3 mb-3 card">
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
                <th>Rating</th>
                <th>Comment</th>
              </tr>
            </thead>
            {/* Table Data */}
            <tbody>
              {/* Products */}
              {reviews &&
                reviews.map((e) => (
                  <tr key={id}>
                    <td>{id++}</td>
                    <td>
                      <b>{e.name}</b>
                    </td>
                    <td>
                      <StyledRating value={e.rating} />
                    </td>
                    <td>{e.comment}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default CommentsTables;
