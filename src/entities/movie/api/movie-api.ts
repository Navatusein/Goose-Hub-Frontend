import {createApi} from "@reduxjs/toolkit/query";
import {baseQueryWithRefresh} from "@/shared/api/base-query.ts";
import {IMovie} from "@/entities/movie";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    fetchById: builder.query<IMovie, string>({
      query: (id) => ({
        url: `/movie-api/v1/movie/${id}`,
        method: "GET"
      })
    }),
    create: builder.query<IMovie, IMovie>({
      query: (movieDto) => ({
        url: `/movie-api/v1/movie/`,
        method: "POST",
        data: movieDto
      })
    }),
    update: builder.query<IMovie, {id: string, movieDto: IMovie}>({
      query: ({id, movieDto}) => ({
        url: `/movie-api/v1/movie/${id}`,
        method: "PUT",
        data: movieDto
      })
    }),
    delete: builder.query<void, string>({
      query: (id) => ({
        url: `/movie-api/v1/movie/${id}`,
        method: "DELETE"
      })
    }),
  })
})