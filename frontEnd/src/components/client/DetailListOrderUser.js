import { Stack } from "@mui/system";
import React from "react";
import ContainerScoll from "./ContainerScoll";
import TextItemListOrder from "./TextItemListOrder";
import { Button } from "@mui/material";
import ItemDetailistOrderUser from "./ItemDetailistOrderUser";
import { v4 } from "uuid";
import TotalBill from "./TotalBill";
import Dialo from "./Dialo";
import AxiosUser from "../../apis/client/AxiosUser";
import ToastSuccess from "./ToastSuccess";
import ToastError from "./ToastError";
export default function DetailListOrderUser({ click, data, reFetch }) {
  const { _id, isDelivered, orderItem, shippingPrice, totalPrice, voucher,shippingAddress } =
    data;
  const handleCancelBill = async () => {
    AxiosUser.delete(`/api/orders/deleteById/${_id}`)
      .then((res) => {
        ToastSuccess("Xoá thành công");
        click();
        reFetch();
      })
      .catch((err) => ToastError("Xoá thất bại"));
  };
  return (
    <Stack>
      <Stack
        justifyContent="space-between"
        direction={{md : "row", sm: "column", xs: "column" }}
        padding="10px"
        borderBottom="1px solid #CACACA"
        alignItems={{ sm: "center", xs: "flex-start" }}
        spacing={1}
      >
        <Button onClick={click} variant="outlined">
          Back
        </Button>
        <TextItemListOrder title="Bill Id" value={_id} />
       
        <TextItemListOrder
          title="Trạng thái"
          value={isDelivered ? "Đang Ship" : "Đợi admin duyệt"}
        />
      </Stack>
      <ContainerScoll>
        <Stack>
          {orderItem &&
            orderItem.map((e) => (
              <ItemDetailistOrderUser key={v4()} value={e} />
            ))}
        </Stack>
      </ContainerScoll>
      <Stack direction="row" alignItems="center" justifyContent='space-between'>
        {!isDelivered && (
          <Dialo
            messenger="Bạn muốn huỷ đơn ?"
            click={handleCancelBill}
          >
            <Button variant="outlined">Huỷ đơn</Button>
          </Dialo>
        )}
 <TextItemListOrder title="Địa chỉ ship" value={shippingAddress.address} />
        <Stack  width="200px">
          <Stack>
            <TotalBill title="Phí ship" value={shippingPrice} />
            {/* <TotalBill title="Voucher" value={voucher} /> */}
            <TotalBill title="Tổng đơn hàng" value={totalPrice} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
