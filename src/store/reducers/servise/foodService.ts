import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseURL, cookies } from "../../../Api/api";
import { IFood, IFoodCategories, IGetOrders, ISetOrder } from "../../../types/IFood";
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
      invalidatesTags: ["UserFoodData", "AllFoodData"],
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

    // удаление блюда
    deleteFood: builder.mutation({
      query: (id) => ({
        url: `/food/${id}`,
        method: 'DELETE',
        headers: { Authorization: `Bearer ${cookies.get("token")}` },
      }),
      invalidatesTags: ["UserFoodData", 'AllFoodData'],
    }),
    /* -------------------------------------------------------------------------------------------------- */

    // получение блюд из корзины
    getMyOrders: builder.query<IGetOrders[], string>({
      query: () => ({
        url: `/orders`,
        headers: { Authorization: `Bearer ${cookies.get("token")}` },
      }),
      providesTags: ["FoodInBasket"],
    }),
    /* -------------------------------------------------------------------------------------------------- */

    // добавление в корзину
    setOrder: builder.mutation<IGetOrders, ISetOrder>({
      query: (orderBody) => ({
        method: "POST",
        url: `/orders`,
        body: orderBody,
        headers: { Authorization: `Bearer ${cookies.get("token")}` },
      }),
      invalidatesTags: ["FoodInBasket"],
    }),
  }),
});
