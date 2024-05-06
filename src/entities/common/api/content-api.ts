import {baseApi} from "@/shared/api/base-query.ts";
import {IPreview} from "@/entities/common";

export const contentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchContentById: builder.query<IPreview, string>({
      query: (id) => ({
        url: `/movie-api/v1/content/${id}`,
        method: "POST"
      }),
      providesTags: () => ["content"]
    })
  }),
  overrideExisting: false
})