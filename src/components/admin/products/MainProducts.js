import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Product from "./Product";
// import products from "../../../data/Products";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../../redux/admin/Actions/ProductActions.js";
import Message from "../LoadingError/Error";
import LoadingDashboard from "../LoadingError/LoadingDashboard";
import { listAllCategorys } from "../../../redux/admin/Actions/CategoryAction";
const MainProducts = () => {
  const [keyword, setKeyword] = useState();
  const [sortPrice, setSortPrice] = useState();
  const [keywordCategory, setKeywordCategory] = useState();
  const params = useParams();
  const pagenumber = params.pagenumber;

  const dispatch = useDispatch();
  let navigator = useNavigate();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, success: successDelete } = productDelete;

  const categoryList = useSelector((state) => state.categoryList);
  const { categorys } = categoryList;

  const fetch = useCallback(async () => {
    await dispatch(listAllCategorys());
    await dispatch(
      listProducts(keyword, pagenumber, sortPrice, keywordCategory)
    );
  }, [dispatch, pagenumber, keyword, sortPrice, keywordCategory]);
  useEffect(() => {
    fetch();
    // sortLoswtoHight();
    // setarrProduct(arrProduct);
  }, [fetch, productDelete]);
  // let arrProduct = [];

  const handlesortPrice = (e) => {
    setSortPrice(e.target.value);
    navigator(`/admin/products/page/${page}/${e.target.value}`);
  };
  const handlesortCategory = (e) => {
    setKeywordCategory(e.target.value);
    navigator(`/admin/products/page/${page}/category/${e.target.value}`);
    if (e.target.value === "") {
      navigator("/admin/products");
    }
  };

  // console.log(keywordCategory);
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigator(`/admin/products/search/${keyword}`);
    } else {
      navigator("/admin/products");
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
            <form
              className="col-lg-4 col-md-6 me-auto d-flex"
              onSubmit={submitHandler}
            >
              <input
                type="search"
                placeholder="Search..."
                className="form-control p-2"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </form>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select" onChange={handlesortCategory}>
                <option value="">Select</option>
                <option value="">All category</option>
                {categorys &&
                  categorys.map((cate) => (
                    <option key={cate._id} value={cate.name}>
                      {cate.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select" onChange={handlesortPrice}>
                <option value="">All price</option>
                <option value="-1">High to Low</option>
                <option value="1">Low to High</option>
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
              {products &&
                products.map((product) => (
                  <Product product={product} key={product._id} />
                ))}
              {products.length === 0 && <div>No Empty product</div>}
            </div>
          )}
          {pages > 1 && (
            <nav className="float-end mt-4" aria-label="Page navigation">
              <ul className="pagination">
                {page === 1 ? (
                  <li disabled className="page-item disabled">
                    <Link
                      className="page-link"
                      to={`/admin/products/page/${page && page - 1}`}
                    >
                      Previous
                    </Link>
                  </li>
                ) : (
                  <li disabled className="page-item">
                    <Link
                      className="page-link"
                      to={`/admin/products/page/${page && page - 1}`}
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
                      to={
                        keyword
                          ? `/admin/products/search/${keyword}/page/${x + 1}`
                          : `/admin/products/page/${x + 1}`
                      }
                    >
                      {x + 1}
                    </Link>
                  </li>
                ))}
                {page === pages ? (
                  <li disabled className="page-item disabled">
                    <Link
                      className="page-link"
                      to={`/admin/products/page/${page && page - 1}`}
                    >
                      Next
                    </Link>
                  </li>
                ) : (
                  <li disabled className="page-item">
                    <Link
                      className="page-link"
                      to={`/admin/products/page/${page && page + 1}`}
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

export default MainProducts;
