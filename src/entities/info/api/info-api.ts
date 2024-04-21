import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithRefresh} from "@/shared/api/base-query.ts";
import {IFranchise} from "@/entities/franchise";
import {IYearsInfo} from "@/entities/info";
import {ContentTypeEnum} from "@/entities/common";

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
    fetchGenres: builder.query<string[], ContentTypeEnum | undefined>({
      query: (contentType) => ({
        url: "/movie-api/v1/info/genres",
        method: "GET",
        params: {contentType: contentType}
      }),
    }),
    fetchYears: builder.query<IYearsInfo, ContentTypeEnum | undefined>({
      query: (contentType) => ({
        url: "/movie-api/v1/info/years",
        method: "GET",
        params: {contentType: contentType}
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