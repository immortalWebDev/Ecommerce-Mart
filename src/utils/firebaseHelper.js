import axios from "axios"; 

const BASE_URL = process.env.REACT_APP_FIREBASE_RTDB;
const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const CREATE_USER = process.env.REACT_APP_FB_USER_PROF_CREATE_UPDATE;
const LOOKUP_USER = process.env.REACT_APP_USER_LOOKUP;


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

    const response = await axios.put(
      `${BASE_URL}/carts/${sanitizedEmail}.json`,
      cart
    );
    console.log("Cart updated in Firebase:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating cart in Firebase:",
      error.response || error.message
    );
    // throw error;
  }
};


//upon login 
export const getCartFromFirebase = async (userEmail) => {
  try {
    const sanitizedEmail = sanitizeEmail(userEmail);

    const response = await axios.get(
      `${BASE_URL}/carts/${sanitizedEmail}.json`
    );
    console.log("Cart fetched from Firebase:", response.data);
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

    const response = await axios.delete(
      `${BASE_URL}/carts/${sanitizedEmail}.json`
    );

    console.log("Cart cleared in Firebase:", response.data);
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

  let updatedProfile;
  try {
    const response = await axios.post(`${CREATE_USER}${API_KEY}`, {
      idToken: idToken,
      displayName: name,
      returnSecureToken: true,
    });
    updatedProfile =  response.data
    return response.data;
  } catch (error) {
    // console.error("Error updating profile:", error.message);
    console.error("Error updating profile:", error.response?.data || error.message);

    //   throw error;
  }finally{
    if (updatedProfile) {
      console.log("Profile updated successfully:", updatedProfile);
    } else {
      console.log("Profile update failed.");
    }

  }
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
