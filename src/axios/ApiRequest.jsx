import axios from "axios";

import { BASE_URL } from "../constants";

import {
  loginFail,
  loginStart,
  loginSuccess,
  logoutStart,
  logoutSuccess,
  setUserToken,
} from "../redux/slice/authSlice";

const url = BASE_URL;
export const loginRequest = async (data, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(`${url}/auth/login`, data);
    const token = response?.data?.data?.access_token;
    const user = JSON.stringify(response?.data?.data?.user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", user);
    dispatch(setUserToken(token));
    dispatch(loginSuccess(response.data?.data?.user));
    navigate("/home");
  } catch (error) {
    const errorMessage = error?.response?.data?.message || "";
    dispatch(loginFail(errorMessage));
  }
};

export const logoutRequest = async (dispatch, navigate) => {
  dispatch(logoutStart());
  try {
    localStorage.clear();
    navigate("/");
    dispatch(logoutSuccess());
  } catch (error) {}
};
