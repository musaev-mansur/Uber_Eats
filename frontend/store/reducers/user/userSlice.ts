import { createSlice,} from "@reduxjs/toolkit";
import { cookies } from "@/lib/api";
import { userState } from "../../../types/IUser";
import { logOut, logIn, signUpCafe, signUpClient } from "./userActions";

const initialState: userState = {
  currentUser: {
    token: cookies.get('token') || '',
    id: "",
    role: "",
  },
  
  isAuth: false,
  isLoading: false,
  error: null,
  successMessage: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    forcedLogOut: (state) => {
      state.isAuth = false;
      state.currentUser.id = ''
      state.currentUser.role = ''
      cookies.remove('token');
      cookies.remove('data');
      window.location.href = '/'
    },
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    
    // авторизация
    builder.addCase(logIn.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.successMessage = null;
    });

    builder.addCase(logIn.fulfilled, (state, action) => {
      state.isAuth = true;
      state.isLoading = false;
      state.currentUser = action.payload;
      state.error = null;
      state.successMessage = "Успешный вход!";
    });

    builder.addCase(logIn.rejected, (state, action) => {
      state.isAuth = false;
      state.isLoading = false;
      state.successMessage = null;
      
      // Обрабатываем ошибки
      if (action.payload) {
        const errorData = action.payload as any;
        if (errorData.non_field_errors) {
          state.error = errorData.non_field_errors[0];
        } else if (errorData.email) {
          state.error = errorData.email[0];
        } else if (errorData.password) {
          state.error = errorData.password[0];
        } else {
          state.error = "Произошла ошибка при входе";
        }
      } else {
        state.error = "Ошибка соединения с сервером";
      }
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
      cookies.remove('data')
      state.isLoading = false
      state.isAuth = false
    });
    /* -------------------------------------------------------------------------------------------------------- */

    // регистрация кафе
    builder.addCase(signUpCafe.pending, (state) => {
      state.isLoading = true;
      state.isAuth = false;
      state.error = null;
      state.successMessage = null;
    });

    builder.addCase(signUpCafe.fulfilled, (state) => {
      state.isLoading = false;
      state.isAuth = false;
      state.error = null;
      state.successMessage = "Регистрация успешна! Теперь войдите в систему.";
      window.location.href = '/sign-in';
    });

    builder.addCase(signUpCafe.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuth = false;
      state.successMessage = null;
      
      // Обрабатываем ошибки
      if (action.payload) {
        const errorData = action.payload as any;
        if (errorData.non_field_errors) {
          state.error = errorData.non_field_errors[0];
        } else if (errorData.username) {
          state.error = errorData.username[0];
        } else if (errorData.email) {
          state.error = errorData.email[0];
        } else if (errorData.password) {
          state.error = errorData.password[0];
        } else if (errorData.phone) {
          state.error = errorData.phone[0];
        } else {
          state.error = "Произошла ошибка при регистрации";
        }
      } else {
        state.error = "Ошибка соединения с сервером";
      }
    });
    // /* -------------------------------------------------------------------------------------------------------- */

    // регистрация клиента
    builder.addCase(signUpClient.pending, (state) => {
      state.isLoading = true;
      state.isAuth = false;
      state.error = null;
      state.successMessage = null;
    });

    builder.addCase(signUpClient.fulfilled, (state) => {
      state.isLoading = false;
      state.isAuth = false;
      state.error = null;
      state.successMessage = "Регистрация успешна! Теперь войдите в систему.";
      window.location.href = '/sign-in';
    });

    builder.addCase(signUpClient.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuth = false;
      state.successMessage = null;
      
      // Обрабатываем ошибки
      if (action.payload) {
        const errorData = action.payload as any;
        if (errorData.non_field_errors) {
          state.error = errorData.non_field_errors[0];
        } else if (errorData.username) {
          state.error = errorData.username[0];
        } else if (errorData.email) {
          state.error = errorData.email[0];
        } else if (errorData.password) {
          state.error = errorData.password[0];
        } else if (errorData.phone) {
          state.error = errorData.phone[0];
        } else {
          state.error = "Произошла ошибка при регистрации";
        }
      } else {
        state.error = "Ошибка соединения с сервером";
      }
    });
    // /* -------------------------------------------------------------------------------------------------------- */
  },
   
});

export const { forcedLogOut, clearMessages } = userSlice.actions

export default userSlice.reducer;
