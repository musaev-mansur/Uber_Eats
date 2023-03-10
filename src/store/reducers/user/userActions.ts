import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseService, cookies, setToken } from "../../../Api/api";
import { IAuth, Ilogin } from "../../../types/IUser";

export const signIn = createAsyncThunk<
  Ilogin,
  { username: string; password: string }
>("sign/in", async function ({ username, password }) {
  const res = await baseService.post(`/user/sign-in`, {
    username,
    password,
  });
  cookies.set('token', res.data.token)
  setToken()
  return res.data;
});

export const logOut = createAsyncThunk("get/user", async function () {
  const res = await baseService.get(`/user`, {
    headers: { Authorization: `Bearer ${cookies.get("token")}` },
  });
  setToken()
  return res.data;
});

export const signUpClient = createAsyncThunk<string, IAuth>(
  'signUp/client', async function (clientsData) {
    const res = await baseService.post(`/client/signup`, clientsData);
    console.log(res)
    return res.data
  }
)

export const signUpCafe = createAsyncThunk<string, IAuth>(
  'signUp/cafe', async function (cafeData) {
    const res = await baseService.post(`/cafe/signup`, cafeData);
    console.log(res)
    return res.data
  }
)