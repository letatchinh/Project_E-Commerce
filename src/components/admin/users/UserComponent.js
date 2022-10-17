import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  listOrdersPaidS,
  listUser,
  userActiveaction,
  userDisabled,
  userDisabledaction,
} from "../../../redux/admin/Actions/UserActions.js";
import Message from "../LoadingError/Error.js";
// import Loading from "../LoadingError/Loading.js";
import LoadingDashboard from "../LoadingError/LoadingDashboard.js";
import ReactTooltip from "react-tooltip";
import PersonIcon from "@mui/icons-material/Person";
import UserChildComponent from "./UserChildComponent.js";
const UserComponent = () => {
  const [keyword, setKeyword] = useState();

  const params = useParams();
  const pagenumber = params.pagenumber;
  const dispatch = useDispatch();
  let navigator = useNavigate();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users, page, pages } = userList;

  const userDisabled = useSelector((state) => state.userDisabled);
  const { updateUser } = userDisabled;

  const userOpenActive = useSelector((state) => state.userOpenActive);
  const { updateActiveUser } = userOpenActive;

  const userActive = useSelector((state) => state.userActive);
  const { loadingActive, errorActive, userListActive } = userActive;

  const [actives, setActives] = useState();
  const fetch = useCallback(async () => {
    await dispatch(listUser(keyword, pagenumber));
    await dispatch(userDisabledaction(updateUser));
    await dispatch(userActiveaction(updateActiveUser));
    await dispatch(listOrdersPaidS(actives));
  }, [dispatch, keyword, pagenumber, updateUser, actives, updateActiveUser]);
  useEffect(() => {
    fetch();
  }, [fetch]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigator(`/admin/users/search/${keyword}`);
    } else {
      navigator("/admin/users");
    }
  };

  // console.log(userListActive);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Customer</h2>
      </div>
      <div className="card mb-4">
        <header className="card-header">
          <div className="row gx-3">
            <form
              className="col-lg-4 col-md-6 me-auto"
              onSubmit={submitHandler}
            >
              <input
                type="text"
                placeholder="Search..."
                className="form-control"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </form>
            <div className="col-lg-2 col-6 col-md-3">
              <select
                className="form-select"
                onChange={(e) => setActives(e.target.value)}
              >
                <option value="">Status: all</option>
                <option value="true">Active only</option>
                <option value="false">Disabled</option>
              </select>
            </div>
          </div>
        </header>

        {/* Card */}

        {!actives && (
          <div className="card-body">
            {loading ? (
              <LoadingDashboard />
            ) : error ? (
              <Message variant={"alert-danger"}>{error}</Message>
            ) : (
              <UserChildComponent users={users} />
            )}

            {/* nav */}
            {pages > 1 && (
              <nav className="float-end mt-4" aria-label="Page navigation">
                <ul className="pagination">
                  {page === 1 ? (
                    <li disabled className="page-item disabled">
                      <Link
                        className="page-link"
                        to={`/admin/users/page/${page && page - 1}`}
                      >
                        Previous
                      </Link>
                    </li>
                  ) : (
                    <li disabled className="page-item">
                      <Link
                        className="page-link"
                        to={`/admin/users/page/${page && page - 1}`}
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
                            ? `/admin/users/search/${keyword}/page/${x + 1}`
                            : `/admin/users/page/${x + 1}`
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
                        to={`/admin/users/page/${page && page - 1}`}
                      >
                        Next
                      </Link>
                    </li>
                  ) : (
                    <li disabled className="page-item">
                      <Link
                        className="page-link"
                        to={`/admin/users/page/${page && page + 1}`}
                      >
                        Next
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            )}
          </div>
        )}
        {actives && (
          <div className="card-body">
            {loadingActive ? (
              <LoadingDashboard />
            ) : (
              <UserChildComponent users={userListActive} actives={actives} />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default UserComponent;
