import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithRefresh} from "@/shared/api/base-query.ts";
import {IFranchise} from "@/entities/franchise";

export const infoApi = createApi({
  reducerPath: "infoApi",
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    fetchDirectedBy: builder.query<string[], string>({
      query: (query) => ({
        url: "/movie-api/v1/info/directed-by",
        method: "GET",
        params: {query: query}
      }),
    }),
    fetchGenres: builder.query<string[], void>({
      query: () => ({
        url: "/movie-api/v1/info/genres",
        method: "GET"
      }),
    }),
    fetchYears: builder.query<number[], void>({
      query: () => ({
        url: "/movie-api/v1/info/years",
        method: "GET"
      }),
    }),
    fetchFranchise: builder.query<IFranchise[], string>({
      query: (query) => ({
        url: "/movie-api/v1/info/franchise",
        method: "GET",
        params: {query: query}
      }),
    }),
  })
})