import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
const Orders = (props) => {
  const { orders } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Total</th>
          <th scope="col">Paid</th>
          <th scope="col">Date</th>
          <th>Status</th>
          <th scope="col" className="text-end">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {orders &&
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
                    Paid At {moment(order.paidAt).format("MMM Do YY")}
                  </span>
                ) : (
                  <span className="badge rounded-pill alert-danger">
                    Not paid
                  </span>
                )}
              </td>
              <td>{moment(order.createdAt).format("MMM Do YY")}</td>
              <td>
                {order.isDelivered ? (
                  <span className="badge btn-success">Delivered</span>
                ) : (
                  <span className="badge btn-dark">Not delivered</span>
                )}
              </td>
              <td className="d-flex justify-content-end align-item-center">
                <Link to={`/admin/order/${order._id}`} className="text-success">
                  <i className="fas fa-eye"></i>
                </Link>
              </td>
            </tr>
          ))}

        {/* Not Paid Not Delivered */}
      </tbody>
    </table>
  );
};

export default Orders;
