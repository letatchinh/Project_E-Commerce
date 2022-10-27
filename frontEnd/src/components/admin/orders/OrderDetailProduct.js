import React from "react";
import { Link } from "react-router-dom";
const OrderDetailProduct = (props) => {
  const { order, loading } = props;
  console.log(order);
  if (!loading) {
    //Caculate Price
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    order.itemsPrice = addDecimals(
      order.orderItem.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }
  return (
    <table className="table border table-lg">
      <thead>
        <tr>
          <th style={{ width: "40%" }}>Product</th>
          <th style={{ width: "20%" }}>Pure Price</th>
          <th style={{ width: "20%" }}>Unit Price</th>
          <th style={{ width: "20%" }}>Quantity</th>
          <th style={{ width: "20%" }} className="text-end">
            Total
          </th>
        </tr>
      </thead>
      <tbody>
        {order.orderItem.map((item, index) => (
          <tr key={index}>
            <td>
              <Link className="itemside" to="#">
                <div className="left">
                  <img
                    src={`/images/${item.images[0]}`}
                    alt={item.name}
                    style={{ width: "40px", height: "40px" }}
                    className="img-xs"
                  />
                </div>
                <div className="info">{item.name}</div>
              </Link>
            </td>
            <td>${item.pricePure}</td>
            <td>${item.price}</td>
            <td>{item.qty}</td>
            <td className="text-end">${item.qty * item.price}</td>
          </tr>
        ))}
        <tr>
          <td colSpan="5">
            <article className="float-end">
              <dl className="dlist">
                <dt>Subtotal:</dt>
                <dd>${order.itemsPrice}</dd>
              </dl>
              <dl className="dlist">
                <dt>Shipping cost:</dt>
                <dd>${order.shippingPrice}</dd>
              </dl>
              <dl className="dlist">
                <dt>Grand total:</dt>
                <dd>
                  <b className="h5">${order.totalPrice}</b>
                </dd>
              </dl>
              <dl className="dlist">
                <dt className="text-muted">Status</dt>
                <dd>
                  {order.isPaid ? (
                    <span className="text-success">Payment done</span>
                  ) : (
                    <span className="text-danger">Not Paid</span>
                  )}
                </dd>
              </dl>
            </article>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default OrderDetailProduct;
