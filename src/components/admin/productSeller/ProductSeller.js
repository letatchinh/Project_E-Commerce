import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import products from "../../../data/Products";
import { useDispatch, useSelector } from "react-redux";
import {
  listProducts,
  listProductSeller,
} from "../../../redux/admin/Actions/ProductActions.js";
import Message from "../LoadingError/Error";
import LoadingDashboard from "../LoadingError/LoadingDashboard";
import Product from "../products/Product.js";
const ProductSeller = () => {
  const params = useParams();
  const pagenumber = params.pagenumber;

  const dispatch = useDispatch();
  const productListSellersa = useSelector((state) => state.productListSellersa);
  const { productSellerss, loadingSeller, errorSeller, page, pages } =
    productListSellersa;
  //   const productDelete = useSelector((state) => state.productDelete);
  //   const { error: errorDelete, success: successDelete } = productDelete;
  const fetch = useCallback(async () => {
    await dispatch(listProductSeller(pagenumber));
  }, [dispatch, pagenumber]);
  useEffect(() => {
    fetch();
  }, [fetch]);
  //   console.log(page, pages);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Best Seller Products</h2>
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
              {productSellerss.products &&
                productSellerss.products.map((product) => (
                  <Product product={product} key={product._id} />
                ))}
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
