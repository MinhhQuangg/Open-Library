import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
  name: "borrow",
  initialState: {
    borrowBook: localStorage.getItem("shoppingCart")
      ? JSON.parse(localStorage.getItem("shoppingCart"))
      : [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    setBorrowBook: (state, action) => {
      const index = state.borrowBook.findIndex(
        (book) => book.id === action.payload.id
      );
      if (index >= 0) {
        state.borrowBook[index].cartQuantity += action.payload.quantity;
      } else {
        const tempProduct = {
          ...action.payload,
          cartQuantity: action.payload.quantity,
        };
        state.borrowBook.push(tempProduct);
      }
      localStorage.setItem("shoppingCart", JSON.stringify(state.borrowBook));
    },
    removeBorrowBook: (state, action) => {
      const newBorrowBook = state.borrowBook.filter(
        (item) => item.id !== action.payload.id
      );
      state.borrowBook = newBorrowBook;
      localStorage.setItem("shoppingCart", JSON.stringify(state.borrowBook));
    },
    decreaseBorrowBook: (state, action) => {
      const index = state.borrowBook.findIndex(
        (book) => book.id === action.payload.id
      );
      if (state.borrowBook[index].cartQuantity > 1) {
        state.borrowBook[index].cartQuantity -= 1;
      } else if (state.borrowBook[index].cartQuantity === 1) {
        const newBorrowBook = state.borrowBook.filter(
          (item) => item.id !== action.payload.id
        );
        state.borrowBook = newBorrowBook;
      }
      localStorage.setItem("shoppingCart", JSON.stringify(state.borrowBook));
    },

    increaseBorrowBook: (state, action) => {
      const index = state.borrowBook.findIndex(
        (book) => book.id === action.payload.id
      );
      state.borrowBook[index].cartQuantity += 1;
    },
    clearBorrowBook: (state) => {
      state.borrowBook = [];
      localStorage.setItem("shoppingCart", JSON.stringify(state.borrowBook));
    },
    setTotal: (state) => {
      let { price, quantity } = state.borrowBook.reduce(
        (total, book) => {
          const { cartQuantity, price } = book;
          total.quantity += cartQuantity;
          total.price += cartQuantity * price;

          return total;
        },
        {
          quantity: 0,
          price: 0,
        }
      );
      state.totalPrice = price;
      state.totalQuantity = quantity;
    },
  },
});

export const {
  setBorrowBook,
  removeBorrowBook,
  decreaseBorrowBook,
  increaseBorrowBook,
  clearBorrowBook,
  setTotal,
} = bookSlice.actions;
export default bookSlice.reducer;
