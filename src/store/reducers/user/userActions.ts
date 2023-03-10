import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseService, cookies, setToken } from "../../../Api/api";
import { ISignUp, Ilogin, ILogIn } from "../../../types/IUser";

export const logIn = createAsyncThunk<
  Ilogin,
  ILogIn
>("sign/in", async function (userData) {
  const res = await baseService.post(`/signin`, userData);
  cookies.set('token', res.data.token)
  setToken()
  console.log(res)
  return res.data;
});

export const logOut = createAsyncThunk("get/user", async function () {
  const res = await baseService.get(`/user`, {
    headers: { Authorization: `Bearer ${cookies.get("token")}` },
  });
  setToken()
  return res.data;
});

export const signUpClient = createAsyncThunk<string, ISignUp>(
  'signUp/client', async function (clientsData) {
    const res = await baseService.post(`/client/signup`, clientsData);
    console.log(res)
    return res.data
  }
)

export const signUpCafe = createAsyncThunk<string, ISignUp>(
  'signUp/cafe', async function (cafeData) {
    const res = await baseService.post(`/cafe/signup`, cafeData);
    console.log(res)
    return res.data
  }
)