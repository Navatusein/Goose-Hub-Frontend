import {baseApi} from "@/shared/api/base-query.ts";

export const uploadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    uploadMovie: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: `/upload-api/v1/upload/movie/content`,
        method: "POST",
        body: formData
      }),
      invalidatesTags: ["content"]
    }),

    uploadSerial: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: `/upload-api/v1/upload/serial/content`,
        method: "POST",
        body: formData
      }),
      invalidatesTags: ["content"]
    }),

    uploadAnime: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: `/upload-api/v1/upload/anime/content`,
        method: "POST",
        body: formData
      }),
      invalidatesTags: ["content"]
    }),

    uploadScreenshot: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: `/movie-api/v1/upload/screenshot`,
        method: "POST",
        body: formData
      }),
      invalidatesTags: ["content"]
    }),

    uploadPoster: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: `/movie-api/v1/upload/poster`,
        method: "POST",
        body: formData
      }),
      invalidatesTags: ["content"]
    }),

    uploadBanner: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: `/movie-api/v1/upload/banner`,
        method: "POST",
        body: formData
      }),
      invalidatesTags: ["content"]
    }),

    deleteScreenshot: builder.mutation<void, {id: string, path: string}>({
      query: ({id, path}) => ({
        url: `/movie-api/v1/upload/screenshot/${id}/${path}`,
        method: "DELETE"
      }),
      invalidatesTags: ["content"]
    }),

    deletePoster: builder.mutation<void, string>({
      query: (id) => ({
        url: `/movie-api/v1/upload/poster/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["content"]
    }),

    deleteBanner: builder.mutation<void, string>({
      query: (id) => ({
        url: `/movie-api/v1/upload/banner/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["content"]
    })
  }),
  overrideExisting: false
})
