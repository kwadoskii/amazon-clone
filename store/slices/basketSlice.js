import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSplice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    //actions
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex((basketItem) => basketItem.id === action.payload.id);

      let newBasket = [...state.items];

      index >= 0 ? newBasket.splice(index, 1) : null;

      state.items = newBasket;
    },
    clearBasket: (state) => {
      state.items = [];
    },
  },
});

export const { addToBasket, removeFromBasket, clearBasket } = basketSplice.actions;

//selectors
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
  state.basket.items.reduce((acc, val) => acc + val.price * 567, 0);

export default basketSplice.reducer;
