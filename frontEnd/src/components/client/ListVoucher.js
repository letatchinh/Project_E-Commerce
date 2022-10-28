import React, { useEffect, useState } from 'react'
import { fetchListVoucher } from '../../apis/client/usersApis';
import { useQuery } from '@tanstack/react-query';
import { KEY_USER } from '../../constant/LocalStored';
import { Stack } from '@mui/system';
import LoadingHomePage from './LoadingHomePage';
import Voucher from './Voucher';
import {v4} from 'uuid'
import {  useSelector } from 'react-redux';

export default function ListVoucher() {
    const user = JSON.parse(localStorage.getItem(KEY_USER)) || ""

    const totalBill = useSelector(state => state.cart.totalBill)
    const taxShip = useSelector(state => state.cart.taxShip)
    const voucher = useSelector(state => state.cart.voucher)
    const query = useQuery([user._id],fetchListVoucher)
    const {data,isLoading} = query
    const [active,setActive] = useState(-1)
    useEffect(() => {
      if(totalBill + taxShip < voucher){
        setActive(-1)
      }
    },[totalBill,taxShip,voucher])
    const handleSetActive = (index) => {
      setActive(index)
    }
    const handleUnSetActive = () => {
      setActive(-1)
    }
  return (
    <Stack spacing={1}>
        {isLoading ? <LoadingHomePage /> : data && data.map((e,i) => <Voucher key={v4()} handleUnSetActive={handleUnSetActive} handleSetActive={() => handleSetActive(i)} active={active === i}  item={e}/>)}
    </Stack>
  )
}
