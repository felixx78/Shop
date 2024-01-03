import { createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../lib/definition";

const initialState = {
  items: JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: { payload: number }) {
      const id = action.payload;

      state.items.push({ productId: id, quantity: 1 });

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    changeQuantity(
      state,
      action: { payload: [index: number, newQuantity: number] },
    ) {
      const [index, newQuantity] = action.payload;

      state.items[index].quantity = newQuantity;

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    deleteItem(state, action: { payload: number }) {
      const index = action.payload;

      state.items = state.items.filter((_, i) => i !== index);

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
