import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithRefresh} from "@/shared/api/base-query.ts";

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
  })
})