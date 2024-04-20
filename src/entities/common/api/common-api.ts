import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithRefresh} from "@/shared/api/base-query.ts";
import {IPreview, IQuery} from "@/entities/common";

export const commonApi = createApi({
  reducerPath: "commonApi",
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    fetchContentFranchiseById: builder.query<IPreview, string>({
      query: (id) => ({
        url: `/movie-api/v1/content/franchise/${id}`,
        method: "GET"
      })
    }),
    fetchContentQuery: builder.query<IPreview, IQuery>({
      query: (query) => ({
        url: `/movie-api/v1/content/query`,
        method: "POST",
        body: query
      })
    })
  })
})