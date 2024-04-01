import {serialApi} from "@reduxjs/toolkit/query";
import {baseQueryWithRefresh} from "@/shared/api/base-query.ts";
import {ISerial, ISeason} from "@/entities/serial";

export const serialApi = createApi({
    reducerPath: "serialApi",
    baseQuery: baseQueryWithRefresh,
    endpoints: (builder) => ({
        fetchDirectedBy: builder.query<ISerial, string>({
        query: (id) => ({
            url: `/serial-api/v1/serial/${id}`,
            method: "GET"
        }),
        }),
        fetchDirectedBy: builder.query<ISeason, string>({
        query: (id) => ({
            url: `/serial-api/v1/season/${id}`,
            method: "GET"
        }),
        }),
    })
})