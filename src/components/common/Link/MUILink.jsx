import React, { forwardRef } from "react";
import { Link } from "@mui/material";

export const MUILink = forwardRef((props, ref) => {
  const { children, ...rest } = props;
  return (
    <Link ref={ref} {...rest} alignContent="center">
      {children}
    </Link>
  );
});
