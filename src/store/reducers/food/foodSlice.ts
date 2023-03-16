import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cookies } from "../../../Api/api";
import { updateFood } from "./foodActions";

const initialState = {
 
};

export const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    

}});

export default foodSlice.reducer;

