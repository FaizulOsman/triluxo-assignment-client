import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/user/userSlice";
import pcBuilderReducer from "@/redux/test/testSlice";
import apiSlice from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    pcBuilder: pcBuilderReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
