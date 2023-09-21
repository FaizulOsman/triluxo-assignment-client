import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/user/userSlice";
import blogReducer from "@/redux/blog/blogSlice";
import apiSlice from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    pcBuilder: blogReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
