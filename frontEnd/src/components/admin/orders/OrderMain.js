import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  listOrders,
  listOrdersFiterName,
  listOrdersPaidS,
} from "../../../redux/admin/Actions/OrderActions";
import Message from "../LoadingError/Error";
import LoadingDashboard from "../LoadingError/LoadingDashboard";
import Orders from "./Orders";
const OrderMain = () => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders, page, pages } = orderList;

  const orderListFiterName = useSelector((state) => state.orderListFiterName);
  const { loadings, errors, ordersFilter, pageFiter, pagesFiter } =
    orderListFiterName;

  const orderListPaidS = useSelector((state) => state.orderListPaidS);
  const { ordersPaidS } = orderListPaidS;

  const [name, setName] = useState();
  const dispatch = useDispatch();
  const params = useParams();
  const pagenumber = params.pagenumber;
  const pageFiterNumber = params.pageFiterNumber;
  const [paid, setPaid] = useState();
  const [delivered, setDelivered] = useState();
  const [totalPrice, setTotalPrice] = useState();

  const fetch = useCallback(async () => {
    await dispatch(listOrders(pagenumber));
    await dispatch(listOrdersFiterName(name, pageFiterNumber));
    await dispatch(listOrdersPaidS(paid, delivered, totalPrice));
    // setPaid(false);
  }, [
    dispatch,
    pagenumber,
    name,
    pageFiterNumber,
    paid,
    delivered,
    totalPrice,
  ]);
  useEffect(() => {
    fetch();
  }, [fetch]);
  const submitHandler = (e) => {
    if (name.trim()) {
      navigator(`/admin/orders/search/${name}`);
    } else {
      navigator("/admin/orders");
    }
  };
  const HandlerPaiD = (e) => {
    if (paid) {
      setPaid(e.target.value);
      navigator(`/admin/orders/search/${e.target.value}`);
    } else {
      setPaid(e.target.value);
      navigator("/admin/orders");
    }
  };
  const HandlerDislivered = (e) => {
    if (delivered) {
      setDelivered(e.target.value);
      navigator(`/admin/orders/search/${e.target.value}`);
    } else {
      setDelivered(e.target.value);
      navigator("/admin/orders");
    }
  };
  const HandlerSortTotal = (e) => {
    if (totalPrice) {
      setTotalPrice(e.target.value);
      navigator(`/admin/orders/search/${e.target.value}`);
    } else {
      setTotalPrice(e.target.value);
      navigator("/admin/orders");
    }
  };
  let count = 0;
  if (ordersFilter) {
    ordersFilter.filter((e) => (e.user.name.includes(name) ? count++ : 0));
  }
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Danh sách đơn hàng</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <form
              onSubmit={submitHandler}
              className="col-lg-4 col-md-6 me-auto"
            >
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="form-control p-2"
                onChange={(e) => setName(e.target.value)}
              />
            </form>
            {/* <div className="col-lg-2 col-6 col-md-3 w-pc-28">
              <select className="form-select" onChange={HandlerSortTotal}>
                <option value="">Hiển thị tất cả tổng tiền</option>
                <option value="50">Tổng {">="} 50$</option>
                <option value="100">Tổng {">="} 100$</option>
                <option value="200">Tổng {">="} 200$</option>
              </select>
            </div> */}
            <div className="col-lg-2 col-6 col-md-3 w-pc-28">
              <select className="form-select" onChange={HandlerPaiD}>
                <option value="">Hiển thị tất cả</option>
                <option value="true">Đã chi trả</option>
                <option value="false">Chưa chi trả</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3 w-pc-28">
              <select className="form-select" onChange={HandlerDislivered}>
                <option value="">Tất cả đơn hàng chuyển giao</option>
                <option value="true">Đã chuyển</option>
                <option value="false">Chưa chuyển</option>
              </select>
            </div>
          </div>
        </header>
        <div className="card-body">
          {!paid && !name && !delivered && !totalPrice && (
            <div className="table-responsive">
              {loading ? (
                <LoadingDashboard />
              ) : error ? (
                <Message variant="alert-danger">{error}</Message>
              ) : (
                <Orders orders={orders} />
              )}
              {pages > 1 && (
                <nav className="float-end mt-4" aria-label="Page navigation">
                  <ul className="pagination">
                    {page === 1 ? (
                      <li disabled className="page-item disabled">
                        <Link
                          className="page-link"
                          to={`/admin/orders/page/${page && page - 1}`}
                        >
                          Trước
                        </Link>
                      </li>
                    ) : (
                      <li disabled className="page-item">
                        <Link
                          className="page-link"
                          to={`/admin/orders/page/${page && page - 1}`}
                        >
                          Trước
                        </Link>
                      </li>
                    )}

                    {[...Array(pages).keys()].map((x) => (
                      <li
                        className={`page-item ${
                          x + 1 === page ? "active" : ""
                        }`}
                        key={x + 1}
                      >
                        <Link
                          className="page-link"
                          to={`/admin/orders/page/${x + 1}`}
                        >
                          {x + 1}
                        </Link>
                      </li>
                    ))}
                    {page === pages ? (
                      <li disabled className="page-item disabled">
                        <Link
                          className="page-link"
                          to={`/admin/orders/page/${page && page - 1}`}
                        >
                          Sau
                        </Link>
                      </li>
                    ) : (
                      <li disabled className="page-item">
                        <Link
                          className="page-link"
                          to={`/admin/orders/page/${page && page + 1}`}
                        >
                          Sau
                        </Link>
                      </li>
                    )}
                  </ul>
                </nav>
              )}
            </div>
          )}
          {!paid && !delivered && !totalPrice && name && (
            <div className="table-responsive">
              {loadings ? (
                <LoadingDashboard />
              ) : errors ? (
                <Message variant="alert-danger">{errors}</Message>
              ) : count > 0 ? (
                <Orders orders={ordersFilter} />
              ) : (
                <div>Không đơn hàng</div>
              )}
              {pagesFiter > 1 && (
                <nav className="float-end mt-4" aria-label="Page navigation">
                  <ul className="pagination">
                    {page === 1 ? (
                      <li disabled className="page-item disabled">
                        <Link
                          className="page-link"
                          to={`/admin/orders/page/${
                            pageFiter && pageFiter - 1
                          }`}
                        >
                          Trước
                        </Link>
                      </li>
                    ) : (
                      <li disabled className="page-item">
                        <Link
                          className="page-link"
                          to={`/admin/orders/page/${
                            pageFiter && pageFiter - 1
                          }`}
                        >
                          Trước
                        </Link>
                      </li>
                    )}

                    {[...Array(pages).keys()].map((x) => (
                      <li
                        className={`page-item ${
                          x + 1 === pageFiter ? "active" : ""
                        }`}
                        key={x + 1}
                      >
                        <Link
                          className="page-link"
                          to={`/admin/orders/page/${x + 1}`}
                        >
                          {x + 1}
                        </Link>
                      </li>
                    ))}
                    {pageFiter === pagesFiter ? (
                      <li disabled className="page-item disabled">
                        <Link
                          className="page-link"
                          to={`/admin/orders/page/${
                            pageFiter && pageFiter - 1
                          }`}
                        >
                          Sau
                        </Link>
                      </li>
                    ) : (
                      <li disabled className="page-item">
                        <Link
                          className="page-link"
                          to={`/admin/orders/page/${
                            pageFiter && pageFiter + 1
                          }`}
                        >
                          Sau
                        </Link>
                      </li>
                    )}
                  </ul>
                </nav>
              )}
            </div>
          )}
          {(paid || delivered || totalPrice) && !name && (
            <div className="table-responsive">
              {loading ? (
                <LoadingDashboard />
              ) : errors ? (
                <Message variant="alert-danger">{errors}</Message>
              ) : ordersPaidS.length > 0 ? (
                <Orders orders={ordersPaidS} />
              ) : (
                <div>Không đơn hàng</div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderMain;
