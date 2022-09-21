import { Button, Pagination } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import ContentTop from "./ContentTop";
import ItemListPaymentUser from "./ItemListPaymentUser";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { URL_BASE } from "../../constant/UrlConstant";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
export default function ListPaymentUser() {
  const limit = 4;
  const [list, setlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [start, setStart] = useState(0);
  const [page, setPage] = useState(1);
  const user = useSelector((state) => state.user.loginSuccess);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${URL_BASE}listPayment?idUser=${user.id}`)
      .then((res) => {
        setlist(res.data)
        setCurrentItems(res.data.slice(start, start + limit));
        setPageCount(Math.ceil(res.data.length / limit));
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [user]);
  useEffect(() => {
    setCurrentItems(list.slice(start, start + limit));
  }, [page]);
  const handleChange = (event, value) => {
    setPage(value);
    setStart((value - 1) * limit);
  };
  console.log(currentItems);
  return (
    <>
      <ContentTop value={"List Payment"} />
      <Stack width="100%">
        <Stack
          justifyContent="space-between"
          spacing={3}
          direction="row"
          sx={{ padding: "10px" }}
        >
          {currentItems?.map((e) => (
            <ItemListPaymentUser key={v4()} data={e.idProduct} />
          ))}
        </Stack>
        <Stack alignItems="center" spacing={2}>
          <Pagination count={pageCount} page={page} onChange={handleChange} />
        </Stack>
      </Stack>
    </>
  );
}
