import React, { forwardRef } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const MUISelect = forwardRef((props, ref) => {
  return <Select {...props} inputProps={{ ref }}></Select>;
});
