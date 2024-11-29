import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")) || false,
  token: localStorage.getItem("token") || null,
  userEmail: localStorage.getItem("userEmail") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login: (state, action) => {
      const { token, email } = action.payload;

      state.isAuthenticated = true;
      state.token = token;
      state.userEmail = email;

      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;

      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
