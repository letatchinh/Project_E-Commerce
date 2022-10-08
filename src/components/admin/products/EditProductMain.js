import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  editProduct,
  updateProduct,
} from "../../../redux/admin/Actions/ProductActions";
import { PRODUCT_UPDATE_RESET } from "../../../redux/admin/Constants/ProductContants";
import Message from "../LoadingError/Error";
// import Loading from "../LoadingError/Loading";
import LoadingDashboard from "../LoadingError/LoadingDashboard";
const EditProductMain = (props) => {
  let id = 0;
  const { productId } = props;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();

  const productEdit = useSelector((state) => state.productEdit);
  const { loading, error, product } = productEdit;

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

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
  // console.log(images);
  const fetch = useCallback(async () => {
    // if (!successUpdate) {
    //   // dispatch({ type: PRODUCT_UPDATE_RESET });
    //   // toast.success("Product Update");
    // } else {

    if (!product.name || product._id !== productId) {
      dispatch(editProduct(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setCountInStock(product.countInStock);
      setCategory(product.category);
      setPrice(product.price);
      setImages(product.images);
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
      })
    );
    if (product.name !== name && !products.includes(product.name)) {
      toast.success("Edit success");
    }
  };
  return (
    <>
      <ToastContainer />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="pcShow">
            <div className="content-header">
              <Link to="/admin/products" className="btn btn-danger text-white">
                Go to products
              </Link>
              <h2 className="content-title">Update Product</h2>
              <div>
                <button type="submit" className="btn btn-primary">
                  Publish now
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
                  Go to products
                </Link>
                <div>
                  <button type="submit" className="btn btn-primary">
                    Publish now
                  </button>
                </div>
              </div>
              <h2 className="content-title">Update Product</h2>
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
                          Product title
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
                          Price
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
                          Count In Stock
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
                        <label className="form-label">Description</label>
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
                          Category
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="trousers">trousers</option>
                          <option value="shirt">shirt</option>
                          <option value="hat">hat</option>
                          <option value="shoe">shoe</option>
                        </select>
                      </div>
                      {/* <div className="mb-4">
                        <label className="form-label">Image</label>
                        <input
                          placeholder="Enter Image URL"
                          className="form-control"
                          type="text"
                          value={image}
                          required
                          onChange={(e) => setImage(e.target.value)}
                        /> */}
                      {/* <input className="form-control mt-3" type="file" /> */}
                      {/* </div> */}
                      <div className="mb-4">
                        <label className="form-label">Image</label>
                        <input
                          type="file"
                          multiple
                          onChange={fileSelectedHandler}
                          className="form-control mt-3"
                        />
                        {/* <input className="form-control mt-3" type="file" /> */}
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
