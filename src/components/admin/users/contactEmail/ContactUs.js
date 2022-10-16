import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";

export const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("subject")} />
      <input {...register("user_name")} />
      <input {...register("message", { required: true })} />
      <input {...register("to_email", { required: true })} />{" "}
      {errors.exampleRequired && <span>This field is required</span>}
      <input type="submit" />
    </form>
  );
};
