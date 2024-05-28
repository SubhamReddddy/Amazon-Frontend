import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totalPages: 1,
  success: false,
};

export const ProductStoreSlice = createSlice({
  name: "ProductStoreSlice",
  initialState,
  reducers: {
    ProductStore: (state, action) => {
      state.products = action.payload.products;
      state.totalPages = action.payload.totalPages;
      state.success = true;
    },
  },
});

export const { ProductStore } = ProductStoreSlice.actions;
