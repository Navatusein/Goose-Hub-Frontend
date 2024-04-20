export interface IWishList {
    id?: string;
    name: string;
    isPrivate: boolean;
    notify: boolean;
    contents: IWishListContent[];
}

export interface IWishListContent {
    contentId: string;
    priority: number;
}