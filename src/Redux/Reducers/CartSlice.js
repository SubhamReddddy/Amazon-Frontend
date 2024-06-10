import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

export const CartSlice = createSlice({
  name: "CartSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let isMacth = false;
      let index = 0;
      // console.log(action.payload._id);

      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i]._id === action.payload._id) {
          isMacth = true;
          index = i;
          break;
        } else {
          isMacth = false;
        }
      }

      if (!isMacth) {
        state.cart.push(action.payload);
      } else {
        state.cart[index].quantity++;
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeItem: (state, action) => {
      let isMacth = false;
      let index = 0;
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i]._id === action.payload) {
          isMacth = true;
          index = i;
          break;
        } else {
          isMacth = false;
        }
      }

      if (isMacth) {
        state.cart.splice(index, 1);
      } else {
        console.log("item not found!");
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    updateItem: (state, action) => {
      let isMacth = false;
      let index = 0;
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i]._id === action.payload._id) {
          isMacth = true;
          index = i;
          break;
        } else {
          isMacth = false;
        }
      }
      if (isMacth) {
        state.cart[index] = action.payload;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      } else {
        console.log("item not found!");
      }
    },
    removeAllItems: (state, action) => {
      localStorage.removeItem("cart");
      state.cart = [];
    },
  },
});

export const { addToCart, removeItem, updateItem, removeAllItems } =
  CartSlice.actions;
