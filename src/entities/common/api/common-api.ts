import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithRefresh} from "@/shared/api/base-query.ts";
import {IPreview, IQuery, IPagination} from "@/entities/common";

export const commonApi = createApi({
  reducerPath: "commonApi",
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    fetchPreviewByFranchiseId: builder.query<IPreview, string>({
      query: (id) => ({
        url: `/movie-api/v1/content/preview/franchise/${id}`,
        method: "GET"
      })
    }),

    fetchPreviewByFilter: builder.query<IPagination, IQuery>({
      query: (query) => ({
        url: `/movie-api/v1/content/preview/query`,
        method: "POST",
        body: query
      })
    }),

    fetchPreviewByIds: builder.query<IPreview[], string[]>({
      query: (ids) => ({
        url: `/movie-api/v1/content/preview/ids`,
        method: "POST",
        body: ids
      })
    }),

    fetchById: builder.query<IPreview, string>({
      query: (id) => ({
        url: `/movie-api/v1/content/${id}`,
        method: "POST"
      })
    }),
  })
})