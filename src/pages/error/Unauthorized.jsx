import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MUIButton } from "../../components/common/Button/MUIButton";

export const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <Box textAlign="center">
      <Box fontWeight="bold" fontSize="35px">
        Access restricted
      </Box>
      <Box justifyContent="center" textAlign="center">
        <MUIButton color="primary" onClick={() => navigate("/")}>
          <ArrowBackIcon />
          Back
        </MUIButton>
      </Box>
    </Box>
  );
};
