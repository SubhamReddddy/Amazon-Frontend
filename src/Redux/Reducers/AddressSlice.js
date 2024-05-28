import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: false,
  address: [],
};

export const AddressSlice = createSlice({
  name: "AddressSlice",
  initialState,
  reducers: {
    addAddress: (state, action) => {
      (state.success = action.payload.success),
        (state.address = action.payload.address);
    },
  },
});

export const { addAddress } = AddressSlice.actions;
