import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};
const addDecimal = (num) => {
  return (Math.round(num * 100) / 100)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const updateCart = (state) => {
  state.itemsPrice = addDecimal(
    state.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
  );
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      if (item <= 0) {
        return item;
      }
      const existItem = state.cartItems.find((x) => x.slug === item.slug);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.slug === existItem.slug ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },

    increaseCartItems: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item.slug === itemId
          ? {
              ...item,
              qty: item.qty + 1,
            }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(state));

      return updateCart(state);
    },

    decreaseCartItems: (state, action) => {
      state.cartItems = state.cartItems.map((item) =>
        item.slug === action.payload && item.qty > 0
          ? { ...item, qty: item.qty - 1 }
          : item
      );

      localStorage.setItem("cart", JSON.stringify(state));
      return updateCart(state);
    },

    removeCartItems: (state, action) => {
      let decreaseItem = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.slug !== decreaseItem
      );
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price, 0)
      );
      localStorage.setItem("cart", JSON.stringify(state));
      return state;
    },


    clearCartItems: (state, action) => {
      state.cartItems = [];
      state.itemsPrice = "";
      localStorage.setItem("cart", JSON.stringify(state));

      return state;
    },
  },
});

export const {
  addToCart,
  increaseCartItems,
  decreaseCartItems,
  removeCartItems,
  clearCartItems,
} = cartSlice.actions;
export default cartSlice.reducer;
