import { combineReducers } from "@reduxjs/toolkit";
import basketReducer from "./slices/basketSlice";

const rootReducer = combineReducers({
  basket: basketReducer,
});

export default rootReducer;
