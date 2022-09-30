import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContainerScoll from "./ContainerScoll";
import TextItemListOrder from "./TextItemListOrder";
import { Button } from "@mui/material";
import ItemDetailistOrderUser from "./ItemDetailistOrderUser";
import { v4 } from "uuid";
import TotalBill from "./TotalBill";
import { fetchCancelOrderRequest } from "../../redux/sagas/Mysaga";
export default function DetailListOrderUser({ id,click }) {
  const dispatch = useDispatch()
  const [item, setItem] = useState({});
  const listOrder = useSelector((state) => state.user.loginSuccess.listOrder);
  const user = useSelector((state) => state.user.loginSuccess);
  useEffect(() => {
    const newItem = listOrder.filter((e) => e.id === id);
    setItem(newItem[0]);
  }, []);
  const handleCancelBill = () => {
    const newListorDer = listOrder.filter(e => e.id !== item.id)
    const newUser = {...user,listOrder : newListorDer}
    dispatch(fetchCancelOrderRequest(newUser))
  }
  return (
    <Stack>
      <Stack
        justifyContent="space-between"
        direction="row"
        padding="10px"
        borderBottom="1px solid #CACACA"
        alignItems='center'
      >
      <Button onClick={click} variant="outlined">
        Back
      </Button>
        <TextItemListOrder title="Mã Đơn hàng" value={item.id} />
        <TextItemListOrder
          title="Tình Trạng"
          value={item.status ? "Đang giao" : "Đang đợi phê duyệt"}
        />
      </Stack>
      <ContainerScoll>
        <Stack>
          {item.listProductOrder &&
            item.listProductOrder.map((e) => (
              <ItemDetailistOrderUser key={v4()} value={e} />
            ))}
        </Stack>
      </ContainerScoll>
      <Stack direction="row" alignItems='center'>
      {!item.status && <Button onClick={handleCancelBill} sx={{textTransform : 'capitalize'}} variant="contained" color="error">
        Cancel Order
      </Button>}
        <Stack marginLeft='auto' width="200px">
          <Stack>
            <TotalBill title="Tax Ship" value={item.taxShip} />
            <TotalBill title="Total Bill" value={item.totalBill} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
