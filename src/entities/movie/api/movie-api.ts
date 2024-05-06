import {baseApi} from "@/shared/api/base-query.ts";
import {IMovie} from "@/entities/movie";

export const movieApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMovie: builder.mutation<IMovie, IMovie>({
      query: (data) => ({
        url: `/movie-api/v1/movie/`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["content", "info"]
    }),
    updateMovie: builder.mutation<IMovie, {id: string, data: IMovie}>({
      query: ({id, data}) => ({
        url: `/movie-api/v1/movie/${id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["content", "info"]
    }),
    deleteMovie: builder.mutation<void, string>({
      query: (id) => ({
        url: `/movie-api/v1/movie/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["content", "info"]
    }),
  }),
  overrideExisting: false
})