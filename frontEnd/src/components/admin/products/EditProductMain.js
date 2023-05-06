import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { listAllCategorys } from "../../../redux/admin/Actions/CategoryAction";
import {
  editProduct,
  updateProduct,
} from "../../../redux/admin/Actions/ProductActions";
import Message from "../LoadingError/Error";
import LoadingDashboard from "../LoadingError/LoadingDashboard";
const EditProductMain = (props) => {
  let id = 0;
  const { productId } = props;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [quantitySold, setDuantitySold] = useState(0);
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();

  const productEdit = useSelector((state) => state.productEdit);
  const { loading, error, product } = productEdit;

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const categoryList = useSelector((state) => state.categoryList);
  const { categorys } = categoryList;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;
  const fileSelectedHandler = (e) => {
    const newFiles = [];
    for (let i = 0; i < e.target.files.length; i++) {
      newFiles.push(e.target.files[i].name);
    }
    setImages(newFiles);
  };
  const fetch = useCallback(async () => {
    await dispatch(listAllCategorys());
    if (!product.name || product._id !== productId) {
      dispatch(editProduct(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setCountInStock(product.countInStock);
      setCategory(product.category);
      setPrice(product.price);
      setImages(product.images);
      setDiscount(product.discount);
      setDuantitySold(product.quantitySold);
    }
    // }
  }, [product, dispatch, productId]);
  useEffect(() => {
    fetch();
  }, [fetch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        description,
        countInStock,
        images,
        category,
        discount,
        quantitySold,
      })
    );
    if (product.name !== name && !products.includes(product.name)) {
      toast.success("Chỉnh sửa thành công");
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="pcShow">
            <div className="content-header">
              <Link to={-1} className="btn btn-danger text-white">
                Trở về danh sách sản phẩm
              </Link>
              <h2 className="content-title">Cập nhật sản phẩm</h2>
              <div>
                <button type="submit" className="btn btn-primary">
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
          <div className="spShow">
            <div className="content-header">
              <div className="btn-box">
                <Link
                  to="/admin/products"
                  className="btn btn-danger text-white"
                >
                  Trở về danh sách sản phẩm
                </Link>
                <div>
                  <button type="submit" className="btn btn-primary">
                    Cập nhật
                  </button>
                </div>
              </div>
              <h2 className="content-title">Cập nhật sản phẩm</h2>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loadingUpdate && <LoadingDashboard />}
                  {loading ? (
                    <LoadingDashboard />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Tên sản phẩm
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_title"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Giá
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Số lượng trong kho
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={countInStock}
                          onChange={(e) => setCountInStock(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Mô tả</label>
                        <textarea
                          placeholder="Type here"
                          className="form-control"
                          rows="7"
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="mb-4">
                        <label className="form-label form-label-cate">
                          Loại
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="">Chọn</option>
                          {categorys &&
                            categorys.map((cate) => (
                              <option key={cate._id} value={cate.name}>
                                {cate.name}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Hình ảnh</label>
                        <input
                          type="file"
                          multiple
                          onChange={fileSelectedHandler}
                          className="form-control mt-3"
                        />
                      </div>
                      <div className="mb-4">
                        <div
                          style={{
                            display: "flex",

                            flexWrap: "wrap",
                          }}
                        >
                          {images &&
                            images.map((item) => (
                              <img
                                key={id++}
                                src={`/images/${item}`}
                                alt={item}
                                style={{
                                  width: "90px",
                                  height: "90px",
                                  objectFit: "cover",
                                  marginRight: "10px",
                                  marginBottom: "5px",
                                }}
                              />
                            ))}
                        </div>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="product_discount"
                          className="form-label"
                        >
                          Giảm giá
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_discount"
                          required
                          value={discount}
                          onChange={(e) => setDiscount(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProductMain;
