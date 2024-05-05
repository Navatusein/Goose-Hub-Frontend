export interface IComment{
    id?: string;
    parentId?: string;
    userId: string;
    contentId: string;
    dispatch: string;
    message: string;
    replies?: string[];
}