import React from "react";
import { Link } from "react-router-dom";
const OrderDetailProduct = (props) => {
  const { order, loading } = props;

  if (!loading) {
    //Caculate Price
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    order.itemsPrice = addDecimals(
      order.orderItem.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }
  console.log(order);
  return (
    <table className="table border table-lg">
      <thead>
        <tr>
          <th style={{ width: "40%" }}>Tên sản phẩm</th>
          <th style={{ width: "20%" }}>Giá gốc</th>
          <th style={{ width: "20%" }}>Giá hiện tại</th>
          <th style={{ width: "20%" }}>Số lượng</th>
          <th style={{ width: "20%" }} className="text-end">
            Tổng
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
            <td>${item.price.toFixed(2)}</td>
            <td>{item.qty}</td>
            <td className="text-end">${item.qty * item.price.toFixed(2)}</td>
          </tr>
        ))}
        <tr>
          <td colSpan="5">
            <article className="float-end">
              <dl className="dlist">
                <dt>Tổng phụ:</dt>
                <dd>${order.itemsPrice}</dd>
              </dl>
              <dl className="dlist">
                <dt>Giá vận chuyển:</dt>
                <dd>${order.shippingPrice}</dd>
              </dl>
              <dl className="dlist">
                <dt>Tổng cộng:</dt>
                <dd>
                  <b className="h5">${order.totalPrice}</b>
                </dd>
              </dl>
              <dl className="dlist">
                <dt className="text-muted">Trạng thái</dt>
                <dd>
                  {order.isPaid ? (
                    <span className="text-success">Đã trả xong</span>
                  ) : (
                    <span className="text-danger">Chưa chi trả</span>
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
