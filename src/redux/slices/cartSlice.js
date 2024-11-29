import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: JSON.parse(localStorage.getItem("cart")),
  reducers: {
    addCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.qty = existingItem.qty + 1;
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
          state[index].qty = state[index].qty - 1;
        } else {
          state.splice(index, 1);
        }
      }
    },
  },
});

export const { addCart, delCart } = cartSlice.actions;
export default cartSlice.reducer;
