import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { foodState, IFood } from "../../../types/IFood";
import {updateFood } from "./foodActions";

const initialState: foodState = {
  food: [],
  isAuth: false,
  isLoading: false,
};

export const foodSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
     //updateTodo
     builder.addCase(updateFood.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateFood.fulfilled, (state, action: PayloadAction<IFood>) => {
      state.isLoading = false
      state.food = state.food.map(post => {
        if (post._id === action.payload._id) {
          return action.payload;
        }
        return post;
      });
    });
    builder.addCase(updateFood.rejected, (state, action) => {
      state.isLoading = false;
      // state.error = action.error.message || "Something went wrong";
    });

}});

export default foodSlice.reducer;

