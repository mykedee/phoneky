import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import globalSliceReducer from "./slices/globalSlice";
import authSliceReducer from "./slices/authSlice";
import cartSliceReducer from "./slices/cartSlice";
import recentlyViewedReducer from "./slices/recentlyViewedSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    global: globalSliceReducer,
    cart: cartSliceReducer,
    auth: authSliceReducer,
    recentlyViewed: recentlyViewedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export default store;
