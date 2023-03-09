import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseService, cookies } from "../../../Api/api";
import { IFood } from "../../../types/IFood";

export const getFood = createAsyncThunk("food/upload", async function () {
  const res = await baseService.get(`/posts`);
  return res.data;
});

