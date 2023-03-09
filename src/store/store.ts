import { 
    configureStore, 
    combineReducers 
} from "@reduxjs/toolkit";
import PostsSlice from "./reducers/food/foodSlice";
import userSlice from "./reducers/user/userSlice";

const rootReducer = combineReducers({
  user: userSlice,
  posts: PostsSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
