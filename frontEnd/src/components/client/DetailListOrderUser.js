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
          title="Status"
          value={isDelivered ? "Shipping" : "Wait Admin Check"}
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
            messenger="Are you want Cancel Bill ?"
            click={handleCancelBill}
          >
            <Button variant="outlined">Cancel Bill</Button>
          </Dialo>
        )}
 <TextItemListOrder title="Address Ship" value={shippingAddress.address} />
        <Stack  width="200px">
          <Stack>
            <TotalBill title="Tax Ship" value={shippingPrice} />
            <TotalBill title="Voucher" value={voucher} />
            <TotalBill title="Total Bill" value={totalPrice} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
