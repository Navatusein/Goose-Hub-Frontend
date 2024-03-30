import { IWishList } from "@/entities/wish-list";

export interface IUserProfile {
    Id: number;
    Name: string;
    Email: string;
    AvatarUrl: string;
    AvatarPath: string;
    WishList: IWishList[];
    HistoryList: IHistory[];
    NotificationList: INotification[];
    IsPrivate: boolean;
}

export interface IUserProfilePreview {
    Id:string;
    Name:string;
    AvatarUrl:string;
    AvatarPath:string;
}

export interface IHistory {
    ContentId: string;
    ViewDate:Date;
}

export interface INotification {
    Message:string;
    LinkRaw:string;
}