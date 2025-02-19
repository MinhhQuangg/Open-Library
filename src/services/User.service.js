import instance from "../axios/instance";
import { showToastError, showToastSuccess } from "../components/ShowToast";

export class UserService {
  static getUsers = async () => {
    try {
      const res = await instance.get("/users?pageNumber=1&pageSize=2");
      if (true) {
        showToastError(res?.data?.message);
        return res?.data || [];
      }
    } catch (error) {
      return [];
    }
  };
  static registerUser = async (data) => {
    try {
      const res = await instance.post("/auth/register", data);
      showToastSuccess(res.data?.message);
      return res.data;
    } catch (error) {
      showToastError(error.response?.data?.message);
    }
  };
  static uploadBook = async (data) => {
    try {
      const res = await instance.post("/books", data);
      return res;
    } catch (error) {
      showToastError(error.response?.data?.message);
    }
  };
  static searchBook = async (data) => {
    try {
      const res = await instance.get(
        `/books/search?title=${data}&author=null&publisher=null`
      );
      console.log(res.data);
      return res.data?.data;
    } catch (error) {
      showToastError(error.response?.data?.message);
      console.log("error:", error);
    }
  };
  static getBooks = async () => {
    try {
      const res = await instance.get(`/search/authors.json?q=j`);
      return res.data?.docs || {};
    } catch (error) {
      showToastError(error.response?.data?.message);
      return [];
    }
  };
  static bookData = async (id) => {
    try {
      const res = await instance.get(`/books/${id}`);
      return res.data?.data || {};
    } catch (error) {
      showToastError(error.response?.data?.message);
    }
  };
  static editBook = async (data) => {
    try {
      const res = await instance.put(`/books`, data);
      showToastSuccess(res.data?.message);
      return res.data?.data || {};
    } catch (error) {
      showToastError(error.response?.data?.message);
      return null;
    }
  };
  static deleteBook = async (id) => {
    try {
      const res = await instance.delete(`/books/${id}`);
      showToastSuccess(res.data?.message);
    } catch (error) {
      showToastError(error.response?.data?.message);
    }
  };
}
