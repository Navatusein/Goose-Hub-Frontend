import {combineReducers, configureStore, ThunkMiddleware} from "@reduxjs/toolkit";
import {userApi, userReducer} from "@/entities/user";
import {infoApi} from "@/entities/info";
import {wishListApi} from "@/entities/wish-list";
import { userProfileApi } from "@/entities/user-profile";

const rootReducer = combineReducers({
  user: userReducer,
  [userApi.reducerPath]: userApi.reducer,
  [infoApi.reducerPath]: infoApi.reducer,
  [wishListApi.reducerPath]: wishListApi.reducer,
  [userProfileApi.reducerPath]: userProfileApi.reducer
});

const middlewares: ThunkMiddleware[] = [
  userApi.middleware,
  infoApi.middleware,
  wishListApi.middleware,
  userProfileApi.middleware
]

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(middlewares)
});

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof configureStore>
export type AppDispatch = AppStore['dispatch']