import {baseApi} from "@/shared/api/base-query.ts";
import {ISerial} from "@/entities/serial";

export const serialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSerial: builder.mutation<ISerial, ISerial>({
      query: (data) => ({
        url: `/movie-api/v1/serial/`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["content", "info"]
    }),
    updateSerial: builder.mutation<ISerial, {id: string, data: ISerial}>({
      query: ({id, data}) => ({
        url: `/movie-api/v1/serial/${id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["content", "info"]
    }),
    deleteSerial: builder.mutation<void, string>({
      query: (id) => ({
        url: `/movie-api/v1/serial/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["content", "info"]
    }),
  }),
  overrideExisting: false
})