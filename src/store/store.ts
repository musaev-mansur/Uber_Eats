import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { curryGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
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
  middleware: (curryGetDefaultMiddleware) =>
    curryGetDefaultMiddleware().concat(userApi.middleware, foodApi.middleware),
    
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
