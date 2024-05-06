import {baseApi} from "@/shared/api/base-query.ts";
import {IAnime} from "@/entities/anime";

export const animeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAnime: builder.mutation<IAnime, IAnime>({
      query: (data) => ({
        url: `/movie-api/v1/anime/`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["content", "info"]
    }),
    updateAnime: builder.mutation<IAnime, {id: string, data: IAnime}>({
      query: ({id, data}) => ({
        url: `/movie-api/v1/anime/${id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["content", "info"]
    }),
    deleteAnime: builder.mutation<void, string>({
      query: (id) => ({
        url: `/movie-api/v1/anime/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["content", "info"]
    }),
  }),
  overrideExisting: false
})