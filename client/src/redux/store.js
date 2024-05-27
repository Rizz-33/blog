// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice"; // Import the default export, which is the reducer

export const store = configureStore({
  reducer: {
    user: userReducer, // Use the imported userReducer
  },
});
