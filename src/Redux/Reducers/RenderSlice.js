import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  render: false,
};

export const RenderSlice = createSlice({
  name: "RenderSlice",
  initialState,
  reducers: {
    renderUpdate: (state, action) => {
      state.render = action.payload.render;
    },
  },
});

export const { renderUpdate } = RenderSlice.actions;
