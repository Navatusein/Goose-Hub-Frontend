import { IWishList } from "@/entities/wish-list";

export interface IUserProfile {
    id?: number;
    name: string;
    email: string;
    avatarUrl?: string;
    avatarPath?: string;
    birthday?: string;
    wishLists: IWishList[];
    history: IHistory[];
    notification: INotification[];
    isPrivate: boolean;
}

export interface IUserProfilePreview {
    id?: string;
    name: string;
    avatarUrl: string;
    avatarPath: string;
}

export interface IHistory {
    contentId: string;
    viewDate: string;
}

export interface INotification {
    message: string;
    linkRaw?: string;
}