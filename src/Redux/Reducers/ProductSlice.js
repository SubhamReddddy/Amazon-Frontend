import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  product: {},
  success: false,
};

export const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState,
  reducers: {
    SingleProductStore: (state, action) => {
      state.product = action.payload.product;
      state.success = true;
    },
  },
});

export const { SingleProductStore } = ProductSlice.actions;
