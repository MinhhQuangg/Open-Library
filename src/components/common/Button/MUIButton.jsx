import React, { forwardRef } from "react";
import Button from "@mui/material/Button";

export const MUIButton = forwardRef((props, ref) => {
  const { children, ...rest } = props;
  return (
    <Button {...rest} ref={ref} variant="contained">
      {children}
    </Button>
  );
});
