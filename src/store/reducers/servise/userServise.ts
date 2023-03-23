import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseURL, cookies } from "../../../Api/api";
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
        url: `${role}/profile/user`,
        headers: { Authorization: `Bearer ${cookies.get("token")}` },
      }),
      providesTags: result => ['UserData']
    }),
    /*---------------------------------------------------------------------------------------------------- */

    //Изменения профиля
    editUserProfile: builder.mutation({
      query: (formData) => ({
        url: `/cafe/edit`,
        method: 'PATCH',
        headers: { Authorization: `Bearer ${cookies.get("token")}` },
        body: formData
      }),
      invalidatesTags: ['UserData']
    }),
     /*---------------------------------------------------------------------------------------------------- */
     
    //Получения данных о пользователе
    getCafes: builder.query<IProfileUserData[], string>({
      query: () => ({
        url: `/cafe`,
      }),
    }),
  }),
});
