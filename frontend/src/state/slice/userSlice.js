import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstname: "user",
  role: "",
  lastname: "user",
  id: "",
  loggedIn: "",
};

export const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    updateUserFirstName: (state, action) => {
      state.firstname = action.payload;
    },
    removeUserFirstName: (state, action) => {
      state.firstname = action.payload;
    },
    updateUserLastName: (state, action) => {
      state.lastname = action.payload;
    },
    removeUserLastName: (state, action) => {
      state.lastname = action.payload;
    },
    updateUserRole: (state, action) => {
      state.role = action.payload;
    },
    removeUserRole: (state, action) => {
      state.role = action.payload;
    },
    updateUserId: (state, action) => {
      state.id = action.payload;
    },
    removeUserId: (state, action) => {
      state.id = action.payload;
    },
    updateUserLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    removeUserLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
  },
});

export const {
  updateUserFirstName,
  removeUserFirstName,
  updateUserLastName,
  removeUserLastName,
  updateUserRole,
  removeUserRole,
  updateUserId,
  removeUserId,
  updateUserLoggedIn,
  removeUserLoggedIn,
} = userSlice.actions;

export const userSliceReducer = userSlice.reducer;

// export const userSelectoreUserData = useSelector((state) => ({
//   firstname: state.user.firstname,
// }));
