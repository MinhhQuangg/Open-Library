import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slice/authSlice";
import { bookSlice, setTotal } from "./slice/bookSlice";

// const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    borrowReducer: bookSlice.reducer,
    // stockDataReducer: priceSlice.reducer,
    authReducer: authSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware().concat(sagaMiddleware),
});

// sagaMiddleware.run(rootSaga);

store.dispatch(setTotal());
