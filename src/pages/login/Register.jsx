import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { MUILoadingButton } from "../../components/common/Button/LoadingButton";
import { MUIButton } from "../../components/common/Button/MUIButton";
import { MUITextField } from "../../components/common/TextField/MUITextField";
import { UserService } from "../../services/User.service";

const schema = yup
  .object({
    name: yup.string().required("name is required"),
    password: yup.string().min(6).required("password is required"),
    email: yup.string().email().required("email is required"),
    age: yup
      .number()
      .typeError("age must be a number")
      .min(1, "age must be at least 1")
      .required("age is required"),
    address: yup.string().required("address is required"),
  })
  .required();

export const Register = () => {
  const { t, i18n } = useTranslation("register");
  const [language, setLanguage] = useState("en");
  useEffect(() => {
    document.title = "Register | Library";
  }, []);
  const navigate = useNavigate();
  const formContext = useForm({
    defaultValues: {},
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const { register, control, handleSubmit, formState, reset } = formContext;
  const { errors } = formState;
  const { mutate, isPending } = useMutation({
    mutationFn: async (payload) => {
      await UserService.registerUser(payload);
      if (true) {
        reset();
        navigate("/");
      }
    },
  });
  const onSubmit = handleSubmit((data) => {
    mutate({ ...data, gender: String(data?.gender).toUpperCase() });
  });
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setLanguage(language);
  };

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  return (
    <form>
      <Grid
        container
        alignContent="center"
        justifyContent="center"
        m="0 auto"
        height="100vh"
      >
        <Grid item xs={4.5} />

        <Grid
          item
          xs={3}
          border="2px solid lightblack"
          boxShadow="0 0 8px #888888"
          borderRadius="15px"
        >
          <Box
            justifyContent="space-between"
            flexDirection="column"
            display="flex"
            maxHeight="90vh"
          >
            <Box
              marginTop="10px"
              sx={{ fontSize: "50px" }}
              // paddingBottom={"30px"}
              textAlign="center"
              fontWeight="bold"
            >
              {t("register")}
            </Box>
            <Box p={3} overflow="auto" height="100%">
              <Box
                display="flex"
                alignItems="flex-end"
                fontSize="17px"
                marginBottom="2px"
              >
                {t("fullname")}
                <Typography color="red">*</Typography>
              </Box>
              <MUITextField
                variant="outlined"
                // placeholder={"name"}
                {...register("name")}
              />
              <Box color="red">{errors.name?.message}</Box>
              {/* <Box
                display="flex"
                alignItems="flex-end"
                fontSize="17px"
                marginBottom="5px"
                marginTop="10px"
              >
                {t("password")}
                <Typography color="red">*</Typography>
              </Box>
              <TextField
                type="password"
                size="small"
                fullWidth
                variant="outlined"
                // placeholder={"name"}
                {...register("password")}
              />
              <Box color="red">{errors.password?.message}</Box> */}
              <Box
                display="flex"
                alignItems="flex-end"
                fontSize="17px"
                marginBottom="5px"
                marginTop="10px"
              >
                Email
                <Typography color="red">*</Typography>
              </Box>
              <TextField
                type="email"
                variant="outlined"
                size="small"
                fullWidth
                // placeholder={"name"}
                {...register("email")}
              />
              <Box color="red">{errors.email?.message}</Box>
              <Box
                display="flex"
                alignItems="flex-end"
                fontSize="17px"
                marginBottom="5px"
                marginTop="10px"
              >
                {t("age")}
                <Typography color="red">*</Typography>
              </Box>
              {/* <TextField
                variant="outlined"
                fullWidth
                size="small"
                // onChange={(e) => {
                //   if (isNaN(e.target.value)) {
                //     return console.log("Input value:", e.target.value);
                //   }
                // }}
                type="text"
                {...register("age")}
              /> */}
              <Controller
                name="age"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    size="small"
                    {...field}
                    value={inputValue}
                    onChange={(e) => {
                      handleInputChange(e);
                      // field.onChange(e);
                    }}
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  />
                )}
              />
              <Box color="red">{errors.age?.message}</Box>
              <Box
                display="flex"
                alignItems="flex-end"
                fontSize="17px"
                marginBottom="5px"
                marginTop="10px"
              >
                {t("gender")}
                <Typography color="red">*</Typography>
              </Box>
              <Controller
                name="gender"
                control={control}
                defaultValue="male"
                render={({ field }) => (
                  <Select {...field} fullWidth size="small">
                    <MenuItem value="male">{t("male")}</MenuItem>
                    <MenuItem value="female">{t("female")}</MenuItem>
                    <MenuItem value="other">{t("other")}</MenuItem>
                  </Select>
                )}
                rules={{
                  required: { value: true, message: "Gender is required" },
                }}
              />
              <Box color="red">{errors.gender?.message}</Box>
              <Box
                display="flex"
                alignItems="flex-end"
                fontSize="17px"
                marginBottom="5px"
                marginTop="10px"
              >
                {t("address")}
                <Typography color="red">*</Typography>
              </Box>
              <MUITextField variant="outlined" {...register("address")} />
              <Box color="red">{errors.address?.message}</Box>
            </Box>
            <Box textAlign="center">
              {!isPending && (
                <MUIButton
                  onClick={onSubmit}
                  sx={{
                    mt: 5,
                    mb: 5,
                    width: "70%",
                    borderRadius: "20px",
                    fontSize: "15px",
                  }}
                >
                  {t("sign up")}
                </MUIButton>
              )}
              {isPending && <MUILoadingButton>{t("sign up")}</MUILoadingButton>}
            </Box>
            <Box justifyContent="center" display="flex">
              <Box alignContent="center">{t("language")}:</Box>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select
                  value={language}
                  onChange={(e) => changeLanguage(e.target.value)}
                >
                  <MenuItem value="vi">Tiếng Việt</MenuItem>
                  <MenuItem value="en">English</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box justifyContent="center" textAlign="center">
              <Button color="primary" onClick={() => navigate("/")}>
                <ArrowBackIcon />
                Back
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4.5} />
      </Grid>
    </form>
  );
};
