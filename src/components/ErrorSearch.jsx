import { Box } from "@mui/material";
import React from "react";

export const ErrorSearch = ({ message }) => {
  return (
    <Box textAlign="center" fontWeight="bold" fontSize="25px" padding="30px">
      {message}
    </Box>
  );
};
