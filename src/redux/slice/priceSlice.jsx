import { createSlice } from "@reduxjs/toolkit";

export const priceSlice = createSlice({
  name: "price",
  initialState: {
    stockData: {},
  },
  reducers: {
    setStockData: (state, action) => {
      state.stockData = action.payload;
    },
  },
});

export const { setStockData } = priceSlice.actions;
