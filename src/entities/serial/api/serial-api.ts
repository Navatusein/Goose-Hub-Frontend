import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithRefresh} from "@/shared/api/base-query.ts";
import {ISerial} from "@/entities/serial";

export const serialApi = createApi({
  reducerPath: "serialApi",
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    fetchById: builder.query<ISerial, string>({
      query: (id) => ({
          url: `/serial-api/v1/serial/${id}`,
          method: "GET"
      })
    }),
    create: builder.query<ISerial, ISerial>({
      query: (serialDto) => ({
          url: `/serial-api/v1/serial/`,
          method: "POST",
          data: serialDto
      })
    }),
    update: builder.query<ISerial, {id: string, serialDto: ISerial}>({
      query: ({id, serialDto}) => ({
          url: `/serial-api/v1/serial/${id}`,
          method: "PUT",
          data: serialDto
      })
    }),
    delete: builder.query<void, string>({
      query: (id) => ({
          url: `/serial-api/v1/serial/${id}`,
          method: "DELETE"
      })
    }),
  })
})