import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSplice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {},
    removeFromBasket: (state, action) => {},
  },
});

export const { addToBasket, removeFromBasket } = basketSplice.actions;

export const selectItems = (state) => state.basket.items;

export default basketSplice.reducer;
