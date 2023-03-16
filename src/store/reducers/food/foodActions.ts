import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseService, cookies } from "../../../Api/api";
import { IFood } from "../../../types/IFood";

export const getFood = createAsyncThunk("food/upload", async function () {
  const res = await baseService.get(`/posts`);
  return res.data;
});

export const updateFood = createAsyncThunk(
  "cafe/update",
  async ({ _id, food }: { _id: string;  food: IFood }, thunkAPI) => {
    try {
      const res = await baseService.patch(`/cafe/edit/`, food, { 
        headers: { 'Authorization': `Bearer ${cookies.get('token')}` } 
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);