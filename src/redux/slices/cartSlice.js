import { createSlice } from "@reduxjs/toolkit";

const persistCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const getInitialCart = () => {
  const storedCart = localStorage.getItem("cart");
  try {
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (e) {
    console.error("Error parsing cart data", e);
    return []; //if parsing fails
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getInitialCart(),
  reducers: {
    addCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.push({ ...product, qty: 1 });
      }
      persistCartToStorage(state);
    },
    delCart: (state, action) => {
      const product = action.payload;
      const index = state.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        if (state[index].qty > 1) {
          state[index].qty -= 1;
        } else {
          state.splice(index, 1);
        }
      }
      persistCartToStorage(state);
    },
    setCart: (state, action) => {
      persistCartToStorage(action.payload); 
      return action.payload;
    },
    clearCart: (state) => {
      localStorage.removeItem("cart");
      return [];
    },
  },
});

export const { addCart, delCart, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
