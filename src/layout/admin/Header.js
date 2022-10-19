import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector, useStore } from "react-redux";
import { logout } from "../../redux/admin/Actions/UserActions";
import {
  listOrders,
  orderListNoticeAction,
  orderNoticeAction,
} from "../../redux/admin/Actions/OrderActions";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Stack } from "@mui/material";

const Header = (props) => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [countNotice, setCountNotice] = useState(0);

  //modal popup
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(orderNoticeAction(orderWatch));
    setCountNotice(0);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const orderNotice = useSelector((state) => state.orderNotice);
  const { orderWatch } = orderNotice;

  const orderListNopagination = useSelector(
    (state) => state.orderListNopagination
  );
  const { ordersNotice } = orderListNopagination;

  const fetch = useCallback(async () => {
    await dispatch(listOrders());
    await dispatch(orderListNoticeAction());
    await setCountNotice(
      ordersNotice.filter((e) => e.watched === false).length
    );
  }, [dispatch, JSON.stringify(ordersNotice), setCountNotice]);
  useEffect(() => {
    fetch();
  }, [fetch]);
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  // console.log(countNotice);
  const [active, setActive] = useState(null);
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
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <div className="">
                <i className="fas fa-bell"></i>
                <span className="btn-notice-number">{countNotice}</span>
              </div>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <table>
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  {ordersNotice &&
                    ordersNotice
                      .filter((e) => e.watched === false)
                      .map((e) => (
                        <div onClick={() => setActive(e)}>
                          <Link to={`/admin/order/${e._id}`} className="mask">
                            <tr
                              key={e._id}
                              className={`${active === e && "active"}`}
                            >
                              <th scope="row">User: {e.user.name}</th>
                              <td>Email: {e.user.email}</td>
                              <td>
                                {e.user.address === ""
                                  ? ""
                                  : "Address: " + e.user.address}
                              </td>
                              <td>Total: {e.totalPrice} $</td>
                            </tr>
                          </Link>
                        </div>
                      ))}
                </tbody>
              </table>
            </Menu>
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
