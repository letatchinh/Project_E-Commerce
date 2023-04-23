import { Button, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Link } from "react-router-dom";
import MyTypography from "./MyTypography";
export default function OrderSuccess() {
  return (
    <Container sx={{ width: "100%" ,textAlign : 'center' }}>
      <Stack spacing={2} alignItems="center">
        <MyTypography variant="h4" fontWeight="bold">
          Chúc mừng bạn đã đặt hàng thành công !
        </MyTypography>
        <img
          style={{ width: "100px", height: "100px", marginTop: "50px" }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flat_tick_icon.svg/768px-Flat_tick_icon.svg.png"
          alt="ok"
        />
        <MyTypography variant="h6" fontWeight="bold">
          Cảm ơn bạn đã mua hàng
        </MyTypography>
        <MyTypography variant="body1">
          Vui lòng đợi admin kiểm tra đơn hàng
        </MyTypography>
        <Stack spacing={3} direction="row">
          <Link to="/profile_ListOrder">
            <Button variant="contained" startIcon={<ListAltIcon />}>
              Đơn hàng của tôi
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outlined" endIcon={<ShoppingCartIcon />}>
              Đi mua hàng tiếp
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
}
