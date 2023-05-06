import React, { useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../../../redux/admin/Actions/UserActions";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, TextareaAutosize } from "@mui/material";
import LoadingDashboard from "../../LoadingError/LoadingDashboard";

//Use Hook form with material and yup

export const ContactUs = () => {
  const validationEmailSchema = yup.object().shape({
    subject: yup.string().required("Required"),
    message: yup
      .string()
      .required("Required")
      .min(10, "Must be more 10 character"),
  });
  const dispatch = useDispatch();
  const params = useParams();
  const user = params.id;

  const userSendMail = useSelector((state) => state.userSendMail);
  const { loadingEditMail, errorEditMail, userMail } = userSendMail;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationEmailSchema),
  });
  const onSubmit = (data) => {
    const info = {
      subject: data.subject,
      user_name: data.user_name,
      message: data.message,
      to_email: data.to_email,
    };

    emailjs
      .send("service_zjlqkvu", "template_je05wtb", info, "c-3OgflRoF3ciRdfg")
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
    toast("Gửi mail thành công");
  };

  useEffect(() => {
    dispatch(editUser(user));
  }, [dispatch, user]);
  return (
    <>
      <ToastContainer />
      {loadingEditMail && <LoadingDashboard />}
      {userMail.name && userMail.email && (
        <section className="content-main" style={{ maxWidth: "1200px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              className="content-header"
              style={{ justifyContent: "inherit" }}
            >
              <a className="btn btn-dark text-white" href="/admin/users/">
                Go to users
              </a>
              <h2
                className="content-title"
                style={{ display: "block", width: "50%", textAlign: "center" }}
              >
                Send Mail
              </h2>
            </div>

            <div className="row mb-4">
              <div className="col-xl-8 col-lg-8">
                <div className="card mb-4 shadow-sm">
                  <div className="card-body">
                    <div className="mb-4">
                      <TextField
                        variant="outlined"
                        label="Subject"
                        defaultValue="Deactivate Account"
                        {...register("subject")}
                        error={errors?.subject !== undefined}
                        helperText={errors.subject && errors.subject.message}
                        fullWidth
                      />
                    </div>
                    <div className="mb-4">
                      <TextField
                        variant="outlined"
                        label="User Name"
                        defaultValue={userMail.name}
                        {...register("name")}
                      />
                    </div>
                    <div className="mb-4">
                      <TextareaAutosize
                        aria-label="minimum height"
                        minRows={3}
                        placeholder="Minimum 3 rows"
                        style={{ width: 400 }}
                        {...register("message")}
                        defaultValue="Your account spams too many times and hasn't been used for a long time, so my side will block your account. If you want to know more details, please contact us via hotline: +84777777 or you can contact us by Email : admin@gmail.com . Thank you"
                      />
                      <p className="alert-danger">
                        {errors.message && errors.message.message}
                      </p>
                    </div>
                    <div className="mb-4">
                      <TextField
                        variant="outlined"
                        label="To Email"
                        defaultValue={userMail.email}
                        {...register("to_email")}
                        fullWidth
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-success">
              Send
            </button>
          </form>
        </section>
      )}
    </>
  );
};
