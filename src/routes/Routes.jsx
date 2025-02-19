import React from "react";
import {
  BrowserRouter,
  Route,
  Routes as RouteComponent,
} from "react-router-dom";
import { BookDetails } from "../pages/book/BookDetails";
import { Home } from "../pages/Home";
import { AddBook } from "../pages/book/AddBook";
import { BookList } from "../pages/book/BookList";
import { MyBook } from "../pages/book/MyBook";
import { PageNotFound } from "../pages/error/PageNotFound";
import { Unauthorized } from "../pages/error/Unauthorized";
import { Login } from "../pages/login/Login";
import { Register } from "../pages/login/Register";
import { RequireAuth } from "../auth/RequireAuth";

import { ShoppingCartBook } from "../pages/book/ShoppingCartBook";

export const Routes = () => {
  return (
    <BrowserRouter>
      <RouteComponent>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<RequireAuth />}>
          <Route path="/Home" element={<Home />} />
          <Route path="/BookList/" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/MyBook" element={<MyBook />} />
          <Route path="/AddBook" element={<AddBook />} />
          <Route path="/ShoppingCartBook" element={<ShoppingCartBook />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="/Unauthorized" element={<Unauthorized />} />
      </RouteComponent>
    </BrowserRouter>
  );
};
