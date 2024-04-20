import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithRefresh} from "@/shared/api/base-query.ts";
import {IWishList} from "@/entities/wish-list";

export const wishListApi = createApi({
  reducerPath: "wishListApi",
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    fetchDirectedBy: builder.query<IWishList, string>({
      query: (id) => ({
        url: `/user-profile-api/v1/wish-list/${id}`,
        method: "GET"
      }),
    }),
  })
})