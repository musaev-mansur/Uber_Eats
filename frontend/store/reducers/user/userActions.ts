import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseService, cookies, setToken } from "@/lib/api";
import { ISignUp, IUserData, ILogIn } from "../../../types/IUser";

export const logIn = createAsyncThunk<
  IUserData,
  ILogIn,
  { rejectValue: any }
>("sign/in", async function (userData, { rejectWithValue }) {
  try {
    const res = await baseService.post(`/api/auth/login/`, userData);
    cookies.set('token', res.data.token)
    cookies.set('data', res.data)
    setToken()
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const logOut = createAsyncThunk("get/user", async function () {
  const data = cookies.get('data')
  const res = await baseService.get(`/api/auth/profile/`, {
    headers: { Authorization: `Token ${data.token}` },
  });
  setToken()
  return data;
});

export const signUpClient = createAsyncThunk<string, ISignUp, { rejectValue: any }>(
  'signUp/client', async function (clientsData, { rejectWithValue }) {
    try {
      const res = await baseService.post(`/api/auth/register/`, clientsData);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const signUpCafe = createAsyncThunk<string, ISignUp, { rejectValue: any }>(
  'signUp/cafe', async function (cafeData, { rejectWithValue }) {
    try {
      const res = await baseService.post(`/api/auth/register/`, cafeData);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)
