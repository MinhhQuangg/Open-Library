import React, { forwardRef } from "react";
import TextField from "@mui/material/TextField";

export const MUITextField = forwardRef((props, ref) => {
  return (
    <TextField
      {...props}
      fullWidth
      size="small"
      autoComplete="off"
      inputRef={ref}
      type="text"
      sx={{ color: "white" }}
    />
  );
});
