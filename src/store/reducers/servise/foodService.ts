import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseURL, cookies } from "../../../Api/api";
import { IFood, IFoodCategories } from "../../../types/IFood";
import { IProfileUserData } from "../../../types/IUser";

export const foodApi = createApi({
  reducerPath: "foodApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ["UserFoodData", "AllFoodData", 'FoodInBasket'],
  endpoints: (builder) => ({
    /* -------------------------------------------------------------------------------------------------- */

    // получение категорий
    getCategories: builder.query<IFoodCategories[], string>({
      query: () => ({
        url: `/categories`,
      }),
    }),
    /* -------------------------------------------------------------------------------------------------- */

    // получение блюд пользователя
    getMyFood: builder.query<IFood[], string>({
      query: () => ({
        url: `/food/cafe`,
        headers: { Authorization: `Bearer ${cookies.get("token")}` },
      }),
      providesTags: (result) => ["UserFoodData"],
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
      invalidatesTags: ["UserFoodData"],
    }),
    /* -------------------------------------------------------------------------------------------------- */

    // получение всех блюд
    getAllFood: builder.query<IFood[], string>({
      query: () => ({
        url: `/food`,
      }),
      providesTags: ["AllFoodData"],
    }),
    /* -------------------------------------------------------------------------------------------------- */

    // получение всех блюд
    deleteFood: builder.mutation({
      query: () => ({
        url: `/food/:id`,
        method: 'DELETE',
        headers: { Authorization: `Bearer ${cookies.get("token")}` },
      }),
      invalidatesTags: ["AllFoodData"],
    }),
    /* -------------------------------------------------------------------------------------------------- */

    // получение блюд из корзины
    getFoodInBasket: builder.query<IFood[], string>({
      query: () => ({
        url: `/orders`,
        headers: { Authorization: `Bearer ${cookies.get("token")}` },
      }),
      providesTags: ["FoodInBasket"],
    }),
    /* -------------------------------------------------------------------------------------------------- */

    // добавление в корзину
    addFoodToBasket: builder.mutation<IFood[], string>({
      query: () => ({
        url: `/orders`,
        headers: { Authorization: `Bearer ${cookies.get("token")}` },
      }),
      invalidatesTags: ["FoodInBasket"],
    }),
  }),
});
