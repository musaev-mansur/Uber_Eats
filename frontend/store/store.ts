import { configureStore, combineReducers } from "@reduxjs/toolkit";
import ordersSlice, { basketSlice } from "./reducers/orders/ordersSlice";
import { foodApi } from "./reducers/servise/foodService";
import { userApi } from "./reducers/servise/userServise";
import userSlice from "./reducers/user/userSlice";

const rootReducer = combineReducers({
  user: userSlice,
  orders: ordersSlice,
  userApi: userApi.reducer,
  foodApi: foodApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, foodApi.middleware) as any,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
