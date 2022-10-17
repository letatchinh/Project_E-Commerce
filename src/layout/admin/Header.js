import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/admin/Actions/UserActions";
import { listOrders } from "../../redux/admin/Actions/OrderActions";

const Header = (props) => {
  const dispatch = useDispatch();

  const {
    handleClickMenu,
    isDisplay,
    handleDisplay,
    isClickMobile,
    isColor,
    handleColor,
  } = props;
  const orderList = useSelector((state) => state.orderList);
  const { orders } = orderList;
  const fetch = useCallback(async () => {
    await dispatch(listOrders());
  }, [dispatch]);
  useEffect(() => {
    fetch();
    // setarrProduct(arrProduct);
  }, [fetch]);
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
    // console.log(dispatch(logout));
  };
  // handleDisplay = (e) => {
  //   isClickMobile = false;
  // };

  return (
    <header
      className="main-header navbar"
      style={{ background: isColor ? "#000" : "#fff" }}
    >
      <div className="col-search"></div>

      <div className="col-nav">
        <button
          className="btn btn-icon btn-mobile me-auto"
          data-trigger="#offcanvas_aside"
          onClick={() => handleClickMenu()}
        >
          <i className="md-28 fas fa-bars"></i>
        </button>
        <ul className="nav">
          <li className="nav-item">
            <Link
              className={`nav-link btn-icon`}
              title="Dark mode"
              to="#"
              onClick={() => handleColor()}
            >
              <i className="fas fa-moon"></i>
            </Link>
          </li>
          <li className="nav-item btn-notice">
            <Link className="nav-link btn-icon" to="/admin/orders">
              <i className="fas fa-bell"></i>
              <span className="btn-notice-number">
                {orders && orders.length}
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">
              English
            </Link>
          </li>
          <li
            className="dropdown nav-item"
            onClick={() => {
              handleDisplay();
            }}
          >
            <Link className="dropdown-toggle" data-bs-toggle="dropdown" to="#">
              <img
                className="img-xs rounded-circle"
                src="/images/favicon.png"
                alt="User"
              />
            </Link>
            <div className={isDisplay ? "drop-active" : ""}>
              <div className="dropdown-menu dropdown-menu-end">
                <Link className="dropdown-item" to="/admin/">
                  My profile
                </Link>
                {/*  <Link className="dropdown-item" to="#">
                  Settings
                </Link> */}
                <Link
                  onClick={logoutHandler}
                  className="dropdown-item text-danger"
                  to="#"
                >
                  Exit
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
