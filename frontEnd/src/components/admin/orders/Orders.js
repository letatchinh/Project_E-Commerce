import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
const Orders = (props) => {
  const { orders } = props;
  console.log(orders.length);
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Tên</th>
          <th scope="col">Email</th>
          <th scope="col">Tổng</th>
          <th scope="col">Chi trả</th>
          <th scope="col">Ngày</th>
          <th>Trạng thái</th>
          <th scope="col" className="text-end">
            Hành động
          </th>
        </tr>
      </thead>
      <tbody>
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <tr
              key={order._id}
              style={{ background: order.watched ? "" : "#d4d5d7" }}
            >
              <td>
                <b>{order.user && order.user.name}</b>
              </td>
              <td>{order.user && order.user.email}</td>
              <td>${order.totalPrice}</td>
              <td>
                {order.isPaid ? (
                  <span className="badge rounded-pill alert-success">
                    Thanh toán vào lúc {moment(order.paidAt).format("MMM Do YY")}
                  </span>
                ) : (
                  <span className="badge rounded-pill alert-danger">
                    Chưa chi trả
                  </span>
                )}
              </td>
              <td>{moment(order.createdAt).format("MMM Do YY")}</td>
              <td>
                {order.isDelivered ? (
                  <span className="badge btn-success">Đã giao</span>
                ) : (
                  <span className="badge btn-dark">Chưa giao</span>
                )}
              </td>
              <td className="d-flex justify-content-end align-item-center">
                <Link to={`/admin/order/${order._id}`} className="text-success">
                  <i className="fas fa-eye"></i>
                </Link>
              </td>
            </tr>
          ))
        ) : (
          <div className="p-2">No order</div>
        )}

        {/* Not Paid Not Delivered */}
      </tbody>
    </table>
  );
};

export default Orders;
