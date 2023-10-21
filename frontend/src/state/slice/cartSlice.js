import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookid: "",
  userid: "",
  name: "",
  price: "",
  description: "",
  page: "",
  quantity: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    updateCartBookId: (state, action) => {
      state.bookid = action.payload;
    },
    removeCartBookId: (state, action) => {
      state.bookid = action.payload;
    },
    updateCartUserId: (state, action) => {
      state.userid = action.payload;
    },
    removeCartUserId: (state, action) => {
      state.userid = action.payload;
    },
    updateCartBookName: (state, action) => {
      state.name = action.payload;
    },
    removeCartBookName: (state, action) => {
      state.name = action.payload;
    },
    updateCartPrice: (state, action) => {
      state.price = action.payload;
    },
    removeCartPrice: (state, action) => {
      state.price = action.payload;
    },
    updateCartBookDescription: (state, action) => {
      state.description = action.payload;
    },
    removeCartBookDescription: (state, action) => {
      state.description = action.payload;
    },
    updateCartBookPage: (state, action) => {
      state.page = action.payload;
    },
    removeCartBookPage: (state, action) => {
      state.page = action.payload;
    },
    updateCartBookQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    removeCartBookQuantity: (state, action) => {
      state.quantity = action.payload;
    },
  },
});

export const {
  updateCartBookId,
  removeCartBookId,
  updateCartUserId,
  removeCartUserId,
  updateCartBookName,
  removeCartBookName,
  updateCartPrice,
  removeCartPrice,
  updateCartBookDescription,
  removeCartBookDescription,
  updateCartBookPage,
  removeCartBookPage,
  updateCartBookQuantity,
  removeCartBookQuantity,
} = cartSlice.actions;

export const cartSliceReducer = cartSlice.reducer;
