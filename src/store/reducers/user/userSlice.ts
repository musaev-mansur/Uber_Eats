import { createSlice,} from "@reduxjs/toolkit";
import { cookies } from "../../../Api/api";
import { userState } from "../../../types/IUser";
import { logOut, logIn, signUpCafe, signUpClient } from "./userActions";

const initialState: userState = {
  currentUser: {
    token: cookies.get('token') || '',
    id: "",
    role: "",
  },
  
  isAuth: false,
  isLoading: false
};

export const todoSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
    // авторизация
    builder.addCase(logIn.pending, (state) => {
      state.isLoading = true
    });

    builder.addCase(logIn.fulfilled, (state, action) => {
      state.isAuth = true;
      state.isLoading = false;
      state.currentUser = action.payload
    });

    builder.addCase(logIn.rejected, (state, action) => {
      state.isAuth = false;
    });
     /* -------------------------------------------------------------------------------------------------------- */

     //проверка токена
    builder.addCase(logOut.pending, (state) => {
      state.isLoading = true
      state.isAuth = false
    });
    
    builder.addCase(logOut.fulfilled, (state, action) => {
      state.isAuth = true;
      state.isLoading = false;
      state.currentUser = action.payload
    });
    
    builder.addCase(logOut.rejected, (state) => {
      cookies.remove('token')
      state.isLoading = false
    });
    /* -------------------------------------------------------------------------------------------------------- */

    // регистрация кафе
    builder.addCase(signUpCafe.pending, (state) => {
      state.isLoading = true
    });

    builder.addCase(signUpCafe.fulfilled, (state) => {
      state.isLoading = false
      window.location.href = '/sign-in'
    });

    builder.addCase(signUpCafe.rejected, (state) => {
      state.isLoading = false
    });
    // /* -------------------------------------------------------------------------------------------------------- */

    // регистрация клиента
    builder.addCase(signUpClient.pending, (state) => {
      state.isLoading = true
    });

    builder.addCase(signUpClient.fulfilled, (state) => {
      state.isLoading = false
      window.location.href = '/sign-in'
    });

    builder.addCase(signUpClient.rejected, (state) => {
      state.isLoading = false
    });
    // /* -------------------------------------------------------------------------------------------------------- */

    //

  },

   /* -------------------------------------------------------------------------------------------------------- */

   
});
export default todoSlice.reducer;
