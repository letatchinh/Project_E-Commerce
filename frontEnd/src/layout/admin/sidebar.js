import React from "react";
import { Link, NavLink } from "react-router-dom";
const Sidebar = (props) => {
  const { click, handleClickMenu, isColor } = props;

  return (
    <div className={click ? "aside-mini" : ""}>
      <div className={click ? "show" : ""}>
        <aside
          className="navbar-aside mobile-offcanvas"
          id="offcanvas_aside"
          style={{ background: isColor ? "#000" : "#fff" }}
        >
          <div className="aside-top">
            <Link to="/admin/" className="brand-wrap">
              <img
                src="/images/logo.png"
                style={{ height: "46" }}
                className="logo"
                alt="Ecommerce dashboard template"
              />
            </Link>
            <div>
              <button
                className="btn btn-icon btn-aside-minimize"
                onClick={() => handleClickMenu()}
              >
                <i className="text-muted fas fa-stream"></i>
              </button>
            </div>
          </div>

          <nav className={click ? "aside-mini" : ""}>
            <ul className="menu-aside">
              <li className="menu-item">
                <NavLink
                  activeclassname="active"
                  className="menu-link"
                  to="/admin/"
                  // exact={true}
                >
                  <i className="icon fas fa-home"></i>
                  <span className="text">Trang chủ</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  activeclassname="active"
                  className="menu-link"
                  to="/admin/products"
                >
                  <i className="icon fas fa-shopping-bag"></i>
                  <span className="text">Danh sách sản phẩm</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  activeclassname="active"
                  className="menu-link"
                  to="/admin/addproduct"
                >
                  <i className="icon fas fa-cart-plus"></i>
                  <span className="text">Thêm sản phẩm</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  activeclassname="active"
                  className="menu-link"
                  to="/admin/productcomments"
                >
                  <i className="icon fa-solid fa-comment"></i>
                  <span className="text">Danh sách bình luận</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  activeclassname="active"
                  className="menu-link"
                  to="/admin/categorys"
                >
                  <i className="icon fas fa-list"></i>
                  <span className="text">Loại</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  activeclassname="active"
                  className="menu-link"
                  to="/admin/orders"
                >
                  <i className="icon fa fa-shopping-bag"></i>
                  <span className="text">Danh sách đơn hàng</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  activeclassname="active"
                  className="menu-link"
                  to="/admin/users"
                >
                  <i className="icon fas fa-user"></i>
                  <span className="text">Danh sách người dùng</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  activeclassname="active"
                  className="menu-link"
                  to="/admin/seller"
                >
                  <i className="icon fa-solid fa-store"></i>
                  <span className="text">Sản phẩm bán chạy</span>
                </NavLink>
              </li>
              {/* <li className="menu-item">
                <NavLink
                  activeclassname="active"
                  className="menu-link"
                  to="/admin/currency"
                >
                  <i className="icon fas fa-usd"></i>
                  <span className="text">Trao đổi</span>
                </NavLink>
              </li> */}
            </ul>
            <br />
            <br />
          </nav>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
