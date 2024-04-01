import {franchiseApi} from "@reduxjs/toolkit/query";
import {baseQueryWithRefresh} from "@/shared/api/base-query.ts";
import {IFranchise} from "@/entities/franchise";

export const franchiseApi = createApi({
    reducerPath: "franchiseApi",
    baseQuery: baseQueryWithRefresh,
    endpoints: (builder) => ({
        fetchDirectedBy: builder.query<IFranchise, string>({
            query: (id) => ({
                url: `/franchise-api/v1/franchise/${id}`,
                method: "GET"
            }),
        }),
    })
})