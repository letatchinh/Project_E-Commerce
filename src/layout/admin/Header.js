import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/admin/Actions/UserActions";

const Header = (props) => {
  const dispatch = useDispatch();

  const { handleClickMenu, isDisplay, handleDisplay } = props;

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
    // console.log(dispatch(logout));
  };
  return (
    <header className="main-header navbar">
      <div className="col-search">
        <form className="searchform">
          <div className="input-group">
            <input
              list="search_terms"
              type="text"
              className="form-control"
              placeholder="Search term"
            />
            <button className="btn btn-light bg" type="button">
              <i className="fa fa-search"></i>
            </button>
          </div>
          <datalist id="search_terms">
            <option value="Products" />
            <option value="New orders" />
            <option value="Apple iphone" />
            <option value="Ahmed Hassan" />
          </datalist>
        </form>
      </div>

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
            <Link className={`nav-link btn-icon`} title="Dark mode" to="#">
              <i className="fas fa-moon"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link btn-icon" to="#">
              <i className="fas fa-bell"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">
              English
            </Link>
          </li>
          <li className="dropdown nav-item" onClick={() => handleDisplay()}>
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
                <Link className="dropdown-item" to="#">
                  Settings
                </Link>
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
