import React, { useCallback, useEffect, useState } from "react";
import OrderDetailInfo from "./OrderDetailInfo";
import OrderDetailProduct from "./OrderDetailProduct";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deliverOrder,
  getOrderDetails,
  listOrders,
} from "../../../redux/admin/Actions/OrderActions";
// import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import moment from "moment";
import LoadingDashboard from "../LoadingError/LoadingDashboard";
import { CSVLink } from "react-csv";
import { ToastContainer, toast } from "react-toastify";

const OrderDetailmain = (props) => {
  const { orderId } = props;
  const [sheetData, setSheetData] = useState("");
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const orderDetails = useSelector((state) => state.orderDetail);
  const { loading, error, order } = orderDetails;
  const orderDelivered = useSelector((state) => state.orderDelivered);
  const { loading: loadingDelivered, success } = orderDelivered;

  const fetch = useCallback(async () => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  useEffect(() => {
    fetch();
  }, [orderDelivered, fetch]);

  const deliverHanlder = () => {
    dispatch(deliverOrder(order));
    toast("Delivered success");
    // navigator(-1);
  };

  let dataExcel = JSON.stringify(order);
  let str = dataExcel && dataExcel.replace(/{|}|"/g, "");

  return (
    <>
      <ToastContainer />
      <section className="content-main">
        <div className="content-header">
          <Link to="/admin/orders" className="btn btn-dark text-white">
            Back To Orders
          </Link>
        </div>

        {loading ? (
          <LoadingDashboard />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <div className="card">
            <header className="card-header p-3 Header-green">
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-6">
                  <span>
                    <i className="far fa-calendar-alt mx-2"></i>
                    <b className="text-white">
                      {moment(order.createdAt).format("llll")}
                    </b>
                  </span>
                  <br />
                  <small className="text-white mx-3">
                    Order ID : {order._id}
                  </small>
                </div>
                <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center">
                  {/* <select
                  className="form-select d-inline-block"
                  style={{ maxWidth: "200px" }}
                >
                  <option>Change status</option>
                  <option>Awaiting payment</option>
                  <option>Confirmed</option>
                  <option>Delivered</option>
                </select> */}
                  <CSVLink
                    // to="#"
                    data={str && str}
                    className="btn btn-success ms-2"
                  >
                    <i className="fas fa-print"></i>
                  </CSVLink>
                </div>
              </div>
            </header>
            <div className="card-body">
              {/* Order info */}
              <OrderDetailInfo order={order} />

              <div className="row">
                <div className="col-lg-9">
                  <div className="table-responsive">
                    <OrderDetailProduct order={order} loading={loading} />
                  </div>
                </div>

                {/* Payment Info */}

                <div className="col-lg-3">
                  <div className="box shadow-sm bg-light">
                    {order.isDelivered ? (
                      <button className="btn btn-success col-12">
                        DELIVERED AT ({" "}
                        {moment(order.deliveredAt).format("MMM Do YY")})
                      </button>
                    ) : (
                      <>
                        {loadingDelivered && <LoadingDashboard />}
                        <button
                          onClick={() => deliverHanlder()}
                          className="btn btn-dark col-12"
                        >
                          Mask As delivered
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default OrderDetailmain;
