import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: null,
    expiresIn: null,
    username: null,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.expiresIn = action.payload.expiresIn;
      state.username = action.payload.username;

      localStorage.setItem("expiresIn", action.payload.expiresIn);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.username);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.expiresIn = null;
      state.username = null;

      localStorage.removeItem("token");
      localStorage.removeItem("expiresIn");
      localStorage.removeItem("username");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
