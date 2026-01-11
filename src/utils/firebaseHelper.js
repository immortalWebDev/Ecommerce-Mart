import axios from "axios";
import { purgeSession } from "./purgeSession";

const BASE_URL = import.meta.env.VITE_FIREBASE_RTDB;
const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
const CREATE_USER = import.meta.env.VITE_FB_USER_PROF_CREATE_UPDATE;
const LOOKUP_USER = import.meta.env.VITE_USER_LOOKUP;
const NEW_TOKEN = import.meta.env.VITE_NEW_JWT_TOKEN;

export const sanitizeEmail = (email) => {
  if (!email) {
    console.error("sanitizeEmail: Email is missing or invalid!");
    throw new Error("Invalid email");
  }
  return email.replace(".", "_").replace("@", "_"); //another way
};

//upon cart updation
export const updateCartInFirebase = async (userEmail, cart) => {
  try {
    const sanitizedEmail = sanitizeEmail(userEmail);
    const token = await getToken(); //  Get the valid token

    const response = await axios.put(
      `${BASE_URL}/carts/${sanitizedEmail}.json?auth=${token}`,
      cart
    );
    // console.log("Cart updated in Firebase:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating cart in Firebase:",
      error.response || error.message
    );
    // throw error;
  }
};

//upon login and profile refresh or page refresh
export const getCartFromFirebase = async (userEmail) => {
  try {
    const sanitizedEmail = sanitizeEmail(userEmail);
    const token = await getToken(); //  Get the valid token

    const response = await axios.get(
      `${BASE_URL}/carts/${sanitizedEmail}.json?auth=${token}`
    );
    // console.log("Cart fetched from Firebase:", response.data);
    return response.data || [];
  } catch (error) {
    console.error(
      "Error retrieving cart from Firebase:",
      error.response || error.message
    );
    // throw error;
  }
};

export const clearCartFirebase = async (userEmail) => {
  try {
    const sanitizedEmail = sanitizeEmail(userEmail);
    const token = await getToken(); // Get the valid token

    const response = await axios.delete(
      `${BASE_URL}/carts/${sanitizedEmail}.json?auth=${token}`
    );

    // console.log("Cart cleared in Firebase:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error clearing cart in Firebase:",
      error.response || error.message
    );
    // throw error;
  }
};

export const updateUserProfile = async (name, idToken) => {
  // let updatedProfile;
  try {
    const response = await axios.post(`${CREATE_USER}${API_KEY}`, {
      idToken: idToken,
      displayName: name,
      returnSecureToken: true,
    });
    // updatedProfile =  response.data
    return response.data;
  } catch (error) {
    // console.error("Error updating profile:", error.message);
    console.error(
      "Error updating profile:",
      error.response?.data || error.message
    );

    //   throw error;
  }
  // finally{
  //   if (updatedProfile) {
  //     console.log("Profile updated successfully:", updatedProfile);
  //   } else {
  //     console.log("Profile update failed.");
  //   }

  // }
};

export const syncCartWithFirebase =
  (userEmail) => async (dispatch, getState) => {
    try {
      if (!userEmail) {
        console.warn("User email is missing! Skipping Firebase cart sync.");
        return;
      }
      const cart = getState().cart;
      await updateCartInFirebase(userEmail, cart);
    } catch (error) {
      console.error("Failed to sync cart with Firebase:", error);
    }
  };

export const fetchUserProfile = async () => {
  const url = `${LOOKUP_USER}${API_KEY}`;

  try {
    let idToken = await getToken();
    const response = await axios.post(url, { idToken });
    const userName = response.data.users[0]?.displayName;

    return userName;
    // console.log(userName)
  } catch (error) {
    console.error(
      "Error fetching user profile:",
      error.response?.data || error
    );
  }
};

// Function to get a fresh token using the refresh token
export const getFreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  try {
    const response = await axios.post(`${NEW_TOKEN}${API_KEY}`, {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    });
    //  console.log(response.data)
    const newIdToken = response.data.id_token;
    const newRefreshToken = response.data.refresh_token;
    const expiresIn = response.data.expires_in;
    // console.log(expiresIn)

    // console.log(response.data); //email doesnt come with this
    // window.location.reload(); //For new token to take effect for profile fetch

    // console.log("Fetched new token from Firebase bcz old token expired");
    // Update tokens in localStorage
    localStorage.setItem("token", newIdToken);
    localStorage.setItem("refreshToken", newRefreshToken);
    localStorage.setItem("tokenExpiry", Date.now() + expiresIn * 1000);
    console.log("Fresh token set");

    return newIdToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw new Error("Failed to refresh token");
  }
};

// Function for gettin valid token
let isRefreshing = false;

export const getToken = async () => {
  const token = localStorage.getItem("token");
  const tokenExpiry = localStorage.getItem("tokenExpiry");

  // Check token valiidity
  if (token && Date.now() < tokenExpiry) {
    return token;
  } else {
    // alert("Session expired. Needs a refresh")
    if (!isRefreshing) {
      isRefreshing = true;
      const wantsToContinue = confirm("Your session has expired. Wanna continue ?");

      console.log(wantsToContinue)
      if(!wantsToContinue)
      {
        purgeSession()
        console.log("session purged upon user request..")
        window.location.href = "/login";
        console.log("And redirected to login..")
        return
      }
      // alert("Session expired. Wanna continue ?");
      const newToken = await getFreshToken();
      window.location.reload();
      return newToken;
    } else {
      // If it's already refreshing, return a pending promise or just wait
      return new Promise(() => {}); // freezes the second call to prevent side-effects
    }

    // // return await getFreshToken();
    // const newToken = await getFreshToken(); // Fetch a new token
    // window.location.reload(); // Reload the page after fetching the new token
    // return newToken; // This will execute before the reload
  }
};
