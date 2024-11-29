import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")) || false,
  token: localStorage.getItem("token") || null,
  userEmail: localStorage.getItem("userEmail") || null,
  userName: localStorage.getItem("userName") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login: (state, action) => {

      const { token, email ,refreshToken,displayName,expiresIn} = action.payload;

      state.isAuthenticated = true;
      state.token = token;
      state.userEmail = email;
      state.refreshToken = refreshToken;
      state.userName = displayName;


      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("token", token);
      localStorage.setItem('tokenExpiry', Date.now() + expiresIn * 1000);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userName", displayName);
    },
    logout: (state) => {

      state.isAuthenticated = false;
      state.token = null;
      state.refreshToken = null;
      state.userEmail = null;
      state.userName = null;

      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("cart");
      localStorage.removeItem("userProfile");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("tokenExpiry");
      localStorage.removeItem("userName");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
