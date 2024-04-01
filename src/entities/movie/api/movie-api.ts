import {movieApi} from "@reduxjs/toolkit/query";
import {baseQueryWithRefresh} from "@/shared/api/base-query.ts";
import {IMovie} from "@/entities/movie";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    fetchDirectedBy: builder.query<IMovie, string>({
      query: (id) => ({
        url: `/movie-api/v1/movie/${id}`,
        method: "GET"
      }),
    }),
  })
})