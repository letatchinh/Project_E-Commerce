import React from "react";
import { Link } from "react-router-dom";

const Orders = () => {
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
        <tr>
          <td>
            <b>Women Red Hells Sandal</b>
          </td>
          <td>user@gmail.com</td>
          <td>$45,789</td>
          <td>
            <span className="badge rounded-pill alert-success">
              Paid At Today 23:56 AM
            </span>
          </td>
          <td>Dec 12 2021</td>
          <td>
            <span className="badge btn-success">Delivered</span>
          </td>
          <td className="d-flex justify-content-end align-item-center">
            <Link to="/admin/order" className="text-success">
              <i className="fas fa-eye"></i>
            </Link>
          </td>
        </tr>
        {/* Not Paid Not Delivered */}
        <tr>
          <td>
            <b>Women Red Hells Sandal vvvvvvvvvv</b>
          </td>
          <td>user@gmail.com</td>
          <td>$45,789</td>
          <td>
            <span className="badge rounded-pill alert-danger">Not Paid</span>
          </td>
          <td>Dec 12 2021</td>
          <td>
            <span className="badge btn-success">Not Delivered</span>
          </td>
          <td className="d-flex justify-content-end align-item-center">
            <Link to="/admin/order" className="text-success">
              <i className="fas fa-eye"></i>
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Orders;
