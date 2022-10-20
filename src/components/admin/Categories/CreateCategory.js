import React, { useCallback, useEffect, useRef } from "react";
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
import { useNavigate } from "react-router-dom";

//Use Hook form with material and yup
const validationSchema = yup.object().shape({
  name: yup.string().required("Required"),
});

const CreateCategory = () => {
  const isInitialMount = useRef(true);

  const dispatch = useDispatch();
  const navigator = useNavigate();
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
  const { loading, error, category, success } = categoryCreate;
  const fetch = useCallback(async () => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (category) {
        toast("Add Category Success");
        dispatch({ type: CATEGORY_CREATE_RESET });
      }
    }
  }, [category, dispatch]);
  useEffect(() => {
    fetch();
  }, [fetch, categoryCreate]);

  const submitHandler = async (data) => {
    await dispatch(createCategory(data.name));
    reset();
  };
  // console.log(error);
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
                label="Name"
                {...register("name")}
                error={errors?.name !== undefined}
                helperText={errors.name && errors.name.message}
                fullWidth
              />
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary py-3">
              Create category
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCategory;
