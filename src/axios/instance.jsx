import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const instance = axios.create({
  baseURL: "http://10.66.7.56:8080/api/v1",
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshToken = async () => {
  try {
    const response = await instance.post("/refresh-token", {
      token: localStorage.getItem("refreshToken"),
    });
    const newToken = response.data.accessToken;
    localStorage.setItem("token", newToken);
    return newToken;
  } catch (err) {
    return err;
  }
};

instance.interceptors.request.use(
  async (request) => {
    let token = localStorage.getItem("token");
    if (token) {
      const date = new Date();
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp < date.getTime() / 1000) {
        token = await refreshToken();
      }
      request.headers["Authorization"] = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
