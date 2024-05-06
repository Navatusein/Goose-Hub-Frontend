 import {baseApi} from "@/shared/api/base-query.ts";
import {IWishList} from "@/entities/wish-list";

export const wishListApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchById: builder.query<IWishList, string>({
      query: (id) => ({
        url: `/user-profile-api/v1/wish-list/${id}`,
        method: "GET"
      }),
    }),
  }),
  overrideExisting: false
})