import {baseApi} from "@/shared/api/base-query.ts";
import {IFranchise} from "@/entities/franchise";

export const franchiseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchFranchiseByFilter: builder.query<IFranchise[], string | undefined>({
      query: (query) => ({
        url: `/movie-api/v1/franchise/`,
        method: "GET",
        params: {
          query: query,
        }
      }),
      providesTags: () => ["franchise"]
    }),
    fetchFranchiseById: builder.query<IFranchise, string>({
      query: (id) => ({
        url: `/movie-api/v1/franchise/${id}`,
        method: "GET"
      }),
      providesTags: () => ["franchise"]
    }),
    createFranchise: builder.mutation<IFranchise, IFranchise>({
      query: (franchiseDto) => ({
        url: `/movie-api/v1/franchise/`,
        method: "POST",
        body: franchiseDto
      }),
      invalidatesTags: ["franchise"]
    }),
    updateFranchise: builder.mutation<IFranchise, {id: string, data: IFranchise}>({
      query: ({id, data}) => ({
        url: `/movie-api/v1/franchise/${id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["franchise"]
    }),
    deleteFranchise: builder.mutation<void, string>({
      query: (id) => ({
        url: `/movie-api/v1/franchise/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["franchise"]
    }),
  }),
  overrideExisting: false
})