import { wait } from "@testing-library/user-event/dist/utils";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { createProduct } from "../../../redux/admin/Actions/ProductActions";
import { PRODUCT_CREATE_RESET } from "../../../redux/admin/Constants/ProductContants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
const AddProductMain = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product } = productCreate;
  console.log(product);
  const fetch = useCallback(async () => {
    if (product) {
      toast.success("Product Added");
      dispatch({ type: PRODUCT_CREATE_RESET });
      setName("");
      setDescription("");
      setCountInStock(0);
      setCategory("");
      setPrice(0);
      setImages([]);
    }
  }, [product, dispatch]);
  useEffect(() => {
    fetch();
  }, [fetch]);
  const fileSelectedHandler = (e) => {
    const newFiles = [];
    for (let i = 0; i < e.target.files.length; i++) {
      newFiles.push(e.target.files[i].name);
    }
    setImages(newFiles);
  };
  // console.log(images);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct(name, price, description, countInStock, images, category)
    );
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
              <h2 className="content-title">Add product</h2>
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
                <div>
                  <Link
                    to="/admin/products"
                    className="btn btn-danger text-white"
                  >
                    Go to products
                  </Link>
                </div>
                <div>
                  <button type="submit" className="btn btn-primary">
                    Publish now
                  </button>
                </div>
              </div>
              <h2 className="content-title">Add product</h2>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
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
                    <label htmlFor="product_category" className="form-label">
                      Category
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_category"
                      required
                      
                    />
                  </div> */}
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
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
