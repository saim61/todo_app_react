import { configureStore } from "@reduxjs/toolkit";
import app from "./appSlice.js";
import Auth from "./authSlice.js";
import Task from "./taskSlice.js";
export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    app,
    Auth,
    Task,
  },
});
