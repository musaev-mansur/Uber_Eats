import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL, cookies } from "@/lib/api";
import { IProfileUserData } from "../../../types/IUser";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ['UserData'],
  endpoints: (builder) => ({
     /*---------------------------------------------------------------------------------------------------- */
     
    //Получения данных о пользователе
    getUser: builder.query<IProfileUserData, string>({
      query: (role) => ({
        url: `/api/auth/profile/`,
        headers: { Authorization: `Token ${cookies.get("token")}` },
      }),
      providesTags: result => ['UserData']
    }),
    /*---------------------------------------------------------------------------------------------------- */

    //Изменения профиля
    editUserProfile: builder.mutation({
      query: (formData) => ({
        url: `/api/auth/profile/`,
        method: 'PATCH',
        headers: { Authorization: `Token ${cookies.get("token")}` },
        body: formData
      }),
      invalidatesTags: ['UserData']
    }),
     /*---------------------------------------------------------------------------------------------------- */
     
    //Получения данных о пользователе
    getCafes: builder.query<IProfileUserData[], string>({
      query: () => ({
        url: `/api/cafes/`,
      }),
    }),
  }),
});
