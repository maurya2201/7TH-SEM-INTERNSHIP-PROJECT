import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    updateSearch: (state, action) => {
      state.search = action.payload;
    },
    removeSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { updateSearch, removeSearch } = seadhSlice.actions;

export const searchSliceReducer = searchSlice.reducer;

// export const userSelectoreUserData = useSelector((state) => ({
//   firstname: state.user.firstname,
// }));
