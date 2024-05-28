import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryProduct: "All",
  price: 100000,
  currentPage: 1,
};

export const ProductFilterSlice = createSlice({
  name: "ProductFilterSlice",
  initialState,
  reducers: {
    filterProduct: (state, action) => {
      state.categoryProduct = action.payload.categoryProduct;
      state.price = action.payload.price || 100000;
      state.currentPage = action.payload.currentPage || 1;
    },
  },
});

export const { filterProduct } = ProductFilterSlice.actions;
