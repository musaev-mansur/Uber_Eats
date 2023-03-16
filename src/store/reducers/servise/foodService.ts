import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseURL, cookies } from "../../../Api/api";
import { IProfileUserData } from "../../../types/IUser";

export const foodApi = createApi({
  reducerPath: "foodApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ['foodData'],
  endpoints: (builder) => ({
  }),
});
