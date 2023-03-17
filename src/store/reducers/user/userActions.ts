import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseService, cookies, setToken } from "../../../Api/api";
import { ISignUp, IUserData, ILogIn } from "../../../types/IUser";

export const logIn = createAsyncThunk<
  IUserData,
  ILogIn
>("sign/in", async function (userData) {
  const res = await baseService.post(`/signin`, userData);
  cookies.set('token', res.data.token)
  cookies.set('data', res.data)
  setToken()
  return res.data;
});

export const logOut = createAsyncThunk("get/user", async function () {
  const data = cookies.get('data')
  const res = await baseService.get(`/${data.role}/profile/user`, {
    headers: { Authorization: `Bearer ${data.token}` },
  });
  setToken()
  return data;
});

export const signUpClient = createAsyncThunk<string, ISignUp>(
  'signUp/client', async function (clientsData) {
    const res = await baseService.post(`/client/signup`, clientsData);
    return res.data
  }
)

export const signUpCafe = createAsyncThunk<string, ISignUp>(
  'signUp/cafe', async function (cafeData) {
    const res = await baseService.post(`/cafe/signup`, cafeData);
    return res.data
  }
)