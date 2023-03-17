import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseURL, cookies } from "../../../Api/api";
import { IFoodCategories } from "../../../types/IFood";
import { IProfileUserData } from "../../../types/IUser";

export const foodApi = createApi({
  reducerPath: "foodApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ['FoodData'],
  endpoints: (builder) => ({
    /* -------------------------------------------------------------------------------------------------- */

    // получение категорий
    getCategories: builder.query<IFoodCategories[], string>({
      query: () => ({
        url: `/categories`,
      }),
    }),
     /* -------------------------------------------------------------------------------------------------- */

    // получение блюд
    getFood: builder.query<IFoodCategories[], string>({
      query: () => ({
        url: `/categories`,
      }),
    }),
  }),
});
