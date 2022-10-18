import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../../../redux/admin/Actions/OrderActions";
import { listProducts } from "../../../redux/admin/Actions/ProductActions";

const TopTotal = (props) => {
  const { orders, products, count } = props;
  console.log(orders);
  let totalSale = 0;
  if (orders) {
    orders.map((order) =>
      order.isPaid === true ? (totalSale = totalSale + order.totalPrice) : null
    );
  }
  const dispatch = useDispatch();
  const fetch = useCallback(async () => {
    await dispatch(listProducts());
    await dispatch(listOrders());
  }, [dispatch]);
  useEffect(() => {
    fetch();
    // setarrProduct(arrProduct);
  }, [fetch]);
  return (
    <div className="row">
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-primary">
              <i className="text-primary fas fa-usd"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Total Sales</h6>{" "}
              <span>${Number.parseInt(totalSale).toLocaleString()}</span>
            </div>
          </article>
        </div>
      </div>

      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-success">
              <i className="text-success fa fa-shopping-bag"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Total Orders</h6>
              {count > 0 ? <span>{count}</span> : <span>0</span>}
            </div>
          </article>
        </div>
      </div>

      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-warning">
              <i className="text-warning fas fa-shopping-basket"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Total Products</h6>
              {products ? <span>{products.length}</span> : <span>0</span>}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default TopTotal;
