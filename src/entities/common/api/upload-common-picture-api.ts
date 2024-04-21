import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithRefresh} from "@/shared/api/base-query.ts";

export const uploadCommonPictureApi = createApi({
  reducerPath: "uploadCommonPictureApi",
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    deleteBanner: builder.mutation<void, string>({
      query: (id) => ({
        url: `/movie-api/v1/upload/banner/${id}`,
        method: "DELETE"
      })
    })
  })
})