import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import LoadingCycleFullwitdh from "../../../components/client/LoadingCycleFullwitdh";
import FormCodeConfirm from "../../../components/client/FormCodeConfirm";
import FormNewPassword from "../../../components/client/FormNewPassword";
import MyTypography from "../../../components/client/MyTypography";
import { useDispatch } from "react-redux";
import { fetchCheckUser } from "../../../apis/client/usersApis";
import AxiosUser from "../../../apis/client/AxiosUser";

export default function ForgotPassword() {
  const [status, setStatus] = useState(1);
  const [userNotFound, setUserNotFound] = useState(false);
  const [email,setEmail] = useState("")
  const [code, setCode] = useState(0);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setCode(Math.random().toString().slice(2, 8));
  }, []);
  const schema = yup.object().shape({
    email: yup.string().required("Required").email(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
      
    await AxiosUser.put("/api/users/resetPassword", {
      email: data.email,
    }).then(async(res) => {
            await setLoading(true)
        const formInfo = {
            to_name : data.email,
            to_email : data.email,
            code : code
        }
        emailjs.send('service_vgfk2fw', 'template_5hh6rll', formInfo, 'aimbcoRqHHjBFFklB')
      .then((result) => {
        setLoading(false)
        setStatus(2)
        setEmail(data.email)
      }, (error) => {
          console.log(error.text);
      });
    }).catch(err => setUserNotFound(true))
  };
  return (
    <div style={{ background: "#F8F9FD", padding: "100px 0" }}>
      <Container sx={{ width: { md: "60%", xs: "100%" } }}>
        <Paper
          elevation={3}
          sx={{ display: "flex", flexDirection: { md: "row", xs: "column" } }}
        >
          <form
            style={{
              flex: 1,
              padding: "50px",
              display: status === 1 ? "block" : "none",
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack alignItems={"center"} spacing={3}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <Typography variant="h6" color="#888">
                  Forgot Password
                </Typography>
                <Stack direction="row" spacing={1}>
                  <FacebookOutlinedIcon
                    color="primary"
                    sx={{ cursor: "pointer", fontSize: "30px" }}
                  />
                  <img
                    style={{
                      width: "28px",
                      height: "28px",
                      marginTop: "1px",
                      cursor: "pointer",
                    }}
                    src="https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK"
                    alt="google"
                  />
                </Stack>
              </Stack>
              <MyTypography fontSize="1rem">
               Nhập gmail để chúng tôi gửi mã về để lấy lại nick
              </MyTypography>
              <TextField
                size="small"
                {...register("email")}
                fullWidth
                label="Email"
                variant="outlined"
                error={errors.email !== undefined}
                helperText={errors.email && errors?.email.message}
              />
              <Button
                disabled={loading}
                sx={{
                  backgroundImage: "linear-gradient(45deg, #E26560, #E36183)",
                  borderRadius: "50px",
                }}
                fullWidth
                type="submit"
                variant="contained"
              >
                {loading ? <LoadingCycleFullwitdh size="30px" /> : "Gửi"}
              </Button>
              <Alert
                sx={{ width: "100%", display: userNotFound ? "flex" : "none" }}
                severity="error"
              >
                Không tìm thấy email
              </Alert>
            </Stack>
          </form>

          <FormCodeConfirm
            display={status === 2 ? "block" : "none"}
            setStatus={() => setStatus(3)}
            code={code}
          />
          <FormNewPassword email={email} display={status === 3 ? "block" : "none"} />
          <Stack
            padding="20px 0"
            spacing={2}
            color="white"
            justifyContent="center"
            alignItems="center"
            sx={{
              width: { md: "50%", sm: "100%" },
              backgroundImage: "linear-gradient(45deg, #E26560, #E36183)",
            }}
          >
            <Typography variant="h5" fontWeight="bold">
             Chào mừng đến với quên mật khẩu
            </Typography>
            <Typography fontWeight="300">Bạn đã có Tài khoản</Typography>
            <Link to="/login">
              {" "}
              <Button
                sx={{
                  color: "white",
                  borderColor: "white",
                  borderRadius: "40px",
                }}
                variant="outlined"
              >
                Đăng nhập
              </Button>
            </Link>
          </Stack>
        </Paper>
      </Container>
    </div>
  );
}
