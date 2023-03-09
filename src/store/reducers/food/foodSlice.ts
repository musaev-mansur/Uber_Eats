import { createSlice } from "@reduxjs/toolkit";
import { foodState } from "../../../types/IFood";
import { } from "./foodActions";

const initialState: foodState = {
  food: [],
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

}});

export default postSlice.reducer;

