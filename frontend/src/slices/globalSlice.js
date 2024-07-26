import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  darkMode: localStorage.getItem("darkMode")
    ? JSON.parse(localStorage.getItem("darkMode"))
    : false,
  cartCard: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggler: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", state.darkMode);
    },
    toggleCart: (state) => {
      state.cartCard = !state.cartCard;
    },
  },
});

export const { toggler, toggleCart } = globalSlice.actions;

export default globalSlice.reducer;
