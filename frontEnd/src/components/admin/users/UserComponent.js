import { Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { listUser } from "../../../redux/admin/Actions/UserActions.js";
import Message from "../LoadingError/Error.js";
// import Loading from "../LoadingError/Loading.js";
import LoadingDashboard from "../LoadingError/LoadingDashboard.js";
import UserChildComponent from "./UserChildComponent.js";
const UserComponent = () => {
  const [keyword, setKeyword] = useState();
  const [active, setActive] = useState();

  const params = useParams();
  const pagenumber = params.pagenumber;
  const dispatch = useDispatch();
  let navigator = useNavigate();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users, page, pages, count } = userList;
  console.log(users,"users");
  const fetch = useCallback(async () => {
    await dispatch(listUser(keyword, pagenumber, active));
  }, [dispatch, keyword, pagenumber, active]);
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
  const handlerActive = (e) => {
    if (active) {
      setActive(e.target.value);
      navigator(`/admin/users/search/${keyword}`);
    } else {
      setActive(e.target.value);
      navigator("/admin/users");
    }
  };
  const columns = [
    {
      title: 'Tên',
      dataIndex : 'name',
      key : 'name',
    },
    {
      title: 'Loại Tài khoản',
      dataIndex : 'isAdmin',
      key : 'isAdmin',
      render : (item) => item ? "Admin" : "Khách hàng"
    },
    {
      title: 'Email',
      dataIndex : 'email',
      key : 'email',
    },
    {
      title: 'Địa chỉ',
      dataIndex : 'address',
      key : 'address',
    },
  ]
  // console.log(userListActive);
  return (
    <>
      <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Người dùng</h2>
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
                placeholder="Tìm kiếm..."
                className="form-control"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </form>
            <div className="col-lg-2 col-6 col-md-3">
              {/* <select className="form-select" onChange={handlerActive}>
                <option value="">Tất cả trạng thái</option>
                <option value="true">Đang hoạt động</option>
                <option value="false">Không hoạt động</option>
              </select> */}
            </div>
          </div>
        </header>

        {/* Card */}

        {/* {users && (
          <div className="card-body">
            {loading ? (
              <LoadingDashboard />
            ) : error ? (
              <Message variant={"alert-danger"}>{error}</Message>
            ) : count > 0 ? (
              <UserChildComponent users={users} />
            ) : (
              <div>Không người dùng</div>
            )}

            {pages > 1 && (
              <nav className="float-end mt-4" aria-label="Page navigation">
                <ul className="pagination">
                  {page === 1 ? (
                    <li disabled className="page-item disabled">
                      <Link
                        className="page-link"
                        to={`/admin/users/page/${page && page - 1}`}
                      >
                        Trước
                      </Link>
                    </li>
                  ) : (
                    <li disabled className="page-item">
                      <Link
                        className="page-link"
                        to={`/admin/users/page/${page && page - 1}`}
                      >
                        Trước
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
                        Sau
                      </Link>
                    </li>
                  ) : (
                    <li disabled className="page-item">
                      <Link
                        className="page-link"
                        to={`/admin/users/page/${page && page + 1}`}
                      >
                        Sau
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            )}
          </div>
        )} */}
        <Table columns={columns} dataSource={users?.users || []}/>
      </div>
    </section>


    </>
  
  );
};

export default UserComponent;

