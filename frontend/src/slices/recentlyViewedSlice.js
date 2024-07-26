import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  items: [], // Array to store recently viewed item IDs
};

const recentlyViewedSlice = createSlice({
  name: "recentlyViewed",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { itemId } = action.payload;
      state.items.unshift(itemId); 
      const maxItems = 5; 
      state.items = state.items.slice(0, maxItems);
      Cookies.set("recentlyViewed", JSON.stringify(state.items), {
        expires: 7,
      }); 
    },
  },
});

export const { addItem } = recentlyViewedSlice.actions;

export default recentlyViewedSlice.reducer;
