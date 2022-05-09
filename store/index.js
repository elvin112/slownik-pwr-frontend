import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import feedbackReducer from "./feedbackSlice";

const store = configureStore({
  reducer: { auth: authReducer, feedback: feedbackReducer },
});

export default store;
