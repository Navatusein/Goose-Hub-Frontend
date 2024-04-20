import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithRefresh} from "@/shared/api/base-query.ts";
import {IFranchise} from "@/entities/franchise";

export const franchiseApi = createApi({
  reducerPath: "franchiseApi",
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    fetchById: builder.query<IFranchise, string>({
      query: (id) => ({
        url: `/movie-api/v1/franchise/${id}`,
        method: "GET"
      })
    }),
    create: builder.query<IFranchise, IFranchise>({
      query: (franchiseDto) => ({
        url: `/movie-api/v1/franchise/`,
        method: "POST",
        data: franchiseDto
      })
    }),
    update: builder.query<IFranchise, {id: string, franchiseDto: IFranchise}>({
      query: ({id, franchiseDto}) => ({
        url: `/movie-api/v1/franchise/${id}`,
        method: "PUT",
        data: franchiseDto
      })
    }),
    delete: builder.query<void, string>({
      query: (id) => ({
        url: `/movie-api/v1/franchise/${id}`,
        method: "DELETE"
      })
    }),
  })
})