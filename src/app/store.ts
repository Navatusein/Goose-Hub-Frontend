import {combineReducers, configureStore, ThunkMiddleware} from "@reduxjs/toolkit";
import {userApi, userReducer} from "@/entities/user";

const rootReducer = combineReducers({
  user: userReducer,
  [userApi.reducerPath]: userApi.reducer
});

const middlewares: ThunkMiddleware[] = [
  userApi.middleware
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