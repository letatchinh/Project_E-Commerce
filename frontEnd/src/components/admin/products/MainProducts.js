import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../../redux/admin/Actions/ProductActions.js";
import Message from "../LoadingError/Error";
import LoadingDashboard from "../LoadingError/LoadingDashboard";
import { listAllCategorys } from "../../../redux/admin/Actions/CategoryAction";
import { toast, ToastContainer } from "react-toastify";
const MainProducts = () => {
  const [keyword, setKeyword] = useState();
  const [sortPrice, setSortPrice] = useState();
  const [keywordCategory, setKeywordCategory] = useState();
  const [keywordQuantitySold, setKeywordQuantitySold] = useState();
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
      listProducts(
        keyword,
        pagenumber,
        sortPrice,
        keywordCategory,
        keywordQuantitySold
      )
    );
  }, [
    dispatch,
    pagenumber,
    keyword,
    sortPrice,
    keywordCategory,
    keywordQuantitySold,
  ]);
  useEffect(() => {
    fetch();
  }, [fetch, productDelete]);

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
  const handlesortQuantitySold = (e) => {
    setKeywordQuantitySold(e.target.value);
    navigator(`/admin/products/page/${page}/quantitySold/${e.target.value}`);
    if (e.target.value === "") {
      navigator("/admin/products");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigator(`/admin/products/search/${keyword}`);
    } else {
      navigator("/admin/products");
    }
  };
  return (
    <>
      <ToastContainer />
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">Danh sách sản phẩm</h2>
          <div>
            <Link to="/admin/addproduct" className="btn btn-primary">
              Tạo mới
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
                  placeholder="Tìm kiếm..."
                  className="form-control p-2"
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </form>
              <div className="col-lg-2 col-6 col-md-3">
                <select
                  className="form-select"
                  value={keywordCategory}
                  onChange={handlesortCategory}
                >
                  <option value="">Tất cả các loại</option>
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
                  <option value="">Sắp xếp theo giá</option>
                  <option value="-1">Cao đến thấp</option>
                  <option value="1">Thấp đến cao</option>
                </select>
              </div>
              <div className="col-lg-2 col-6 col-md-3">
                <select
                  className="form-select"
                  onChange={handlesortQuantitySold}
                >
                  <option value="">Sắp xếp theo số lượng</option>
                  <option value="-1">Cao đến thấp</option>
                  <option value="1">Thấp đến cao</option>
                  {/* <option value={30}>Số lượng bán {">="} 30 sản phẩm</option> */}
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
                {products.length === 0 && <div>Không có sản phẩm</div>}
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
                        Trước
                      </Link>
                    </li>
                  ) : (
                    <li disabled className="page-item">
                      <Link
                        className="page-link"
                        to={`/admin/products/page/${page && page - 1}`}
                      >
                        Trước
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
                        Sau
                      </Link>
                    </li>
                  ) : (
                    <li disabled className="page-item">
                      <Link
                        className="page-link"
                        to={`/admin/products/page/${page && page + 1}`}
                      >
                        Sau
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default MainProducts;
