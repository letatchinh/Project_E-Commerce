import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  listOrders,
  listOrdersFiterName,
  listOrdersPaidS,
} from "../../../redux/admin/Actions/OrderActions";
import Message from "../LoadingError/Error";
// import Loading from "../LoadingError/Loading";
import LoadingDashboard from "../LoadingError/LoadingDashboard";
import Orders from "./Orders";
const OrderMain = () => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders, page, pages } = orderList;

  const orderListFiterName = useSelector((state) => state.orderListFiterName);
  const { loadings, errors, ordersFilter, pageFiter, pagesFiter } =
    orderListFiterName;

  const orderListPaidS = useSelector((state) => state.orderListPaidS);
  const { loadingPaid, errorPaid, ordersPaidS } = orderListPaidS;
  // console.log(ordsssersPaidS);
  // console.log(orderListFiterName, "sda");
  const [keyword, setKeyword] = useState();
  const [name, setName] = useState();
  const dispatch = useDispatch();
  const params = useParams();
  const pagenumber = params.pagenumber;
  const pageFiterNumber = params.pageFiterNumber;
  const [paid, setPaid] = useState();

  const fetch = useCallback(async () => {
    await dispatch(listOrders(keyword, pagenumber));
    await dispatch(listOrdersFiterName(name, pageFiterNumber));
    await dispatch(listOrdersPaidS(paid));
    // setPaid(false);
  }, [dispatch, keyword, pagenumber, name, pageFiterNumber, paid]);
  useEffect(() => {
    fetch();
    // setarrProduct(arrProduct);
  }, [fetch]);
  const submitHandler = (e) => {
    e.preventDefault();
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
      navigator("/admin/orders");
    }
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Orders</h2>
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
                placeholder="Search..."
                className="form-control p-2"
                onChange={(e) => setName(e.target.value)}
              />
            </form>

            <div className="col-lg-2 col-6 col-md-3 w-pc-28">
              <select
                className="form-select"
                onChange={(e) => setPaid(e.target.value)}
              >
                <option value="">Show all status</option>
                <option value="true">Active</option>
                <option value="false">Disabled</option>
              </select>
            </div>
          </div>
        </header>
        <div className="card-body">
          {!paid && !name && (
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
                          Previous
                        </Link>
                      </li>
                    ) : (
                      <li disabled className="page-item">
                        <Link
                          className="page-link"
                          to={`/admin/orders/page/${page && page - 1}`}
                        >
                          Previous
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
                          to={
                            keyword
                              ? `/admin/orders/search/${keyword}/page/${x + 1}`
                              : `/admin/orders/page/${x + 1}`
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
                          to={`/admin/orders/page/${page && page - 1}`}
                        >
                          Next
                        </Link>
                      </li>
                    ) : (
                      <li disabled className="page-item">
                        <Link
                          className="page-link"
                          to={`/admin/orders/page/${page && page + 1}`}
                        >
                          Next
                        </Link>
                      </li>
                    )}
                  </ul>
                </nav>
              )}
            </div>
          )}
          {!paid && name && (
            <div className="table-responsive">
              {loadings ? (
                <LoadingDashboard />
              ) : errors ? (
                <Message variant="alert-danger">{errors}</Message>
              ) : (
                <Orders orders={ordersFilter} />
              )}
            </div>
          )}
          {paid && (
            <div className="table-responsive">
              {loading ? (
                <LoadingDashboard />
              ) : errors ? (
                <Message variant="alert-danger">{errors}</Message>
              ) : (
                <Orders orders={ordersPaidS} />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderMain;
