import { Stack } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import ItemListOrder from "../../../components/client/ItemListOrder";
import { v4 } from "uuid";
import DetailListOrderUser from "../../../components/client/DetailListOrderUser";
import ContainerScoll from "../../../components/client/ContainerScoll";
import ErrorNoItem from "../../../components/client/ErrorNoItem";
import { KEY_USER } from "../../../constant/LocalStored";
import { useNavigate } from "react-router-dom";
import ContentTop from "../../../components/client/ContentTop";
import AxiosUser from "../../../apis/client/AxiosUser";
import {  Pagination } from "@mui/material";
import LoadingCycleFullwitdh from "../../../components/client/LoadingCycleFullwitdh";
export default function ListOrder() {
  const users = JSON.parse(localStorage.getItem(KEY_USER));
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(true);

  const [indexActive, setIndetActive] = useState(null);
  const handleClickSeeMore = (index) => {
    setStatus(false);
    setIndetActive(index);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (users === null) {
      navigate("/login");
    }
  }, [users]);
  const fetchListOrder = useCallback(() => {
    setLoading(true);
    AxiosUser.get(`/api/orders/getOrderUser/${users._id}?pageNumber=${page}`)
      .then((res) => {
        setList(res.data.Orders);
        setPage(res.data.page);
        setCount(res.data.pages);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [page, users._id]);
  useEffect(() => {
    fetchListOrder();
  }, [fetchListOrder]);
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <div>
      {loading ? (
       <LoadingCycleFullwitdh/>
      ) : (
        <div>
          <ContentTop value="Danh sách đơn hàng" />
          {status ? (
            <Stack alignItems="center">
              <ContainerScoll>
                {list.length ? 
                  <Stack spacing={2}>
                    {list &&
                      list.map((e, index) => (
                        <ItemListOrder
                          key={v4()}
                          click={() => handleClickSeeMore(index)}
                          item={e}
                          
                        />
                      ))}
                  </Stack>
                  :<ErrorNoItem />
                }
              </ContainerScoll>
              <Pagination
                onChange={handleChange}
                count={count}
                page={page}
                variant="outlined"
                shape="rounded"
              />
            </Stack>
          ) : (
            <DetailListOrderUser
              click={() => setStatus(true)}
              reFetch={fetchListOrder}
              data={list[indexActive]}
            />
          )}
        </div>
      )}
    </div>
  );
}
