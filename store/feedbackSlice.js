import { createSlice } from "@reduxjs/toolkit";

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: { isLoading: false, isSuccess: false, isError: false },
  reducers: {
    loading(state) {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    },
    success(state) {
      state.isSuccess = true;
      state.isError = false;
      state.isLoading = false;
    },
    error(state) {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
    },
    cleanup(state) {
      state.isLoading = false;
      state.isLoading = false;
      state.isError = false;
    },
  },
});

export const feedbackActions = feedbackSlice.actions;
export default feedbackSlice.reducer;
