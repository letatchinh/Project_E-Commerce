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
            <Link to="/admin" className="brand-wrap">
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
                  to="/admin"
                  // exact={true}
                >
                  <i className="icon fas fa-home"></i>
                  <span className="text">Dashboard</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  activeclassname="active"
                  className="menu-link"
                  to="/admin/products"
                >
                  <i className="icon fas fa-shopping-bag"></i>
                  <span className="text">Products</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  activeclassname="active"
                  className="menu-link"
                  to="/admin/addproduct"
                >
                  <i className="icon fas fa-cart-plus"></i>
                  <span className="text">Add product</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  activeclassname="active"
                  className="menu-link"
                  to="/admin/category"
                >
                  <i className="icon fas fa-list"></i>
                  <span className="text">Category</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  activeclassname="active"
                  className="menu-link"
                  to="/admin/orders"
                >
                  <i className="icon fa fa-shopping-bag"></i>
                  <span className="text">Orders</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  activeclassname="active"
                  className="menu-link"
                  to="/admin/users"
                >
                  <i className="icon fas fa-user"></i>
                  <span className="text">Users</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  activeclassname="active"
                  className="menu-link disabled"
                  to="/admin/seller"
                >
                  <i className="icon fa-solid fa-store"></i>
                  <span className="text">Seller</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  activeclassname="active"
                  className="menu-link"
                  to="/admin/currency"
                >
                  <i className="icon fas fa-usd"></i>
                  <span className="text">Exchange</span>
                </NavLink>
              </li>
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
