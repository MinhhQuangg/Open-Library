import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "user",
  initialState: {
    login: {
      userToken: null,
      userInfo: null,
      isFetching: null,
      isError: null,
      errorMessage: "",
    },
    logout: {
      isFetching: null,
      isError: null,
      errorMessage: "",
    },
  },
  reducers: {
    setUserToken: (state, action) => {
      state.login.userToken = action.payload;
    },
    loginStart: (state) => {
      state.login.isFetching = true;
      state.login.isError = false;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.userInfo = action.payload;
      state.login.isError = false;
    },
    loginFail: (state, action) => {
      state.login.isFetching = false;
      state.login.isError = true;
      state.login.errorMessage = action.payload;
    },
    logoutStart: (state) => {
      state.logout.isFetching = true;
      state.logout.isError = false;
    },
    logoutSuccess: (state, action) => {
      state.logout.isFetching = false;
      state.login.userInfo = null;
      state.logout.isError = false;
    },
    logoutFail: (state, action) => {
      state.logout.isFetching = false;
      state.logout.isError = true;
      state.logout.errorMessage = action.payload;
    },
  },
});

export const {
  loginSuccess,
  setUserToken,
  loginStart,
  loginFail,
  logoutFail,
  logoutSuccess,
  logoutStart,
} = authSlice.actions;
