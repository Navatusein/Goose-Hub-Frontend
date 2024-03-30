import {errorApi} from "@reduxjs/toolkit/query";
import {baseQueryWithRefresh} from "@/shared/api/base-query.ts";
import {IError} from "@/entities/error";

export const errorApi = createApi({
    reducerPath: "errorApi",
    baseQuery: baseQueryWithRefresh,
    endpoints: (builder) => ({
        fetchDirectedBy: builder.query<IError, string>({
            query: (id) => ({
                url: `/error-api/v1/error/${id}`,
                method: "GET"
            }),
        })
    })
})