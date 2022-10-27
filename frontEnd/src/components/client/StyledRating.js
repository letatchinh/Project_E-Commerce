import React from "react";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";

export default function StyledRating({
  value,
  readOnly,
  precision,
  defaultValue,
  onChange,
  size,
  active
}) {
  const mainColorRating = useSelector(
    (state) => state.colorCommon.mainColorRating
  );

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#faaf00",
    },
    "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
      color: active ? 'white' : mainColorRating,
    },
  });
  return (
    <StyledRating 
      onChange={onChange}
      defaultValue={defaultValue}
      precision={precision}
      value={value}
      readOnly={readOnly}
      size={size ? size : "small"}
    />
  );
}
