import React, { createContext, useState } from "react";

export const BookContexts = createContext(null);

export const BookContext = ({ children }) => {
  const [borrow, setBorrow] = useState([]);
  const isBookBorrowed = (id) => {
    return borrow && borrow.some((book) => book.id === id);
  };
  return (
    <BookContexts.Provider value={{ borrow, setBorrow, isBookBorrowed }}>
      {children}
    </BookContexts.Provider>
  );
};
