import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack } from '@mui/system';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from "yup";
import { KEY_USER } from '../../constant/LocalStored';
import { fetchAddCommentRequest } from '../../redux/sagas/Mysaga';
import MyTypography from './MyTypography';
import StyledRating from './StyledRating';
import MyTextField from './MyTextField'
import { Alert, Button } from '@mui/material';
import SendIcon from "@mui/icons-material/Send";
import { useQuery } from '@tanstack/react-query';
import { fetchIsCheckPayment } from '../../apis/client/ProductApis';

export default function FormRating({_id,handleSetItem,handleSetCount}) {
    const user = JSON.parse(localStorage.getItem(KEY_USER)) || "";
    const mainColorText = useSelector((state) => state.colorCommon.mainColorText);
    const dispatch = useDispatch()
    const schema = yup.object().shape({
        comment: yup.string().required("Required").min(2).max(50),
      });
      const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });
      const [value, setValue] = useState(null);
      const onSubmit = async(data) => {
        const newComment = {
          name: user.name,
          comment: data.comment,
          rating: value,
          user: user._id,
          product: _id,
        };
       await dispatch(fetchAddCommentRequest({newComment,_id,handleSetItem,setCount : handleSetCount,reset}))
       setValue(null)
      };
      const { data, isLoading } = useQuery([user._id, _id], fetchIsCheckPayment, {
        enabled: _id !== undefined,
      });
  return (
    <>
        <Box width="80%">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack id="comment" spacing={2}>
                          <MyTypography variant="h6" color={mainColorText}>
                            Viết bình luận
                          </MyTypography>
                          <MyTypography variant="h5" color={mainColorText}>
                            Số sao
                          </MyTypography>
                          <StyledRating
                            precision={0.5}
                            value={value}
                            onChange={(event, newValue) => {
                              setValue(newValue);
                            }}
                          />
                          <MyTypography variant="h5" color={mainColorText}>
                            Đánh giá
                          </MyTypography>
                          <MyTextField 
                            {...register("comment")}
                            label="Viết đánh giá ở đây ..."
                            variant="outlined"
                          />
                          <Button
                            disabled={value === null || !data.isPayment}
                            type="submit"
                            sx={{ width: "40%", marginLeft: "auto!important" }}
                            variant="contained"
                            endIcon={<SendIcon />}
                          >
                            {isLoading ? "Checking..." : "Send"}
                          </Button>
      {data && !data.isPayment && (
        <Alert severity="error">Bạn phải mua để đánh giá</Alert>
      )}
                        </Stack>
                      </form>
                    </Box>
                    {errors.comment && errors.comment.type === "required" && (
                      <Alert severity="error">{errors.comment.message}</Alert>
                    )}
                    {errors.comment && errors.comment.type === "min" && (
                      <Alert severity="error">{errors.comment.message}</Alert>
                    )}
                    {errors.comment && errors.comment.type === "max" && (
                      <Alert severity="error">{errors.comment.message}</Alert>
                    )}
    </>
  )
}
