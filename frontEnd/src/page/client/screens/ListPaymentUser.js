import {  Pagination } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import ContentTop from "../../../components/client/ContentTop";
import ItemListPaymentUser from "../../../components/client/ItemListPaymentUser";
import { v4 } from "uuid";
import { KEY_USER } from "../../../constant/LocalStored";
import { useNavigate } from "react-router-dom";
import AxiosUser from "../../../apis/client/AxiosUser";
import LoadingCycleFullwitdh from "../../../components/client/LoadingCycleFullwitdh";
import ErrorNoItem from "../../../components/client/ErrorNoItem";
export default function ListPaymentUser() {
  const users = JSON.parse(localStorage.getItem(KEY_USER));
  const navigate = useNavigate();
  useEffect(() => {
    if (users === null) {
      navigate("/login");
    }
  }, [users]);
  const [list, setlist] = useState([]);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const fetch = useCallback(async() => {
    setLoading(true)
   await AxiosUser.get(
      `/api/orders/getAllOrderUser/${users._id}?page=${page}`
    ).then((res) => {
      setlist(res.data.ProductUser);
      setCount(res.data.pages)
    })
    setLoading(false)
  },[page])
  useEffect(() => {
    fetch()
  }, [fetch]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <ContentTop value={"Danh sách sản phầm đã mua"} />
      {
        loading ? (<LoadingCycleFullwitdh />) : (list.length !== 0) ?
        ( <Stack width="100%">
        <Stack
          justifyContent="space-between"
          spacing={3}
          sx={{ padding: "10px" }}
        >
          {list?.map((e) => (
            <ItemListPaymentUser key={v4()} data={e} />
          ))}
        </Stack>
        <Stack alignItems="center" spacing={2}>
          <Pagination count={count} page={page} onChange={handleChange} />
        </Stack>
      </Stack>
      
      )
      : <ErrorNoItem />
      
      }
     
    </>
  );
}
