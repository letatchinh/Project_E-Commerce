import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { listUser } from "../../../redux/admin/Actions/UserActions.js";
import Message from "../LoadingError/Error.js";
// import Loading from "../LoadingError/Loading.js";
import LoadingDashboard from "../LoadingError/LoadingDashboard.js";
import ReactTooltip from "react-tooltip";
const UserComponent = () => {
  const [keyword, setKeyword] = useState();

  const params = useParams();
  const pagenumber = params.pagenumber;
  const dispatch = useDispatch();
  let navigator = useNavigate();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users, page, pages } = userList;

  useEffect(() => {
    dispatch(listUser(keyword, pagenumber));
  }, [dispatch, keyword, pagenumber]);
  // console.log(users);
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigator(`/admin/users/search/${keyword}`);
    } else {
      navigator("/admin/users");
    }
  };

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
              <select className="form-select">
                <option>Status: all</option>
                <option>Active only</option>
                <option>Disabled</option>
              </select>
            </div>
          </div>
        </header>

        {/* Card */}
        <div className="card-body">
          {loading ? (
            <LoadingDashboard />
          ) : error ? (
            <Message variant={"alert-danger"}>{error}</Message>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
              {users.users &&
                users.users.map((user) => (
                  <div className="col" key={user._id}>
                    <div className="card card-user shadow-sm">
                      <div className="card-header">
                        <img
                          className="img-md img-avatar"
                          src="../../../images/favicon.png"
                          alt="User pic"
                        />
                      </div>

                      <div className="card-body">
                        <div
                          style={{ transform: "translate3d(5px, 5px, 5px)" }}
                        >
                          <h5
                            data-tip
                            data-for={user.name}
                            className="card-title mt-5 block-ellipsis"
                          >
                            {user.name}
                          </h5>
                          <ReactTooltip id={user.name} type="success">
                            <span>{user.name}</span>
                          </ReactTooltip>
                        </div>
                        <div className="card-text text-muted">
                          {user.isAdmin === true ? (
                            <p className="m-0">Admin</p>
                          ) : (
                            <p className="m-0">Customer</p>
                          )}

                          <div
                            style={{
                              transform: "translate3d(5px, 5px, 5px)",
                            }}
                          >
                            <p
                              data-tip
                              data-for={user.email}
                              className="card-title mt-0 block-ellipsis"
                            >
                              <a href={`mailto:${user.email}`}>{user.email}</a>
                            </p>
                            <ReactTooltip id={user.email} type="success">
                              <span> {user.email}</span>
                            </ReactTooltip>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
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
      </div>
    </section>
  );
};

export default UserComponent;
