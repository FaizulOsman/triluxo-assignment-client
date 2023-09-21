import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pc: {},
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addComponent: (state, action) => {
      state.pc = { ...state.pc, [action?.payload?.category]: action?.payload };
    },
  },
});

export const { addComponent } = blogSlice.actions;

export default blogSlice.reducer;
