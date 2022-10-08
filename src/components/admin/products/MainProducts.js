import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Product from "./Product";
// import products from "../../../data/Products";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../../redux/admin/Actions/ProductActions.js";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { listOrders } from "../../../redux/admin/Actions/OrderActions";
import LoadingDashboard from "../LoadingError/LoadingDashboard";
const MainProducts = () => {
  const params = useParams();
  const pagenumber = params.pagenumber;
  let [arrProduct, setarrProduct] = useState([]);
  const dispatch = useDispatch();
  let navigator = useNavigate();
  const [values, setVlaues] = useState("");
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, success: successDelete } = productDelete;
  const fetch = useCallback(async () => {
    await dispatch(listProducts(pagenumber));
  }, [dispatch, productDelete, pagenumber]);
  useEffect(() => {
    fetch();
    // sortLoswtoHight();
    // setarrProduct(arrProduct);
  }, [fetch]);
  // let arrProduct = [];
  for (const key in products) {
    arrProduct.push(products[key].price);
  }
  const handleChange = (e) => {
    navigator(`/admin/products/${e.target.value}`);
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
                // onChange={handleInputOnChange}
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
              <select className="form-select" onChange={handleChange}>
                <option>Latest added</option>
                <option>Cheap first</option>
                <option value="allSortHigh">Most viewed</option>
              </select>
            </div>
          </div>
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <LoadingDashboard />
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
          {pages > 1 && (
            <nav className="float-end mt-4" aria-label="Page navigation">
              <ul className="pagination">
                <li className="page-item disabled">
                  <Link className="page-link" to={"#"}>
                    Previous
                  </Link>
                </li>
                {[...Array(pages).keys()].map((x) => (
                  <li
                    className={`page-item ${x + 1 === page ? "active" : ""}`}
                    key={x + 1}
                  >
                    <Link
                      className="page-link"
                      to={`/admin/products/page/${x + 1}`}
                    >
                      {x + 1}
                    </Link>
                  </li>
                ))}
                {/* <li className={`page-item`}>
                  <Link className="page-link" to={"#"}>
                    Next
                  </Link>
                </li> */}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainProducts;
