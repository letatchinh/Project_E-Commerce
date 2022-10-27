import { Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function TypographyThreeDot({ children, className }) {
  const mainColorText = useSelector((state) => state.colorCommon.mainColorText);
  const [disabled, setDisable] = useState(false);

  useEffect(() => {
    if (children && children.length > 40) {
      setDisable(true);
    }
  }, [children]);
  return (
    <Tooltip
      placement="top"
      PopperProps={{
        disablePortal: disabled,
      }}
      disableFocusListener
      disableTouchListener
      title={disabled ? children : ""}
      arrow
    >
      <Typography
        fontSize="calc(0.35vw + 11px)"
        color={mainColorText}
        className={className}
        variant="body1"
        fontWeight="500"
        textOverflow="ellipsis"
        width="fit-content"
        maxWidth="100%"
        overflow="hidden"
      >
        {children}
      </Typography>
    </Tooltip>
  );
}
