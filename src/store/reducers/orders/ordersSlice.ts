import { createSlice } from "@reduxjs/toolkit";

const initialState:{basket: string[]} = {
    basket: []
};

export const basketSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.basket.push(action.payload)
    }, 
    removeFromBasket: (state, action) => {
      state.basket = state.basket.filter(item => item !== action.payload)
    }
  },
  extraReducers: () => {},
   
});

export const { addToBasket, removeFromBasket } = basketSlice.actions

export default basketSlice.reducer;

