import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  description: "",
  page: "",
  price: "",
  cover: "",
};

export const bookSlice = createSlice({
  name: "book",
  initialState: initialState,
  reducers: {
    updateBookName: (state, action) => {
      state.name = action.payload;
    },
    removeBookName: (state, action) => {
      state.name = action.payload;
    },
    updateBookId: (state, action) => {
      state.id = action.payload;
    },
    removeBookId: (state, action) => {
      state.id = action.payload;
    },
    updateBookPage: (state, action) => {
      state.page = action.payload;
    },
    removeBookPage: (state, action) => {
      state.page = action.payload;
    },
    updateBookPrice: (state, action) => {
      state.price = action.payload;
    },
    removeBookPrice: (state, action) => {
      state.price = action.payload;
    },
    updateBookDescription: (state, action) => {
      state.description = action.payload;
    },
    removeBookDescription: (state, action) => {
      state.description = action.payload;
    },
    updateBookCover: (state, action) => {
      state.cover = action.payload;
    },
    removeBookCover: (state, action) => {
      state.cover = action.payload;
    },
  },
});

export const {
  updateBookName,
  removeBookName,
  updateBookId,
  removeBookId,
  updateBookPage,
  removeBookPage,
  updateBookPrice,
  removeBookPrice,
  updateBookDescription,
  removeBookDescription,
  updateBookCover,
  removeBookCover,
} = bookSlice.actions;

export const bookSliceReducer = bookSlice.reducer;

// export const userSelectoreUserData = useSelector((state) => ({
//   firstname: state.user.firstname,
// }));
