import {baseApi} from "@/shared/api/base-query.ts";
import {ILoginData, IRegisterData, IUpdateUser, IUser} from "@/entities/user";
import {logout, setUser} from "@/entities/user/model/user-slice.ts";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<IUser, ILoginData>({
      query: (loginData) => ({
        url: '/authentication-api/v1/login',
        method: 'POST',
        body: loginData
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(data => dispatch(setUser(data.data)))
          .catch(() => logout())
      },
    }),

    registerUser: builder.mutation<IUser, IRegisterData>({
      query: (registerData) => ({
        url: '/authentication-api/v1/register',
        method: 'POST',
        body: registerData
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(data => dispatch(setUser(data.data)))
          .catch(() => logout())
      },
    }),

    updateUser: builder.mutation<void, IUpdateUser>({
      query: (updateData) => ({
        url: '/authentication-api/v1/update-user',
        method: 'PUT',
        body: updateData
      })
    })
  }),
  overrideExisting: false
})