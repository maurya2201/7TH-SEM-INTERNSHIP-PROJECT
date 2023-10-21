import { configureStore } from "@reduxjs/toolkit";
import { userSliceReducer } from "./slice/userSlice";
import { cartSliceReducer } from "./slice/cartSlice";
import { bookSliceReducer } from "./slice/bookSlice";

export const store = configureStore({
  reducer: {
    users: userSliceReducer,
    cart: cartSliceReducer,
    book: bookSliceReducer,
  },
});
