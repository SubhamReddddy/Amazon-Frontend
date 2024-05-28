import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: false,
  user: {},
  update: false,
  payment: false,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    getUserDetails: (state, action) => {
      state.success = true;
      state.user = action.payload;
      state.update = false;
      state.payment = false;
    },
    userUpdate: (state, action) => {
      state.success = true;
      state.user = action.payload.user;
      state.update = action.payload.update;
      state.payment = action.payload.payment || false;
    },
  },
});

export const { getUserDetails, userUpdate } = userSlice.actions;
