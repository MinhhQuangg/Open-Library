import { LoadingButton } from "@mui/lab";
import React from "react";

export const MUILoadingButton = ({ children }) => {
  return (
    <LoadingButton
      loading
      variant="outlined"
      sx={{
        mt: 5,
        mb: 5,
        width: "70%",
        borderRadius: "20px",
        fontSize: "15px",
      }}
    >
      {children}
    </LoadingButton>
  );
};
