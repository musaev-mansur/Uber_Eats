import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseURL, cookies } from "../../../Api/api";
import { IFood, IFoodCategories } from "../../../types/IFood";
import { IProfileUserData } from "../../../types/IUser";

export const foodApi = createApi({
  reducerPath: "foodApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ["FoodData"],
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
    getMyFood: builder.query<IFood[], string>({
      query: () => ({
        url: `/food/cafe`,
        headers: { Authorization: `Bearer ${cookies.get("token")}` },
      }),
      providesTags: (result) => ["FoodData"],
    }),
    /* -------------------------------------------------------------------------------------------------- */

    // добавление нового блюда
    addNewFood: builder.mutation({
      query: (formData) => ({
        url: `/food`,
        method: "POST",
        headers: { Authorization: `Bearer ${cookies.get("token")}` },
        body: formData,
      }),
      invalidatesTags: ["FoodData"],
    }),
  }),
});
