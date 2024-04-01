import {createApi} from "@reduxjs/toolkit/query";
import {baseQueryWithRefresh} from "@/shared/api/base-query.ts";
import {IPreview, IQuery, IEpisode, IContent} from "@/entities/common";

export const commonApi = createApi({
    reducerPath: "commonApi",
    baseQuery: baseQueryWithRefresh,
    endpoints: (builder) => ({
        fetchDirectedBy: builder.query<IPreview, string>({
        query: (id) => ({
            url: `/common-api/v1/preview/${id}`,
            method: "GET"
        }),
        }),
        fetchDirectedBy: builder.query<IQuery, string>({
        query: (id) => ({
            url: `/common-api/v1/query/${id}`,
            method: "GET"
        }),
        }),
        fetchDirectedBy: builder.query<IEpisode, string>({
        query: (id) => ({
            url: `/common-api/v1/episode/${id}`,
            method: "GET"
        }),
        }),
        fetchDirectedBy: builder.query<IContent, string>({
        query: (id) => ({
            url: `/common-api/v1/content/${id}`,
            method: "GET"
        }),
        }),
    })
})