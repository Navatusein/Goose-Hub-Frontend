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
      })
    }),
    fetchFranchiseById: builder.query<IFranchise, string>({
      query: (id) => ({
        url: `/movie-api/v1/franchise/${id}`,
        method: "GET"
      })
    }),
    createFranchise: builder.query<IFranchise, IFranchise>({
      query: (franchiseDto) => ({
        url: `/movie-api/v1/franchise/`,
        method: "POST",
        body: franchiseDto
      })
    }),
    updateFranchise: builder.query<IFranchise, {id: string, franchiseDto: IFranchise}>({
      query: ({id, franchiseDto}) => ({
        url: `/movie-api/v1/franchise/${id}`,
        method: "PUT",
        body: franchiseDto
      })
    }),
    deleteFranchise: builder.query<void, string>({
      query: (id) => ({
        url: `/movie-api/v1/franchise/${id}`,
        method: "DELETE"
      })
    }),
  }),
  overrideExisting: false
})