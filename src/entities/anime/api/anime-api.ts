import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithRefresh} from "@/shared/api/base-query.ts";
import {IAnime} from "@/entities/anime";

export const animeApi = createApi({
  reducerPath: "animeApi",
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    fetchById: builder.query<IAnime, string>({
      query: (id) => ({
        url: `/movie-api/v1/anime/${id}`,
        method: "GET"
      })
    }),
    create: builder.query<IAnime, IAnime>({
      query: (animeDto) => ({
        url: `/movie-api/v1/anime/`,
        method: "POST",
        data: animeDto
      })
    }),
    update: builder.query<IAnime, {id: string, animeDto: IAnime}>({
      query: ({id, animeDto}) => ({
        url: `/movie-api/v1/anime/${id}`,
        method: "PUT",
        data: animeDto
      })
    }),
    delete: builder.query<void, string>({
      query: (id) => ({
        url: `/movie-api/v1/anime/${id}`,
        method: "DELETE"
      })
    }),
  })
})