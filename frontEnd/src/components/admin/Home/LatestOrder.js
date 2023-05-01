import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import LoadingDashboard from "../LoadingError/LoadingDashboard";
const LatestOrder = (props) => {
  const { error, loading, orders } = props;
  return (
    <div className="card-body">
      <h3 className="card-title">Danh sách đơn hàng mới</h3>
      {loading ? (
        <LoadingDashboard />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <tbody>
              {orders && orders.length > 0 ? (
                orders.slice(0, 5).map((order) => (
                  <tr key={order._id}>
                    <td>
                      <b>{order.user.name}</b>
                    </td>
                    <td>{order.user.email}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        <span className="badge rounded-pill alert-success">
                          Thanh toán vào lúc {moment(order.paidAt).format("MMM Do YY")}
                        </span>
                      ) : (
                        <span className="badge rounded-pill alert-danger">
                          Not Paid
                        </span>
                      )}
                    </td>
                    <td> {moment(order.createdAt).calendar()}</td>
                    <td className="d-flex justify-content-end align-item-center">
                      <Link
                        to={`/admin/order/${order._id}`}
                        className="text-success"
                      >
                        <i className="fas fa-eye"></i>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <div className="p-2">No order</div>
              )}

              {/* Not Paid */}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LatestOrder;
