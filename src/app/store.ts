import {combineReducers, configureStore, ThunkMiddleware} from "@reduxjs/toolkit";
import {animeApi} from "@/entities/anime";
import {commonApi} from "@/entities/common";
import {franchiseApi} from "@/entities/franchise";
import {infoApi} from "@/entities/info";
import {movieApi} from "@/entities/movie";
import {serialApi} from "@/entities/serial";
import {userApi, userReducer} from "@/entities/user";
import {userProfileApi} from "@/entities/user-profile";
import {wishListApi} from "@/entities/wish-list";
import { commentApi } from "@/entities/comment";

const IS_DEV_ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT === "Development";

const rootReducer = combineReducers({
  user: userReducer,
  [userApi.reducerPath]: userApi.reducer,
  [userProfileApi.reducerPath]: userProfileApi.reducer,
  [wishListApi.reducerPath]: wishListApi.reducer,
  [commonApi.reducerPath]: commonApi.reducer,
  [animeApi.reducerPath]: animeApi.reducer,
  [movieApi.reducerPath]: movieApi.reducer,
  [serialApi.reducerPath]: serialApi.reducer,
  [franchiseApi.reducerPath]: franchiseApi.reducer,
  [infoApi.reducerPath]: infoApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer
});

const middlewares: ThunkMiddleware[] = [
  userApi.middleware,
  userProfileApi.middleware,
  wishListApi.middleware,
  commonApi.middleware,
  animeApi.middleware,
  movieApi.middleware,
  serialApi.middleware,
  franchiseApi.middleware,
  infoApi.middleware,
  commentApi.middleware,
]

export const store = configureStore({
  reducer: rootReducer,
  devTools: IS_DEV_ENVIRONMENT,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(middlewares)
});

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof configureStore>
export type AppDispatch = AppStore['dispatch']