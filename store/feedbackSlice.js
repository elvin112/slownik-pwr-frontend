import { createSlice } from "@reduxjs/toolkit";

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorText: null,
    successText: null,
  },
  reducers: {
    loading(state) {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    },
    success(state, action) {
      state.isSuccess = true;
      state.isError = false;
      state.isLoading = false;
      state.successText = action.payload;
    },
    error(state, action) {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.errorText = action.payload;
    },
    cleanup(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;

      state.successText = null;
      state.errorText = null;
    },
  },
});

export const feedbackActions = feedbackSlice.actions;
export default feedbackSlice.reducer;
