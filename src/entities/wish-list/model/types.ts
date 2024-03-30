export interface IWishList {
    Id:string;
    Name:string;
    IsPrivate:boolean;
    Notify:boolean;
    ContentList:IWishListContent[];
}

export interface IWishListContent {
    ContentId:string;
    Priority:number;
}