import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseURL, cookies } from "../../../Api/api";
import { IProfileUserData } from "../../../types/IUser";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getUser: builder.query<IProfileUserData, string>({
      query: (role) => ({
        url: `/${role}/profile/user`,
        headers: { Authorization: `Bearer ${cookies.get("token")}` },
      }),
    }),
  }),
});
