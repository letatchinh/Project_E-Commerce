import React, { useEffect, useState } from "react";
import moment from "moment";
import "../StyleComponent/CountDownTimer.css";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";
import MyTypography from "./MyTypography";
export default function CountdownTimer({timer}) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [showSemicolon, setShowSemicolon] = useState(false);
  useEffect(() => {
    setInterval(() => {
      const now = moment();
      const then = moment(`2022-10-15 ${timer ? timer : "10:00:00"}`, "YYYY-MM-DD hh:mm:ss");
      const countdown = moment(then - now);
      setHours(countdown.format("HH"));
      setMinutes(countdown.format("mm"));
      setSeconds(countdown.format("ss"));
    }, 1000);
  }, []);

  return (
    <Stack direction="row" spacing={1}>
      
      <div style={{ background: "linear-gradient(rgb(238, 77, 45), rgb(255, 115, 55))", color: "white", padding: "3px 10px" ,borderRadius : '5px' }}>
        <Typography>{hours}</Typography>
      </div>
      <MyTypography color='orange'>:</MyTypography>
      <div style={{ background: "linear-gradient(rgb(238, 77, 45), rgb(255, 115, 55))", color: "white", padding: "3px 10px",borderRadius : '5px' }}>
        {" "}
        <Typography>{minutes}</Typography>
      </div>
      <MyTypography color='orange'>:</MyTypography>
      <div style={{ background: "linear-gradient(rgb(238, 77, 45), rgb(255, 115, 55))", color: "white", padding: "3px 10px",borderRadius : '5px' }}>
        {" "}
        <Typography>{seconds}</Typography>
      </div>
    </Stack>
  );
}
