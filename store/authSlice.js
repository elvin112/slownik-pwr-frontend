import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, token: null, expiresIn: null },
  reducers: {
    login(state, { token, expiresIn }) {
      state.isLoggedIn = true;
      state.token = token;
      state.expiresIn = expiresIn;

      localStorage.setItem("token", token);
      localStorage.setItem("expiresIn", expiresIn);
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
