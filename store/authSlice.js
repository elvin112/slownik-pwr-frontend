import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, token: null, expiresIn: null },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.expiresIn = action.payload.expiresIn;

      localStorage.setItem("expiresIn", action.payload.expiresIn);
      localStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.expiresIn = null;

      localStorage.removeItem("token");
      localStorage.removeItem("expiresIn");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
