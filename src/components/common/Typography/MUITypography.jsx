import React from "react";
import { Typography } from "@mui/material";

export const MUITypography = (props) => {
  const { children, ...rest } = props;
  return <Typography {...rest}>{children}</Typography>;
};
