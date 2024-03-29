import {createApi} from "@reduxjs/toolkit/query";
import {baseQueryWithRefresh} from "@/shared/api/base-query.ts";
import {IUser} from "@/entities/user";
import {logout, setUser} from "@/entities/user/model/user-slice.ts";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    loginUser: builder.mutation<IUser, void>({
      query: () => ({
        url: '/authentication-api/v1/login',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        }
        catch (error) {
          dispatch(logout());
        }
      },
    })
  })
})