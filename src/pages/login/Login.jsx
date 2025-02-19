import { yupResolver } from "@hookform/resolvers/yup";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import {
  Box,
  Checkbox,
  FormControl,
  Grid2,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { loginRequest } from "../../axios/ApiRequest";
import { MUILoadingButton } from "../../components/common/Button/LoadingButton";
import { MUIButton } from "../../components/common/Button/MUIButton";
import { MUILink } from "../../components/common/Link/MUILink";
import { MUITextField } from "../../components/common/TextField/MUITextField";
import { ThemeContext, tokens } from "../../context/Theme";
import { Search } from "../../components/Search";

export const Login = () => {
  const { t, i18n } = useTranslation();
  const schema = yup
    .object({
      username: yup
        .string()
        .email(t("email error"))
        .required(t("username required")),
      password: yup.string().required(t("password required")),
    })
    .required();
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const setTheme = useContext(ThemeContext);
  const formContext = useForm({ resolver: yupResolver(schema) });
  const { register, handleSubmit, formState } = formContext;
  const { errors } = formState;
  const [language, setLanguage] = useState("en");
  const [showPassword, setShowPassword] = useState(false);
  const { isFetching, isError, errorMessage } = useSelector(
    (state) => state.authReducer.login
  );
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "LogIn | Library";
  }, []);

  const handleVisibility = () =>
    setShowPassword((showPassword) => !showPassword);
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setLanguage(language);
  };

  const onSubmit = async (data) => {
    loginRequest(data, dispatch, navigate);
  };
  console.log("1");
  // const handleClick = () => {
  //   setError("username", { message: "123" });
  // };

  // sessionStorage.setItem("item", "23");

  return (
    <form>
      <Grid2
        container
        alignContent="center"
        justifyContent="center"
        height="100vh"
        sx={{ backgroundColor: colors.primary[900] }}
      >
        <Grid2
          item
          xs={3}
          border="2px solid lightblack"
          height="70%"
          boxShadow="0 0 8px #888888"
          borderRadius="15px"
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="100%"
          >
            <Box p={3}>
              <Box
                sx={{ fontSize: "50px" }}
                paddingBottom={"30px"}
                textAlign="center"
                fontWeight="bold"
              >
                {t("login")}
              </Box>
              {isError && (
                <Box color="red" textAlign="center" paddingBottom="10px">
                  {errorMessage}
                </Box>
              )}
              <Box display="flex" alignItems="flex-end" fontSize="18px">
                <Typography>{t("username")}</Typography>
              </Box>
              <MUITextField
                variant="standard"
                placeholder={t("type username")}
                {...register("username", {
                  required: { value: true, message: "Username is required" },
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Box color="red">{errors.username?.message}</Box>
              <Box
                paddingTop={"15px"}
                display="flex"
                alignItems="flex-end"
                fontSize="18px"
              >
                {t("password")}
              </Box>
              <TextField
                variant="standard"
                placeholder={t("type password")}
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                fullWidth
                {...register("password", {
                  required: { value: true, message: "Password is required" },
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleVisibility}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box color="red">{errors.password?.message}</Box>
              <Stack
                direction="row"
                spacing={1}
                size="small"
                justifyContent="space-between"
              >
                <Stack direction="row">
                  <Checkbox size="small" sx={{ ml: -1 }} />
                  <Typography alignContent="center">
                    {t("remember me")}
                  </Typography>
                </Stack>
                <MUILink href="#">{t("forget password")}?</MUILink>
              </Stack>

              <Box display="grid" justifyItems="center">
                {!isFetching && (
                  <MUIButton
                    onClick={handleSubmit(onSubmit)}
                    sx={{
                      mt: 5,
                      mb: 5,
                      width: "70%",
                      borderRadius: "20px",
                      fontSize: "15px",
                    }}
                  >
                    {t("login")}
                  </MUIButton>
                )}
                {isFetching && (
                  <MUILoadingButton>{t("login")}</MUILoadingButton>
                )}
              </Box>

              <Box display="flex" justifyContent="center" alignContent="center">
                <Typography>{t("not have account")}?&nbsp;</Typography>
                <Link to="/Register">{t("register")}</Link>
              </Box>
            </Box>
            <Box justifyContent="center" display="flex" mb={3}>
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
            {/* <DevTool control={control} /> */}
            <Box marginTop="10px">
              <IconButton onClick={setTheme.togglesetTheme}>
                {theme.palette.mode === "dark" ? (
                  <DarkModeOutlined />
                ) : (
                  <LightModeOutlined />
                )}
              </IconButton>
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </form>
  );
};
