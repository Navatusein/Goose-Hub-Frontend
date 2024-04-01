import {createApi} from "@reduxjs/toolkit/query";
import {baseQueryWithRefresh} from "@/shared/api/base-query.ts";
import {IAnime} from "@/entities/anime";

export const animeApi = createApi({
    reducerPath: "animeApi",
    baseQuery: baseQueryWithRefresh,
    endpoints: (builder) => ({
        fetchDirectedBy: builder.query<IAnime, string>({
            query: (id) => ({
                url: `/anime-api/v1/anime/${id}`,
                method: "GET"
            }),
        })
    })
})