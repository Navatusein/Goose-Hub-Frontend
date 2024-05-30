import {baseApi} from "@/shared/api/base-query.ts";
import {IYearsInfo} from "@/entities/info";
import {ContentTypeEnum} from "@/entities/common";

export const infoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchDirectedBy: builder.query<string[], string>({
      query: (query) => ({
        url: "/movie-api/v1/info/directed-by",
        method: "GET",
        params: {query: query}
      }),
      providesTags: () => ["info"]
    }),
    fetchGenres: builder.query<string[], ContentTypeEnum | undefined>({
      query: (contentType) => ({
        url: "/movie-api/v1/info/genres",
        method: "GET",
        params: {contentType: contentType}
      }),
      providesTags: () => ["info"]
    }),
    fetchYears: builder.query<IYearsInfo, ContentTypeEnum | undefined>({
      query: (contentType) => ({
        url: "/movie-api/v1/info/years",
        method: "GET",
        params: {contentType: contentType}
      }),
      providesTags: () => ["info"]
    }),
  }),
  overrideExisting: false
})