import React, { useCallback, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductSeller } from "../../../redux/admin/Actions/ProductActions.js";
import Message from "../LoadingError/Error";
import LoadingDashboard from "../LoadingError/LoadingDashboard";
import Product from "../products/Product.js";
const ProductSeller = () => {
  const params = useParams();
  const pageNumber = params.pageNumber;

  const dispatch = useDispatch();
  const productListSellersa = useSelector((state) => state.productListSellersa);
  const { products, loadingSeller, errorSeller, page, pages } =
    productListSellersa;
  const fetch = useCallback(async () => {
    await dispatch(listProductSeller(pageNumber));
  }, [dispatch, pageNumber]);
  useEffect(() => {
    fetch();
  }, [fetch]);
  console.log(products);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Danh sách sản phẩm bán chạy</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          {loadingSeller ? (
            <LoadingDashboard />
          ) : errorSeller ? (
            <Message variant="alert-danger">{errorSeller}</Message>
          ) : (
            <div className="row">
              {/* Products */}
              {products &&
                products.map((product) => (
                  <Product product={product} key={product._id} />
                ))}
              {products.lengsth === 0 && <div>No product</div>}
            </div>
          )}
          {pages > 1 && (
            <nav className="float-end mt-4" aria-label="Page navigation">
              <ul className="pagination">
                {page === 1 ? (
                  <li disabled className="page-item disabled">
                    <Link
                      className="page-link"
                      to={`/admin/seller/page/${page && page - 1}`}
                    >
                      Previous
                    </Link>
                  </li>
                ) : (
                  <li disabled className="page-item">
                    <Link
                      className="page-link"
                      to={`/admin/seller/page/${page && page - 1}`}
                    >
                      Previous
                    </Link>
                  </li>
                )}

                {[...Array(pages).keys()].map((x) => (
                  <li
                    className={`page-item ${x + 1 === page ? "active" : ""}`}
                    key={x + 1}
                  >
                    <Link
                      className="page-link"
                      to={`/admin/seller/page/${x + 1}`}
                    >
                      {x + 1}
                    </Link>
                  </li>
                ))}
                {page === pages ? (
                  <li disabled className="page-item disabled">
                    <Link
                      className="page-link"
                      to={`/admin/seller/page/${page && page - 1}`}
                    >
                      Next
                    </Link>
                  </li>
                ) : (
                  <li disabled className="page-item">
                    <Link
                      className="page-link"
                      to={`/admin/seller/page/${page && page + 1}`}
                    >
                      Next
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductSeller;
