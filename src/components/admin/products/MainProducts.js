import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Product from "./Product";
// import products from "../../../data/Products";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../../redux/admin/Actions/ProductActions.js";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { listOrders } from "../../../redux/admin/Actions/OrderActions";
const MainProducts = () => {
  let [arrProduct, setarrProduct] = useState([]);
  const dispatch = useDispatch();
  let navigator = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, success: successDelete } = productDelete;
  const fetch = useCallback(async () => {
    await dispatch(listProducts());
  }, [dispatch, productDelete]);
  useEffect(() => {
    fetch();
    // setarrProduct(arrProduct);
  }, [fetch]);
  // let arrProduct = [];
  for (const key in products) {
    arrProduct.push(products[key].name);
  }
  // console.log(arrProduct.includes("Veraaaaa1"));
  const handleInputOnChange = (e) => {
    e.preventDefault();
    if (arrProduct.includes(e.target.value.trim())) {
      console.log("OK");
    } else {
      console.log("Not OK");
    }
  };
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Products</h2>
        <div>
          <Link to="/admin/addproduct" className="btn btn-primary">
            Create New
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="search"
                placeholder="Search..."
                className="form-control p-2"
                onChange={handleInputOnChange}
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>All category</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Something else</option>
              </select>
            </div>

            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Latest added</option>
                <option>Cheap first</option>
                <option>Most viewed</option>
              </select>
            </div>
          </div>
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row">
              {/* Products */}
              {products.map((product) => (
                <Product product={product} key={product._id} />
              ))}
            </div>
          )}

          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Previous
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default MainProducts;
