import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cookies } from "../../../Api/api";
import { foodState, IFood } from "../../../types/IFood";
import {updateFood } from "./foodActions";

const initialState: foodState = {
  food: [{
    _id: cookies.get('_id') || '',
    name: "",
    image: "",
    mail: "", 
    phone: "",
    city: "",
    address: "",
    menu: [],
  }],
  isAuth: false,
  isLoading: false,
};

export const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
     //updateTodo
     builder.addCase(updateFood.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateFood.fulfilled, (state, action: PayloadAction<IFood>) => {
      state.isLoading = false
      cookies.set('_id', action.payload._id)
      state.food = state.food.map((post: IFood) => {
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

