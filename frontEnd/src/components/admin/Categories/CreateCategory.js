import React, { useCallback, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CATEGORY_CREATE_RESET } from "../../../redux/admin/Constants/CategoryContants";
import { createCategory } from "../../../redux/admin/Actions/CategoryAction";
import Message from "../LoadingError/Error";
import LoadingDashboard from "../LoadingError/LoadingDashboard";

//Use Hook form with material and yup
const validationSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên"),
});

const CreateCategory = () => {
  const dispatch = useDispatch();
  //inittiali
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { loading, error, category } = categoryCreate;
  const fetch = useCallback(async () => {
    if (category) {
      dispatch({ type: CATEGORY_CREATE_RESET });
      toast("Thêm vào giỏ hàng thành công");
    }
  }, [category, dispatch]);
  useEffect(() => {
    fetch();
  }, [fetch, categoryCreate]);

  const submitHandler = async (data) => {
    await dispatch(createCategory(data.name));
    reset();
  };
  return (
    <>
      <ToastContainer />
      <div className="col-md-12 col-lg-4 mb-3">
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mb-4">
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
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary py-3">
              Tạo mới
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCategory;
