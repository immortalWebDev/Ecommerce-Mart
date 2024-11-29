import axios from "axios"; 

const BASE_URL = process.env.REACT_APP_FIREBASE_RTDB;


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


