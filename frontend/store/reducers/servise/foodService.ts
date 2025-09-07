import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL, cookies } from "@/lib/api";
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
        url: `/api/categories/`,
      }),
    }),
    /* -------------------------------------------------------------------------------------------------- */

    // получение блюд пользователя
    getMyFood: builder.query<IFood[], string>({
      query: () => ({
        url: `/api/foods/`,
        headers: { Authorization: `Token ${cookies.get("token")}` },
      }),
      providesTags: (result) => ["UserFoodData"],
    }),
    /* -------------------------------------------------------------------------------------------------- */

    // добавление нового блюда
    addNewFood: builder.mutation({
      query: (formData) => ({
        url: `/api/foods/create/`,
        method: "POST",
        headers: { Authorization: `Token ${cookies.get("token")}` },
        body: formData,
      }),
      invalidatesTags: ["UserFoodData", "AllFoodData"],
    }),
    /* -------------------------------------------------------------------------------------------------- */

    // получение всех блюд
    getAllFood: builder.query<{count: number, next: string | null, previous: string | null, results: IFood[]}, string>({
      query: () => ({
        url: `/api/foods/`,
      }),
      providesTags: ["AllFoodData"],
    }),
    /* -------------------------------------------------------------------------------------------------- */

    // удаление блюда
    deleteFood: builder.mutation({
      query: (id) => ({
        url: `/api/foods/${id}/delete/`,
        method: 'DELETE',
        headers: { Authorization: `Token ${cookies.get("token")}` },
      }),
      invalidatesTags: ["UserFoodData", 'AllFoodData'],
    }),
    /* -------------------------------------------------------------------------------------------------- */

    // получение блюд из корзины
    getMyOrders: builder.query<{count: number, next: string | null, previous: string | null, results: IGetOrders[]}, string>({
      query: () => ({
        url: `/api/orders/`,
        headers: { Authorization: `Token ${cookies.get("token")}` },
      }),
      providesTags: ["FoodInBasket"],
    }),
    /* -------------------------------------------------------------------------------------------------- */

    // добавление в корзину
    setOrder: builder.mutation<IGetOrders, ISetOrder>({
      query: (orderBody) => ({
        method: "POST",
        url: `/api/orders/create/`,
        body: orderBody,
        headers: { Authorization: `Token ${cookies.get("token")}` },
      }),
      invalidatesTags: ["FoodInBasket"],
    }),
  }),
});
