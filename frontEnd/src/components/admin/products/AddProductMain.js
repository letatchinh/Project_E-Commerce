import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { createProduct } from "../../../redux/admin/Actions/ProductActions";
import { PRODUCT_CREATE_RESET } from "../../../redux/admin/Constants/ProductContants";
import Message from "../LoadingError/Error";
import LoadingDashboard from "../LoadingError/LoadingDashboard";
import { TextareaAutosize, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { listAllCategorys } from "../../../redux/admin/Actions/CategoryAction";
//Use Hook form with material and yup
const validationSchema = yup.object().shape({
  name: yup.string().required("You Must Enter Name Product"),
  price: yup
    .number()
    .typeError("Bạn phải chỉ định một số cho giá")
    .min(0, "thấp nhất 0.")
    .required("Vui lòng nhập"),
  discount: yup
    .number()
    .typeError("Bạn phải chỉ định một số cho giảm giá")
    .min(0, "thấp nhất 0.")
    .required("Vui lòng nhập"),
  countInStock: yup
    .number()
    .typeError("Bạn phải chỉ định một số cho kho")
    .min(0, "thấp nhất 0.")
    .required("Vui lòng nhập"),
  description: yup
    .string()
    .required("Vui lòng nhập")
    .min(10, "Phải hơn 10 kí tự"),
});

const AddProductMain = () => {
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product } = productCreate;
  // console.log(product);

  const categoryList = useSelector((state) => state.categoryList);
  const { categorys } = categoryList;

  //inittiali
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const fetch = useCallback(async () => {
    await dispatch(listAllCategorys());
    if (product) {
      toast.success("Đã thêm sản phẩm");
      dispatch({ type: PRODUCT_CREATE_RESET });
      setCategory("");
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

  const submitHandler = async (data) => {
    await dispatch(
      createProduct(
        data.name,
        data.price,
        data.description,
        data.countInStock,
        images,
        category,
        data.discount
      )
    );
    reset();
  };
  return (
    <>
      <ToastContainer />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="pcShow">
            <div
              className="content-header"
              style={{ justifyContent: "inherit" }}
            >
              <Link to="/admin/products" className="btn btn-danger text-white">
                Trở về danh sách sản phẩm
              </Link>
              <h2
                className="content-title"
                style={{ display: "block", width: "50%", textAlign: "center" }}
              >
                Thêm sản phẩm
              </h2>
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
                    Trở về danh sách sản phẩm
                  </Link>
                </div>
                <div>
                  <button type="submit" className="btn btn-primary">
                    Tạo mới
                  </button>
                </div>
              </div>
              <h2 className="content-title">Thêm sản phẩm</h2>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <LoadingDashboard />}
                  <div className="mb-4">
                    <TextField
                      variant="outlined"
                      label="Tên"
                      {...register("name")}
                      error={errors?.name !== undefined}
                      helperText={errors.name && errors.name.message}
                      fullWidth
                    />
                  </div>
                  <div className="mb-4">
                    <TextField
                      variant="outlined"
                      label="Giá"
                      {...register("price")}
                      error={errors?.price !== undefined}
                      helperText={errors.price && errors.price.message}
                      fullWidth
                    />
                  </div>
                  <div className="mb-4">
                    <TextField
                      variant="outlined"
                      label="Tồn kho"
                      {...register("countInStock")}
                      error={errors?.countInStock !== undefined}
                      helperText={
                        errors.countInStock && errors.countInStock.message
                      }
                      fullWidth
                    />
                  </div>
                  <div className="mb-4">
                    <TextareaAutosize
                      aria-label="minimum height"
                      minRows={3}
                      placeholder="Mô tả"
                      style={{ width: 400 }}
                      {...register("description")}
                    />
                    <p className="alert-danger">
                      {errors.description && errors.description.message}
                    </p>
                  </div>
                  <div className="mb-4">
                    <label className="form-label form-label-cate">
                      loại
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
                      required
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
                        images.map((item, i) => (
                          <img
                            key={i++}
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
                    <TextField
                      variant="outlined"
                      label="Giảm giá"
                      {...register("discount")}
                      error={errors?.discount !== undefined}
                      helperText={errors.discount && errors.discount.message}
                      fullWidth
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pcShow">
            <div className="content-header">
              <div>
                <button type="submit" className="btn btn-primary">
                  Tạo mới
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
