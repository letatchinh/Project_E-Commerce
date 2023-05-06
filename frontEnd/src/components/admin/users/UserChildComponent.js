import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  userActiveaction,
  userDisabledaction,
} from "../../../redux/admin/Actions/UserActions.js";
// import Loading from "../LoadingError/Loading.js";
import ReactTooltip from "react-tooltip";
import PersonIcon from "@mui/icons-material/Person";
import { toast, ToastContainer } from "react-toastify";
const UserChildComponent = (props) => {
  const dispatch = useDispatch();
  const { users, actives } = props;

  const userDisabled = useSelector((state) => state.userDisabled);
  const { loadings, updateUser } = userDisabled;

  const userOpenActive = useSelector((state) => state.userOpenActive);
  const { updateActiveUser } = userOpenActive;

  const fetch = useCallback(() => {
    if (updateUser) {
      dispatch(userDisabledaction(updateUser));
    }
    if (updateActiveUser) {
      dispatch(userActiveaction(updateActiveUser));
    }
  }, [dispatch, updateUser, updateActiveUser]);
  useEffect(() => {
    fetch();
  }, [fetch]);
  const handleDisalbed = (updateUser) => {
    toast("Ngừng hoạt động thành công");
    dispatch(userDisabledaction(updateUser));
    navigator(-1);
  };
  const handleActive = (updateActiveUser) => {
    toast("Kích hoạt thành công");
    dispatch(userActiveaction(updateActiveUser));
    navigator(-1);
  };
  console.log(users);
  return (
    <>
      <ToastContainer />
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
        {actives &&
          users.map((user) => (
            <div className="col" key={user._id}>
              <div
                className={
                  user.active
                    ? "card card-user shadow-sm"
                    : "card card-user shadow-sm user-disable"
                }
              >
                <div className="card-header">
                  {user.active ? (
                    <img
                      className="img-md img-avatar"
                      src={`../../../images/${
                        user.avatar === "" ? "favicon.png" : user.avatar
                      }`}
                      alt="User pic"
                    />
                  ) : (
                    <PersonIcon
                      className="img-md img-avatar"
                      style={{ background: "#fff" }}
                    />
                  )}
                </div>

                <div className="card-body">
                  <div style={{ transform: "translate3d(5px, 5px, 5px)" }}>
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
                  {user.isAdmin ? (
                    <div style={{ height: "36px" }}></div>
                  ) : (
                    <div
                      className={
                        user.active
                          ? "user-active user-btn"
                          : "user-disabled user-btn"
                      }
                    >
                      <Link
                        to={`/admin/users/${user._id}/disabled`}
                        onClick={() => handleDisalbed(user)}
                      >
                        {user.active ? "Không hoạt động" : ""}
                      </Link>
                    </div>
                  )}
                  {user.active ? (
                    <></>
                  ) : (
                    <>
                      <Link
                        to={`/admin/users/${user._id}/active`}
                        onClick={() => handleActive(user)}
                        className="open-active"
                      >
                        <span>Hoạt động</span>
                      </Link>
                      <Link
                        to={`/admin/users/${user._id}/sendMail`}
                        className="icon-mail"
                      >
                        <i className="fa fa-envelope"></i>
                        <span>Gửi email</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        {users.users &&
          users.users.map((user) => (
            <div className="col" key={user._id}>
              <div
                className={
                  user.active
                    ? "card card-user shadow-sm"
                    : "card card-user shadow-sm user-disable"
                }
              >
                <div className="card-header">
                  {user.active ? (
                    <img
                      className="img-md img-avatar"
                      src={`../../../images/${
                        user.avatar === "" ? "favicon.png" : user.avatar
                      }`}
                      alt="User pic"
                    />
                  ) : (
                    <PersonIcon
                      className="img-md img-avatar"
                      style={{ background: "#fff" }}
                    />
                  )}
                </div>

                <div className="card-body">
                  <div style={{ transform: "translate3d(5px, 5px, 5px)" }}>
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
                  {user.isAdmin ? (
                    <div></div>
                  ) : (
                    <div
                      className={
                        user.active
                          ? "user-active user-btn"
                          : "user-disabled user-btn"
                      }
                    >
                      <Link
                        to={`/admin/users/${user._id}/disabled`}
                        onClick={() => handleDisalbed(user)}
                      >
                        {user.active ? "Không hoạt động" : ""}
                      </Link>
                    </div>
                  )}
                  {user.active ? (
                    <></>
                  ) : (
                    <>
                      <Link
                        to={`/admin/users/${user._id}/active`}
                        onClick={() => handleActive(user)}
                        className="open-active"
                      >
                        <span>Active</span>
                      </Link>
                      <Link
                        to={`/admin/users/${user._id}/sendMail`}
                        className="icon-mail"
                      >
                        <i className="fa fa-envelope"></i>
                        <span>Send Mail</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default UserChildComponent;
