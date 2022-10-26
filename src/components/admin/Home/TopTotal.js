import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { listOrders } from "../../../redux/admin/Actions/OrderActions";
import { listProducts } from "../../../redux/admin/Actions/ProductActions";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
const TopTotal = (props) => {
  const { orders, products, count } = props;
  let totalSale = 0;
  let countPaid = 0;
  let totalPure = 0;
  if (orders) {
    orders.map((order) =>
      order.isPaid === true ? (totalSale = totalSale + order.totalPrice) : null
    );
    orders.map((order) => (order.isPaid === true ? countPaid++ : null));
    let arrPaid = orders.filter((order) => order.isPaid === true);
    arrPaid.map((e) =>
      e.orderItem.map((el) => (totalPure = el.pricePure * el.qty + totalPure))
    );
  }

  const dispatch = useDispatch();
  const fetch = useCallback(async () => {
    await dispatch(listProducts());
    await dispatch(listOrders());
  }, [dispatch]);
  useEffect(() => {
    fetch();
  }, [fetch]);
  return (
    <div className="row">
      <div className="col-lg-3">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-primary">
              <i className="text-primary fas fa-usd"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Total Sales</h6>{" "}
              <span>${totalSale.toFixed(2).toLocaleString()}</span>
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-3">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-danger text-danger">
              <CurrencyExchangeIcon />
            </span>
            <div className="text">
              <h6 className="mb-1">Total Profit</h6>{" "}
              <span>
                ${(totalSale - totalPure).toFixed(2).toLocaleString()}
              </span>
            </div>
          </article>
        </div>
      </div>

      <div className="col-lg-3">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-success">
              <i className="text-success fa fa-shopping-bag"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Total Orders</h6>
              {count > 0 ? <span>{countPaid}</span> : <span>0</span>}
            </div>
          </article>
        </div>
      </div>

      <div className="col-lg-3">
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
