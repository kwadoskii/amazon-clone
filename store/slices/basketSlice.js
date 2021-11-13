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
      // state.items = state.items.filter((i) => i.id !== action.payload.id);
      const index = state.items.findIndex((basketItem) => basketItem.id === action.payload.id);

      let newBasket = [...state.items];

      index >= 0 ? newBasket.splice(index, 1) : console.warn(`${action.payload.id} does not exist`);

      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSplice.actions;

//selectors
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
  state.basket.items.reduce((acc, val) => acc + val.price * 567, 0);

export default basketSplice.reducer;
