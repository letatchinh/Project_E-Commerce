import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  listUser,
  userDisabledaction,
} from "../../../redux/admin/Actions/UserActions.js";
// import Loading from "../LoadingError/Loading.js";
import LoadingDashboard from "../LoadingError/LoadingDashboard.js";
import ReactTooltip from "react-tooltip";
import { ContactUs } from "./contactEmail/ContactUs.js";
import PersonIcon from "@mui/icons-material/Person";
const UserChildComponent = (props) => {
  const dispatch = useDispatch();
  const { users } = props;

  const userDisabled = useSelector((state) => state.userDisabled);
  const { loadings, updateUser } = userDisabled;
  const fetch = useCallback(() => {
    if (updateUser) {
      dispatch(userDisabledaction(updateUser));
    }
  }, [dispatch, updateUser, users]);
  useEffect(() => {
    fetch();
  }, [fetch]);
  const handleDisalbed = (updateUser) => {
    if (updateUser) {
      dispatch(userDisabledaction(updateUser));
      navigator("/admin/users/");
    }
  };
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
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
                {user.avatar === "" ? (
                  <img
                    className="img-md img-avatar"
                    src={`../../../images/img01.png`}
                    alt="User pic"
                  />
                ) : user.avatar !== "" && user.active ? (
                  <img
                    className="img-md img-avatar"
                    src={`../../../images/${user.avatar}`}
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
                ) : loadings ? (
                  <LoadingDashboard />
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
                      {user.active ? "Disabled" : ""}
                    </Link>
                  </div>
                )}
                {user.active ? (
                  <></>
                ) : (
                  <Link
                    to={`/admin/users/${user._id}/sendMail`}
                    className="icon-mail"
                  >
                    <i className="fa fa-envelope">
                      <span>sendMail</span>
                    </i>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserChildComponent;
