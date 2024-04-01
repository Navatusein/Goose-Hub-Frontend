import {combineReducers, configureStore, ThunkMiddleware} from "@reduxjs/toolkit";
import {animeApi} from "@/entities/anime";
import {commonApi} from "@/entities/common";
import {errorApi} from "@/entities/error";
import {franchiseApi} from "@/entities/franchise";
import {infoApi} from "@/entities/info";
import {movieApi} from "@/entities/movie";
import {serialApi} from "@/entities/serial";
import {userApi, userReducer} from "@/entities/user";
import {userProfileApi} from "@/entities/user-profile";
import {wishListApi} from "@/entities/wish-list";

const rootReducer = combineReducers({
  [animeApi.reducerPath]: animeApi.reducer,
  [commonApi.reducerPath]: commonApi.reducer,
  [errorApi.reducerPath]: errorApi.reducer,
  [franchiseApi.reducerPath]: franchiseApi.reducer,
  [infoApi.reducerPath]: infoApi.reducer,
  [movieApi.reducerPath]: movieApi.reducer,
  [serialApi.reducerPath]: serialApi.reducer,
  user: userReducer,
  [userApi.reducerPath]: userApi.reducer,
  [userProfileApi.reducerPath]: userProfileApi.reducer,
  [wishListApi.reducerPath]: wishListApi.reducer
});

const middlewares: ThunkMiddleware[] = [
  animeApi.middleware,
  commonApi.middleware,
  errorApi.middleware,
  franchiseApi.middleware,
  infoApi.middleware,
  movieApi.middleware,
  serialApi.middleware,
  userApi.middleware,
  userProfileApi.middleware,
  wishListApi.middleware
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